'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const mockCategories = [
  { id: '1', name: 'Rudraksha' },
  { id: '2', name: 'Yantra' },
  { id: '3', name: 'Bracelets' },
  { id: '4', name: 'Crystals' },
];

export default function EditSubCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    parentCategoryId: '',
    name: '',
    slug: '',
    description: '',
    image: '',
    status: true,
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      await new Promise((r) => setTimeout(r, 500));
      setFormData({
        parentCategoryId: '1',
        name: 'Single Mukhi',
        slug: 'single-mukhi',
        description: '1 to 14 Mukhi beads',
        image: '',
        status: true,
      });
      setLoading(false);
    })();
  }, [id]);

  const handleNameChange = (name) => {
    setFormData((prev) => ({ ...prev, name, slug: prev.slug }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.parentCategoryId) {
      toast.error('Name and parent category are required');
      return;
    }
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success('Sub-category updated successfully.');
      router.push('/admin/subcategories');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/subcategories"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Sub-Category</h1>
          <p className="text-muted-foreground">Update sub-category details</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Sub-category details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Parent Category *</Label>
              <Select value={formData.parentCategoryId} onValueChange={(v) => setFormData((prev) => ({ ...prev, parentCategoryId: v }))}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {mockCategories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Sub-Category Name *</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleNameChange(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={formData.slug} readOnly className="bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} rows={3} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status">Active Status</Label>
                <p className="text-sm text-muted-foreground">Visible on website</p>
              </div>
              <Switch id="status" checked={formData.status} onCheckedChange={(c) => setFormData((prev) => ({ ...prev, status: c }))} />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Sub-Category
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/subcategories">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
