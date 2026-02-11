'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Droplets } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { CropGuide } from '@/lib/sanityFetch';

interface CropGuidesProps {
    cropGuides: CropGuide[];
}

export default function CropGuides({ cropGuides }: CropGuidesProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-extrabold text-primary">Crop-Specific Guides</h1>
                <p className="mt-4 text-secondary">Learn how to maximize your yield with Agrodyke methods.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cropGuides.map((guide) => (
                    <Card key={guide.id} className="border-slate-200">
                        <CardHeader className="bg-slate-50 border-b">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-2xl font-bold flex items-center">
                                    <span className="mr-2">🌱</span> {guide.crop}
                                </CardTitle>
                                <Link
                                    href={`/calculator?crop=${guide.slug}`}
                                    className="text-primary text-sm font-semibold hover:underline flex items-center"
                                >
                                    <BookOpen className="w-4 h-4 mr-1" />
                                    Calculate Dosage
                                </Link>
                            </div>
                            <CardDescription className="text-base mt-2">{guide.overview}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                {guide.stages.map((stage, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="hover:no-underline py-4">
                                            <div className="flex items-center text-left">
                                                <div className="bg-primary/10 text-primary p-2 rounded-lg mr-3">
                                                    <Droplets className="w-5 h-5" />
                                                </div>
                                                <span className="font-semibold">{stage.name}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-secondary leading-relaxed pb-6 pl-12 border-l-2 border-primary/20 ml-5">
                                            {stage.instruction}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
