'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import { Loader2, FileText, Upload, X } from 'lucide-react';

// Mock homepage sections
const mockSections = [
  { id: '1', sectionKey: 'hero', title: 'Sacred Spiritual Products', subtitle: 'Authentic & Energized', description: 'Discover our collection of sacred items blessed by divine energy', image: '/placeholder.svg', buttonText: 'Shop Now', buttonLink: '/shop', isVisible: true, order: 1 },
  { id: '2', sectionKey: 'categories', title: 'Shop by Category', subtitle: '', description: 'Explore our curated collections', image: '', buttonText: 'View All', buttonLink: '/categories', isVisible: true, order: 2 },
  { id: '3', sectionKey: 'popular', title: 'Popular Products', subtitle: 'Bestsellers', description: 'Our most loved items by customers', image: '', buttonText: '', buttonLink: '', isVisible: true, order: 3 },
  { id: '4', sectionKey: 'promises', title: 'Our Promises', subtitle: '', description: 'Why thousands trust Anushthanum', image: '', buttonText: '', buttonLink: '', isVisible: true, order: 4 },
  { id: '5', sectionKey: 'guidance', title: 'Spiritual Guidance', subtitle: 'Expert Advice', description: 'Get guidance from our spiritual experts', image: '/placeholder.svg', buttonText: 'Get Guidance', buttonLink: '/guidance', isVisible: true, order: 5 },
  { id: '6', sectionKey: 'testimonials', title: 'Customer Stories', subtitle: 'What They Say', description: 'Hear from our blessed customers', image: '', buttonText: '', buttonLink: '', isVisible: true, order: 6 },
];

const mockSettings = {
  siteName: 'Anushthanum',
  tagline: 'Sacred Spiritual Products',
  logo: '/placeholder.svg',
  favicon: '/favicon.ico',
  contactEmail: 'info@anushthanum.com',
  contactPhone: '+91 9876543210',
  address: '123 Divine Street, Mumbai, Maharashtra 400001',
  socialLinks: {
    facebook: 'https://facebook.com/anushthanum',
    instagram: 'https://instagram.com/anushthanum',
    twitter: 'https://twitter.com/anushthanum',
    youtube: 'https://youtube.com/anushthanum',
    whatsapp: '+919876543210',
  },
  footerText: '© 2024 Anushthanum. All rights reserved.',
};

export default function ContentPage() {
  const [sections, setSections] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setSections(mockSections);
      setSettings(mockSettings);
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleSectionUpdate = (id, updates) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const handleSettingsUpdate = (updates) => {
    setSettings(prev => prev ? { ...prev, ...updates } : null);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast('Content saved successfully');
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Content CMS</h1>
          <p className="text-muted-foreground mt-1">Manage website content and settings</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="homepage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="homepage">Homepage Sections</TabsTrigger>
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="footer">Footer & Contact</TabsTrigger>
        </TabsList>

        {/* Homepage Sections */}
        <TabsContent value="homepage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Homepage Sections
              </CardTitle>
              <CardDescription>Edit homepage section content</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {sections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="font-medium capitalize">{section.sectionKey.replace('_', ' ')}</span>
                        {!section.isVisible && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded">Hidden</span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Section Visible</Label>
                          <p className="text-xs text-muted-foreground">Show on homepage</p>
                        </div>
                        <Switch
                          checked={section.isVisible}
                          onCheckedChange={(checked) => handleSectionUpdate(section.id, { isVisible: checked })}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={section.title}
                            onChange={(e) => handleSectionUpdate(section.id, { title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Subtitle</Label>
                          <Input
                            value={section.subtitle || ''}
                            onChange={(e) => handleSectionUpdate(section.id, { subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={section.description || ''}
                          onChange={(e) => handleSectionUpdate(section.id, { description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Button Text</Label>
                          <Input
                            value={section.buttonText || ''}
                            onChange={(e) => handleSectionUpdate(section.id, { buttonText: e.target.value })}
                            placeholder="Leave empty to hide button"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Button Link</Label>
                          <Input
                            value={section.buttonLink || ''}
                            onChange={(e) => handleSectionUpdate(section.id, { buttonLink: e.target.value })}
                            placeholder="/shop"
                          />
                        </div>
                      </div>

                      {section.image && (
                        <div className="space-y-2">
                          <Label>Section Image</Label>
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <img src={section.image} alt="" className="h-20 w-32 rounded-lg object-cover border" />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6"
                                onClick={() => handleSectionUpdate(section.id, { image: '' })}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <label className="flex flex-col items-center justify-center h-20 w-32 rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-colors">
                              <Upload className="h-5 w-5 text-muted-foreground mb-1" />
                              <span className="text-xs text-muted-foreground">Change</span>
                              <input type="file" accept="image/*" className="hidden" />
                            </label>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings */}
        <TabsContent value="site" className="space-y-4">
          {settings && (
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>General website configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input
                      value={settings.siteName}
                      onChange={(e) => handleSettingsUpdate({ siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input
                      value={settings.tagline}
                      onChange={(e) => handleSettingsUpdate({ tagline: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex items-center gap-4">
                      <img src={settings.logo} alt="Logo" className="h-12 w-auto bg-muted p-2 rounded-lg" />
                      <label className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">Upload</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="flex items-center gap-4">
                      <img src={settings.favicon} alt="Favicon" className="h-8 w-8 bg-muted p-1 rounded" />
                      <label className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">Upload</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Social Media Links</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Facebook</Label>
                      <Input
                        value={settings.socialLinks.facebook || ''}
                        onChange={(e) => handleSettingsUpdate({
                          socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                        })}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Instagram</Label>
                      <Input
                        value={settings.socialLinks.instagram || ''}
                        onChange={(e) => handleSettingsUpdate({
                          socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                        })}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter</Label>
                      <Input
                        value={settings.socialLinks.twitter || ''}
                        onChange={(e) => handleSettingsUpdate({
                          socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                        })}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>YouTube</Label>
                      <Input
                        value={settings.socialLinks.youtube || ''}
                        onChange={(e) => handleSettingsUpdate({
                          socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                        })}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp Number</Label>
                      <Input
                        value={settings.socialLinks.whatsapp || ''}
                        onChange={(e) => handleSettingsUpdate({
                          socialLinks: { ...settings.socialLinks, whatsapp: e.target.value }
                        })}
                        placeholder="+91..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Footer & Contact */}
        <TabsContent value="footer" className="space-y-4">
          {settings && (
            <Card>
              <CardHeader>
                <CardTitle>Footer & Contact Information</CardTitle>
                <CardDescription>Contact details shown on website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleSettingsUpdate({ contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    <Input
                      value={settings.contactPhone}
                      onChange={(e) => handleSettingsUpdate({ contactPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Address</Label>
                  <Textarea
                    value={settings.address}
                    onChange={(e) => handleSettingsUpdate({ address: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Footer Copyright Text</Label>
                  <Input
                    value={settings.footerText}
                    onChange={(e) => handleSettingsUpdate({ footerText: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
