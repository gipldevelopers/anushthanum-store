'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
import { categoriesApi, uploadApi } from '@/services/adminApi';
import { imageSrc } from '@/lib/utils';

const generateSlug = (name) =>
  String(name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';

export default function NewCategoryPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    type: 'main',
    status: 'active',
    showInShopSection: false,
    sortOrder: 0,
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleNameChange = (name) => {
    setFormData((prev) => ({ ...prev, name, slug: generateSlug(name) }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    if (!/image\/(jpeg|jpg|png|gif|webp)/i.test(file.type)) {
      toast.error('Please choose a JPEG, PNG, GIF or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB.');
      return;
    }
    setUploading(true);
    try {
      const data = await uploadApi.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: data?.url ?? '' }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        slug: generateSlug(formData.name),
        description: formData.description?.trim() || null,
        image: formData.image?.trim() || null,
        type: formData.type,
        status: formData.status,
        showInShopSection: !!formData.showInShopSection,
        sortOrder: Number(formData.sortOrder) || 0,
      };
      await categoriesApi.create(payload);
      toast.success('Category created successfully.');
      router.push('/admin/categories');
    } catch (err) {
      toast.error(err?.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/categories"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Category</h1>
          <p className="text-muted-foreground">Create a navbar or material-wise category</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name, type and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Rudraksha"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={generateSlug(formData.name) || formData.slug}
                  disabled
                  readOnly
                  placeholder="Auto-generated from name"
                  className="bg-muted cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData((prev) => ({ ...prev, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Navbar (main category)</SelectItem>
                    <SelectItem value="material">Material-wise (below hero)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  min={0}
                  value={formData.sortOrder}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="showInShopSection"
                  checked={!!formData.showInShopSection}
                  onCheckedChange={(c) => setFormData((prev) => ({ ...prev, showInShopSection: c }))}
                />
                <Label htmlFor="showInShopSection">Show in &quot;Shop by Category&quot; section on homepage</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Category Image</Label>
              <div className="flex flex-col gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {formData.image ? (
                  <div className="relative inline-flex w-fit">
                    <div className="relative h-32 w-48 rounded-md border bg-muted overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc(formData.image) || formData.image}
                        alt="Category"
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    {uploading ? 'Uploading...' : 'Upload image'}
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">JPEG, PNG, GIF or WebP, max 5MB</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status">Active</Label>
                <p className="text-sm text-muted-foreground">Visible on website</p>
              </div>
              <Switch
                id="status"
                checked={formData.status === 'active'}
                onCheckedChange={(c) => setFormData((prev) => ({ ...prev, status: c ? 'active' : 'inactive' }))}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Category
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/categories">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
