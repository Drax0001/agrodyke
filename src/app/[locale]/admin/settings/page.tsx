'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Disc, Phone, MessageCircle, Globe, ShieldCheck, FileWarning } from 'lucide-react';
import { AGRODYKE_CONTACT } from '@/lib/constants';

export default function AdminSettingsPage() {
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<{
        supportPhone: string;
        whatsapp: string;
        platformEmail: string;
    }>({
        supportPhone: AGRODYKE_CONTACT.PHONE,
        whatsapp: AGRODYKE_CONTACT.WHATSAPP,
        platformEmail: 'support@agrodyke.cm',
    });

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1500);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">System Settings</h1>
                <p className="text-muted-foreground text-lg">Manage global platform configurations.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Contact Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone size={20} className="text-primary" />
                            Contact Information
                        </CardTitle>
                        <CardDescription>
                            These details appear in the header and footer.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Support Phone Number</Label>
                            <Input
                                id="phone"
                                value={settings.supportPhone}
                                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">WhatsApp Business Number</Label>
                            <Input
                                id="whatsapp"
                                value={settings.whatsapp}
                                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Platform Support Email</Label>
                            <Input
                                id="email"
                                value={settings.platformEmail}
                                onChange={(e) => setSettings({ ...settings, platformEmail: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* API Status & Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck size={20}  className="text-primary" />
                            API & Security
                        </CardTitle>
                        <CardDescription>
                            Current status of external integrations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <div>
                                    <p className="font-semibold text-sm">Campay API (Sandbox)</p>
                                    <p className="text-xs text-muted-foreground">Connected and operational</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">ACTIVE</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <div>
                                    <p className="font-semibold text-sm">Supabase DB</p>
                                    <p className="text-xs text-muted-foreground">Region: eu-central-1</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">ACTIVE</Badge>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex gap-3">
                            <FileWarning size={20} className="text-amber-600 shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-amber-900">Environment Warning</p>
                                <p className="text-xs text-amber-800">
                                    You are currently running in development mode. Role-based security is active but bypassed for UID: test-dev.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="pt-6 flex justify-end gap-3">
                    <Button variant="outline">Reset Defaults</Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? "Saving Changes..." : "Save Settings"}
                        {!saving && <Disc size={16} className="ml-2" />}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
