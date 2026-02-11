import ProductCatalog from '@/components/products/ProductCatalog';
import { getProducts } from '@/lib/sanityFetch';

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const products = await getProducts(locale);

    return <ProductCatalog products={products} />;
}
