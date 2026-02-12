import { client } from '@/lib/sanity';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';

async function getProduct(slug: string, locale: string) {
    const query = `*[_type == "product" && slug.current == $slug && language == $locale][0]`;
    return await client.fetch(query, { slug, locale });
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const product = await getProduct(slug, locale);

    if (!product) {
        notFound();
    }

    return (
        <div className="container py-10">
            <ProductDetail product={product} />
        </div>
    );
}
