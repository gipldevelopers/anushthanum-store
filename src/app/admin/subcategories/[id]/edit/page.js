'use client';

import { useState, useEffect, useRef } from 'react';
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
import { subCategoriesApi, categoriesApi, uploadApi } from '@/services/adminApi';
import { imageSrc } from '@/lib/utils';



export default function EditSubCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    parentId: '',
    name: '',
    slug: '',
    description: '',
    image: '',
    status: 'active',
    sortOrder: 0,
  });

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
      const data = await uploadApi.uploadSubcategoryImage(file);
      setFormData((p) => ({ ...p, image: data?.url ?? '' }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await categoriesApi.getAll({ type: 'main' });
        setCategories(data?.categories ?? []);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await subCategoriesApi.getById(id);
        const sub = data?.subCategory;
        if (!sub) {
          toast.error('Sub-category not found');
          router.push('/admin/subcategories');
          return;
        }
        setFormData({
          parentId: String(sub.parentId ?? sub.parent?.id ?? ''),
          name: sub.name ?? '',
          slug: sub.slug ?? '',
          description: sub.description ?? '',
          image: sub.image ?? '',
          status: sub.status ?? 'active',
          sortOrder: sub.sortOrder ?? 0,
        });
      } catch (e) {
        toast.error(e?.message || 'Failed to load sub-category');
        router.push('/admin/subcategories');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    try {
      const sortOrder = Number(formData.sortOrder);
      await subCategoriesApi.update(id, {
        parentId: formData.parentId ? Number(formData.parentId) : undefined,
        name: formData.name.trim(),
        slug: generateSlug(formData.name),
        description: formData.description?.trim() || null,
        image: formData.image?.trim() || null,
        status: formData.status,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
      });
      toast.success('Sub-category updated.');
      router.push('/admin/subcategories');
    } catch (err) {
      toast.error(err?.message || 'Failed to save');
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
              <Label>Parent Category</Label>
              <Select value={formData.parentId} onValueChange={(v) => setFormData((p) => ({ ...p, parentId: v }))}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Sub-Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value, slug: generateSlug(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={generateSlug(formData.name) || formData.slug}
                  disabled
                  readOnly
                  className="bg-muted cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Sub-Category Image</Label>
              <div className="flex flex-col gap-3">
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleImageUpload} className="hidden" />
                {formData.image ? (
                  <div className="relative inline-flex w-fit">
                    <div className="relative h-24 w-32 rounded-md border bg-muted overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageSrc(formData.image) || formData.image} alt="" className="h-full w-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => setFormData((p) => ({ ...p, image: '' }))}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    {uploading ? 'Uploading...' : 'Upload image'}
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">JPEG, PNG, GIF or WebP, max 5MB</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-between flex-1 max-w-xs pl-4">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Active</Label>
                  <p className="text-sm text-muted-foreground">Visible on website</p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status === 'active'}
                  onCheckedChange={(c) =>
                    setFormData((prev) => ({ ...prev, status: c ? 'active' : 'inactive' }))
                  }
                />
              </div>
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
