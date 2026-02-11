import { client } from './sanity';
import { products as staticProducts, cropGuides as staticCropGuides } from './data';

// Interfaces matching Sanity schema
export interface SanityProduct {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  sizes: string[];
  imageUrl: string;
  category: string;
  crops: string[];
  language: string;
}

export interface SanityCropGuide {
  _id: string;
  cropName: string;
  slug: { current: string };
  overview: string;
  stages: {
    name: string;
    instruction: string;
  }[];
  language: string;
}

// Mapped interfaces for app use
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  image: string;
  category: string;
  crops: string[];
}

export interface CropGuide {
  id: string;
  crop: string;
  slug: string;
  overview: string;
  stages: {
    name: string;
    instruction: string;
  }[];
}

// Helper to map Sanity product to app interface
const mapSanityProduct = (p: any): Product => ({
  id: p._id,
  name: p.name,
  description: p.description,
  price: p.price,
  sizes: p.sizes || [],
  image: p.imageUrl, // Map standard image URL
  category: p.category,
  crops: p.crops || [],
});

const mapSanityCropGuide = (g: any): CropGuide => ({
  id: g._id,
  // Map 'cropName' from Sanity to 'crop' property expected by component
  crop: g.cropName || g.crop,
  slug: g.slug.current || g.slug,
  overview: g.overview,
  stages: g.stages || [],
});

export async function getProducts(locale: string = 'en') {
  try {
    const query = `*[_type == "product" && language == $locale]{
      _id,
      name,
      slug,
      description,
      price,
      sizes,
      "imageUrl": image.asset->url,
      category,
      crops,
      language
    }`;

    const data = await client.fetch(query, { locale });

    if (data && data.length > 0) {
      return data.map(mapSanityProduct);
    }
  } catch (error) {
    console.warn("Failed to fetch products from Sanity:", error);
  }

  // Fallback to static data
  return staticProducts.filter(p => true); // Return all static for now (static data doesn't have locale field yet)
}

export async function getCropGuides(locale: string = 'en'): Promise<CropGuide[]> {
  try {
    const query = `*[_type == "cropGuide" && language == $locale]{
      _id,
      cropName,
      slug,
      overview,
      stages,
      language
    }`;

    const data = await client.fetch(query, { locale });

    if (data && data.length > 0) {
      return data.map(mapSanityCropGuide);
    }
  } catch (error) {
    console.warn("Failed to fetch crop guides from Sanity:", error);
  }

  // Fallback to static data
  // Map static guides to match the CropGuide interface (specifically crop property)
  return staticCropGuides.map(g => ({
    ...g,
    crop: (g as any).crop || (g as any).name // Handle static data structure
  }));
}
