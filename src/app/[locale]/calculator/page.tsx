'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { calculateDosage, CropType } from '@/lib/dosageLogic';
import { Calculator as CalcIcon, Share2 } from 'lucide-react';
import { AGRODYKE_CONTACT } from '@/lib/constants';

export default function CalculatorPage() {
    const t = useTranslations('Calculator');

    const [crop, setCrop] = useState<CropType | ''>('');
    const [farmSize, setFarmSize] = useState<number>(0);
    const [sizeUnit, setSizeUnit] = useState<'hectares' | 'plants'>('hectares');
    const [applicationType, setApplicationType] = useState<'spraying' | 'sowing'>('spraying');
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        if (crop && farmSize > 0) {
            const res = calculateDosage(crop as CropType, farmSize, sizeUnit, applicationType);
            setResult(res);
        } else {
            setResult(null);
        }
    }, [crop, farmSize, sizeUnit, applicationType]);

    const handleShare = () => {
        if (!result) return;
        const message = `Agrodyke Dosage Result for ${crop}:\n- Size: ${farmSize} ${sizeUnit}\n- Type: ${applicationType}\n- Needed: ${result.quantity}g\n- Water: ${result.waterVolume}L\n- ${result.frequency}`;
        window.open(`https://wa.me/${AGRODYKE_CONTACT.WHATSAPP.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center space-x-4 mb-8">
                <div className="bg-primary p-3 rounded-full text-white">
                    <CalcIcon className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-primary">Dosage Calculator</h1>
                    <p className="text-secondary">Calculate the exact amount of Agrodyke products needed for your farm.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Farm Details</CardTitle>
                        <CardDescription>Enter your crop and farm size below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="crop">Select Crop</Label>
                            <Select onValueChange={(v) => setCrop(v as CropType)}>
                                <SelectTrigger id="crop">
                                    <SelectValue placeholder="Select a crop" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tomato">Tomato</SelectItem>
                                    <SelectItem value="cocoa">Cocoa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="size">Farm Size</Label>
                                <Input
                                    id="size"
                                    type="number"
                                    min="0"
                                    onChange={(e) => setFarmSize(Number(e.target.value))}
                                    placeholder="0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Select defaultValue="hectares" onValueChange={(v) => setSizeUnit(v as any)}>
                                    <SelectTrigger id="unit">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hectares">Hectares</SelectItem>
                                        <SelectItem value="plants">Number of Plants</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Application Type</Label>
                            <div className="flex space-x-4">
                                <Button
                                    variant={applicationType === 'spraying' ? 'default' : 'outline'}
                                    onClick={() => setApplicationType('spraying')}
                                    className="flex-1"
                                >
                                    Spraying
                                </Button>
                                <Button
                                    variant={applicationType === 'sowing' ? 'default' : 'outline'}
                                    onClick={() => setApplicationType('sowing')}
                                    className="flex-1"
                                >
                                    Sowing
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={result ? "border-primary border-2" : "opacity-50"}>
                    <CardHeader>
                        <CardTitle className="text-primary">Calculation Result</CardTitle>
                        <CardDescription>Based on official Agrodyke guidelines.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {result ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-lg text-center">
                                        <p className="text-xs text-secondary uppercase font-bold">Quantity Needed</p>
                                        <p className="text-2xl font-bold text-primary">{result.quantity.toFixed(1)}g</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg text-center">
                                        <p className="text-xs text-secondary uppercase font-bold">Water Volume</p>
                                        <p className="text-2xl font-bold text-primary">{result.waterVolume.toFixed(0)}L</p>
                                    </div>
                                </div>

                                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                                    <p className="font-semibold text-accent flex items-center">
                                        <span className="mr-2">📅</span> {result.frequency}
                                    </p>
                                    <p className="text-sm text-secondary mt-1">{result.description}</p>
                                </div>

                                <div className="pt-4 border-t flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-secondary uppercase">Est. Cost</p>
                                        <p className="text-xl font-bold">{result.estimatedCost.toLocaleString()} XAF</p>
                                    </div>
                                    <Button onClick={handleShare} variant="outline" size="icon">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                </div>

                                <Button className="w-full bg-primary hover:bg-primary/90">
                                    Order Recommended Package
                                </Button>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center py-12 text-slate-400">
                                <CalcIcon className="w-16 h-16 mb-4 opacity-20" />
                                <p>Enter details to see calculation</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
