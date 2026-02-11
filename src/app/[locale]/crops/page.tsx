import CropGuides from '@/components/crops/CropGuides';
import { getCropGuides } from '@/lib/sanityFetch';

export default async function CropsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const cropGuides = await getCropGuides(locale);

    return <CropGuides cropGuides={cropGuides} />;
}
