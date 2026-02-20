'use client';

import { useState, useEffect, useRef } from 'react';
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
import { subSubCategoriesApi, subCategoriesApi, uploadApi } from '@/services/adminApi';

const API_ORIGIN = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
  : '';
function imageSrc(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return API_ORIGIN ? `${API_ORIGIN}${url}` : url;
}

const generateSlug = (n) =>
  String(n || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';

export default function NewSubSubCategoryPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [subCategories, setSubCategories] = useState([]);
  const [form, setForm] = useState({
    parentId: '',
    name: '',
    slug: '',
    description: '',
    image: '',
    status: 'active',
    sortOrder: 0,
  });

  useEffect(() => {
    subCategoriesApi.getAll().then((d) => setSubCategories(d?.subCategories ?? [])).catch(() => setSubCategories([]));
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    if (!/image\/(jpeg|jpg|png|gif|webp)/i.test(file.type)) {
      toast.error('Please choose a JPEG, PNG, GIF or WebP image.');
      return;
    }
    setUploading(true);
    try {
      const data = await uploadApi.uploadSubcategoryImage(file);
      setForm((p) => ({ ...p, image: data?.url ?? '' }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const onName = (name) => setForm((p) => ({ ...p, name, slug: generateSlug(name) }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.parentId) {
      toast.error('Name and parent sub-category are required');
      return;
    }
    setSaving(true);
    try {
      await subSubCategoriesApi.create({
        parentId: Number(form.parentId),
        name: form.name.trim(),
        slug: generateSlug(form.name),
        description: form.description?.trim() || null,
        image: form.image?.trim() || null,
        status: form.status,
        sortOrder: Number(form.sortOrder) || 0,
      });
      toast.success('Sub-sub-category created.');
      router.push('/admin/subsubcategories');
    } catch (err) {
      toast.error(err?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/subsubcategories"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Sub-Sub-Category</h1>
          <p className="text-muted-foreground">Create a category within a sub-category (e.g. 1 Mukhi under Rudraksha Beads)</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Sub-sub-category details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Parent Sub-Category *</Label>
              <Select value={form.parentId} onValueChange={(v) => setForm((p) => ({ ...p, parentId: v }))}>
                <SelectTrigger><SelectValue placeholder="Select sub-category" /></SelectTrigger>
                <SelectContent>
                  {subCategories.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={form.name} onChange={(e) => onName(e.target.value)} placeholder="e.g. 1 Mukhi Rudraksha" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={generateSlug(form.name) || form.slug}
                  disabled
                  readOnly
                  className="bg-muted cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {form.image ? (
                <div className="relative inline-flex">
                  <div className="h-24 w-32 rounded-md border overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc(form.image)} alt="" className="h-full w-full object-cover" />
                  </div>
                  <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => setForm((p) => ({ ...p, image: '' }))}><X className="h-3 w-3" /></Button>
                </div>
              ) : (
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                  {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                  {uploading ? 'Uploading...' : 'Upload image'}
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} />
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Label>Sort order</Label>
                <Input type="number" min={0} value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: e.target.value }))} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.status === 'active'} onCheckedChange={(c) => setForm((p) => ({ ...p, status: c ? 'active' : 'inactive' }))} />
                <Label>Active</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create</Button>
          <Button type="button" variant="outline" asChild><Link href="/admin/subsubcategories">Cancel</Link></Button>
        </div>
      </form>
    </div>
  );
}
