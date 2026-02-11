import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'lhmx7iai',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-01-01',
    token: process.env.SANITY_API_TOKEN, // Required for write access
});

const products = [
    // ENGLISH PRODUCTS
    {
        _type: 'product',
        name: 'Agrodyke Organic Fertilizer',
        slug: { _type: 'slug', current: 'agrodyke-organic-fertilizer-en' },
        description: 'A premium organic fertilizer that provides essential nutrients for various crops, improving soil texture and water retention.',
        price: 5000,
        sizes: ['1kg', '5kg', '25kg'],
        category: 'Fertilizers',
        crops: ['Tomato', 'Cocoa', 'Maize', 'Rice'],
        language: 'en'
    },
    {
        _type: 'product',
        name: 'Agrodyke Soil Booster',
        slug: { _type: 'slug', current: 'agrodyke-soil-booster-en' },
        description: 'Specially formulated to revitalize tired soils and stimulate root growth for healthier plants.',
        price: 3500,
        sizes: ['500g', '1kg'],
        category: 'Soil Enhancers',
        crops: ['Cassava', 'Yam', 'Potato'],
        language: 'en'
    },
    {
        _type: 'product',
        name: 'Cocoa Protector Fungicide',
        slug: { _type: 'slug', current: 'cocoa-protector-en' },
        description: 'Effective against black pod disease and other common cocoa fungal infections.',
        price: 7500,
        sizes: ['1L', '5L'],
        category: 'Fungicides',
        crops: ['Cocoa', 'Coffee'],
        language: 'en'
    },
    {
        _type: 'product',
        name: 'Maize Master Hybrid Seeds',
        slug: { _type: 'slug', current: 'maize-master-en' },
        description: 'High-yielding hybrid maize seeds resistant to local pests and drought.',
        price: 12000,
        sizes: ['5kg', '10kg'],
        category: 'Seeds',
        crops: ['Maize'],
        language: 'en'
    },
    {
        _type: 'product',
        name: 'NERICA Rice Seeds',
        slug: { _type: 'slug', current: 'nerica-rice-en' },
        description: 'New Rice for Africa (NERICA) seeds, optimized for upland cultivation in Cameroon.',
        price: 15000,
        sizes: ['10kg', '25kg'],
        category: 'Seeds',
        crops: ['Rice'],
        language: 'en'
    },
    {
        _type: 'product',
        name: 'Professional Knapsack Sprayer',
        slug: { _type: 'slug', current: 'knapsack-sprayer-en' },
        description: 'Durable 16L sprayer with ergonomic straps and adjustable nozzle for precision application.',
        price: 18000,
        sizes: ['16L'],
        category: 'Tools',
        crops: ['All Crops'],
        language: 'en'
    },

    // FRENCH PRODUCTS
    {
        _type: 'product',
        name: 'Engrais Organique Agrodyke',
        slug: { _type: 'slug', current: 'agrodyke-organic-fertilizer-fr' },
        description: 'Un engrais organique de première qualité qui fournit les nutriments essentiels pour diverses cultures.',
        price: 5000,
        sizes: ['1kg', '5kg', '25kg'],
        category: 'Engrais',
        crops: ['Tomate', 'Cacao', 'Maïs', 'Riz'],
        language: 'fr'
    },
    {
        _type: 'product',
        name: 'Boosteur de Sol Agrodyke',
        slug: { _type: 'slug', current: 'agrodyke-soil-booster-fr' },
        description: 'Spécialement formulé pour revitaliser les sols fatigués et stimuler la croissance des racines.',
        price: 3500,
        sizes: ['500g', '1kg'],
        category: 'Améliorants de sol',
        crops: ['Manioc', 'Igname', 'Pomme de terre'],
        language: 'fr'
    },
    {
        _type: 'product',
        name: 'Fongicide Protecteur de Cacao',
        slug: { _type: 'slug', current: 'cocoa-protector-fr' },
        description: 'Efficace contre la maladie de la pourriture brune et d\'autres infections fongiques du cacao.',
        price: 7500,
        sizes: ['1L', '5L'],
        category: 'Fongicides',
        crops: ['Cacao', 'Café'],
        language: 'fr'
    }
];

const cropGuides = [
    // ENGLISH GUIDES
    {
        _type: 'cropGuide',
        cropName: 'Tomato',
        slug: { _type: 'slug', current: 'tomato-guide-en' },
        overview: 'Tomatoes thrive in well-drained soil with plenty of sunlight. They are heavy feeders and require regular fertilization.',
        language: 'en',
        stages: [
            { name: 'Nursery', instruction: 'Prepare seed beds with Soil Booster. Sow seeds 1cm deep.' },
            { name: 'Transplanting', instruction: 'Transplant after 3-4 weeks. Apply Organic Fertilizer at the base.' },
            { name: 'Flowering', instruction: 'Increase watering and apply foliar spray to prevent blossom end rot.' }
        ]
    },
    {
        _type: 'cropGuide',
        cropName: 'Cocoa',
        slug: { _type: 'slug', current: 'cocoa-guide-en' },
        overview: 'Cocoa requires shade during early growth and consistent moisture. Pruning is essential for high yields.',
        language: 'en',
        stages: [
            { name: 'Establishment', instruction: 'Plant in shade of plantains or canopy trees.' },
            { name: 'Maintenance', instruction: 'Prune dead branches and apply fungicide during rainy season.' },
            { name: 'Harvesting', instruction: 'Pick only ripe yellow pods to ensure high-quality beans.' }
        ]
    },
    {
        _type: 'cropGuide',
        cropName: 'Maize (Corn)',
        slug: { _type: 'slug', current: 'maize-guide-en' },
        overview: 'Maize is a staple crop that requires high nitrogen levels and effective weed control.',
        language: 'en',
        stages: [
            { name: 'Planting', instruction: 'Sow at the start of the rainy season, 2-3 seeds per hole.' },
            { name: 'Weeding & Earthing', instruction: 'Remove weeds early and mound soil around the base for stability.' },
            { name: 'Fertilization', instruction: 'Apply Urea or NPK at 4 and 8 weeks after planting.' }
        ]
    }
];

async function seed() {
    console.log('🚀 Starting Sanity Seeding...');

    if (!process.env.SANITY_API_TOKEN) {
        console.error('❌ Error: SANITY_API_TOKEN is missing!');
        process.exit(1);
    }

    try {
        // Clear existing (Optional, be careful!)
        // const results = await client.delete({query: '*[_type == "product" || _type == "cropGuide"]'});
        // console.log('Cleared existing data');

        for (const product of products) {
            await client.create(product);
            console.log(`✅ Created product: ${product.name}`);
        }

        for (const guide of cropGuides) {
            await client.create(guide);
            console.log(`✅ Created crop guide: ${guide.cropName}`);
        }

        console.log('✨ Seeding completed successfully!');
    } catch (err) {
        console.error('❌ Seeding failed:', err);
    }
}

seed();
