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
import { productsApi, categoriesApi, subCategoriesApi, uploadApi } from '@/services/adminApi';

const API_ORIGIN = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
  : '';
function imageSrc(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return API_ORIGIN ? `${API_ORIGIN}${url}` : url;
}

const PURPOSE_OPTIONS = ['Health', 'Wealth', 'Peace', 'Love', 'Protection', 'Balance', 'Courage'];
const BEAD_OPTIONS = ['Rudraksha', 'Karungali', 'Pyrite', 'Sphatik', 'Rose Quartz', 'Tiger Eye', 'Lava', 'Amethyst', 'Sandalwood', 'Tulsi'];
const MUKHI_OPTIONS = ['1 - Ek', '2 - Do', '3 - Teen', '4 - Chaar', '5 - Paanch', '6 - Chhey', '7 - Saat', '8 - Aath', '9 - Nau', '10 - Das', '11 - Gyaarah', '12 - Baarah', '13 - Terah', '14 - Chaudah', 'Ganesh', 'Gauri Shankar'];
const PLATING_OPTIONS = ['Silver', 'Gold', 'DuoTone'];

const textToArray = (s) => (typeof s === 'string' ? s.split('\n').map((x) => x.trim()).filter(Boolean) : Array.isArray(s) ? s : []);
const arrayToText = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    categoryId: '',
    subCategoryId: '',
    price: '',
    discountPrice: '',
    stock: 0,
    sku: '',
    shortDescription: '',
    fullDescription: '',
    thumbnail: '',
    images: [],
    tags: '',
    benefits: '',
    whoShouldWear: '',
    wearingRules: '',
    filterAttributes: { purposes: [], beads: [], mukhis: [], platings: [] },
    isFeatured: false,
    isBestseller: false,
    isNew: false,
    status: 'active',
    sortOrder: 0,
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productsApi.getById(id)
      .then((d) => {
        const p = d?.product;
        if (!p) return;
        setProduct(p);
        const fa = p.filterAttributes || {};
        setForm({
          name: p.name || '',
          slug: p.slug || '',
          categoryId: String(p.categoryId || ''),
          subCategoryId: p.subCategoryId ? String(p.subCategoryId) : '',
          price: p.price != null ? String(p.price) : '',
          discountPrice: p.discountPrice != null ? String(p.discountPrice) : '',
          stock: p.stock ?? 0,
          sku: p.sku || '',
          shortDescription: p.shortDescription || '',
          fullDescription: p.description || p.fullDescription || '',
          thumbnail: p.thumbnail || '',
          images: Array.isArray(p.images) ? p.images : p.images ? [p.images] : [],
          tags: arrayToText(p.tags),
          benefits: arrayToText(p.benefits),
          whoShouldWear: arrayToText(p.whoShouldWear),
          wearingRules: arrayToText(p.wearingRules),
          filterAttributes: {
            purposes: Array.isArray(fa.purposes) ? fa.purposes : [],
            beads: Array.isArray(fa.beads) ? fa.beads : [],
            mukhis: Array.isArray(fa.mukhis) ? fa.mukhis : [],
            platings: Array.isArray(fa.platings) ? fa.platings : [],
          },
          isFeatured: !!p.isFeatured,
          isBestseller: !!p.isBestseller,
          isNew: !!p.isNew,
          status: p.status || 'active',
          sortOrder: p.sortOrder ?? 0,
        });
      })
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    categoriesApi.getAll({ type: 'main' }).then((d) => setCategories(d?.categories ?? [])).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!form.categoryId) {
      setSubCategories([]);
      return;
    }
    subCategoriesApi.getByCategory(form.categoryId).then((d) => setSubCategories(d?.subCategories ?? [])).catch(() => setSubCategories([]));
  }, [form.categoryId]);

  const onName = (name) => setForm((p) => ({ ...p, name }));

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
      const data = await uploadApi.uploadProductImage(file);
      const url = data?.url ?? '';
      setForm((p) => ({ ...p, images: [...(p.images || []), url], thumbnail: p.thumbnail || url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (idx) => {
    setForm((p) => {
      const imgs = [...(p.images || [])];
      imgs.splice(idx, 1);
      return { ...p, images: imgs, thumbnail: p.thumbnail === imgs[0] ? imgs[0] || '' : p.thumbnail };
    });
  };

  const toggleFilter = (key, value) => {
    setForm((p) => {
      const fa = { ...(p.filterAttributes || {}), [key]: p.filterAttributes?.[key] || [] };
      const arr = fa[key].includes(value) ? fa[key].filter((x) => x !== value) : [...fa[key], value];
      fa[key] = arr;
      return { ...p, filterAttributes: fa };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!id || !form.name.trim() || !form.categoryId || !form.price) {
      toast.error('Name, category and price are required');
      return;
    }
    setSaving(true);
    try {
      await productsApi.update(id, {
        name: form.name.trim(),
        slug: form.slug?.trim() || form.slug,
        categoryId: Number(form.categoryId),
        subCategoryId: form.subCategoryId ? Number(form.subCategoryId) : null,
        price: Number(form.price) || 0,
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        stock: Number(form.stock) ?? 0,
        sku: form.sku?.trim() || null,
        shortDescription: form.shortDescription?.trim() || null,
        fullDescription: form.fullDescription?.trim() || null,
        thumbnail: form.thumbnail?.trim() || form.images?.[0] || null,
        images: form.images || [],
        tags: textToArray(form.tags),
        benefits: textToArray(form.benefits),
        whoShouldWear: textToArray(form.whoShouldWear),
        wearingRules: textToArray(form.wearingRules),
        filterAttributes: form.filterAttributes || {},
        isFeatured: !!form.isFeatured,
        isBestseller: !!form.isBestseller,
        isNew: !!form.isNew,
        status: form.status || 'active',
        sortOrder: Number(form.sortOrder) ?? 0,
      });
      toast.success('Product updated.');
      router.push('/admin/products');
    } catch (err) {
      toast.error(err?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">{product.name}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name, category and pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={form.name} onChange={(e) => onName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.categoryId} onValueChange={(v) => setForm((p) => ({ ...p, categoryId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sub-Category</Label>
                <Select value={form.subCategoryId || '__none__'} onValueChange={(v) => setForm((p) => ({ ...p, subCategoryId: v === '__none__' ? '' : v }))} disabled={!form.categoryId}>
                  <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">—</SelectItem>
                    {subCategories.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Price (₹) *</Label>
                <Input type="number" min={0} value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Discount Price (₹)</Label>
                <Input type="number" min={0} value={form.discountPrice} onChange={(e) => setForm((p) => ({ ...p, discountPrice: e.target.value }))} placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input type="number" min={0} value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input value={form.sku} onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input value={form.shortDescription} onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Full Description</Label>
              <Textarea value={form.fullDescription} onChange={(e) => setForm((p) => ({ ...p, fullDescription: e.target.value }))} rows={5} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Upload images (first is thumbnail)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <div className="flex flex-wrap gap-4">
              {(form.images || []).map((url, idx) => (
                <div key={idx} className="relative">
                  <div className="h-24 w-24 rounded-md border overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc(url) || url} alt="" className="h-full w-full object-cover" />
                  </div>
                  <Button type="button" variant="destructive" size="icon" className="absolute -top-1 -right-1 h-6 w-6 rounded-full" onClick={() => removeImage(idx)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                {uploading ? 'Uploading...' : 'Add image'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filter Attributes</CardTitle>
            <CardDescription>Used for category page filters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2 block">Purpose</Label>
              <div className="flex flex-wrap gap-2">
                {PURPOSE_OPTIONS.map((v) => (
                  <Button key={v} type="button" variant={form.filterAttributes?.purposes?.includes(v) ? 'default' : 'outline'} size="sm" onClick={() => toggleFilter('purposes', v)}>{v}</Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Bead</Label>
              <div className="flex flex-wrap gap-2">
                {BEAD_OPTIONS.map((v) => (
                  <Button key={v} type="button" variant={form.filterAttributes?.beads?.includes(v) ? 'default' : 'outline'} size="sm" onClick={() => toggleFilter('beads', v)}>{v}</Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Mukhi</Label>
              <div className="flex flex-wrap gap-2">
                {MUKHI_OPTIONS.map((v) => (
                  <Button key={v} type="button" variant={form.filterAttributes?.mukhis?.includes(v) ? 'default' : 'outline'} size="sm" onClick={() => toggleFilter('mukhis', v)}>{v}</Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Plating</Label>
              <div className="flex flex-wrap gap-2">
                {PLATING_OPTIONS.map((v) => (
                  <Button key={v} type="button" variant={form.filterAttributes?.platings?.includes(v) ? 'default' : 'outline'} size="sm" onClick={() => toggleFilter('platings', v)}>{v}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Benefits (one per line)</Label>
              <Textarea value={form.benefits} onChange={(e) => setForm((p) => ({ ...p, benefits: e.target.value }))} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Who Should Wear</Label>
              <Textarea value={form.whoShouldWear} onChange={(e) => setForm((p) => ({ ...p, whoShouldWear: e.target.value }))} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Wearing Rules</Label>
              <Textarea value={form.wearingRules} onChange={(e) => setForm((p) => ({ ...p, wearingRules: e.target.value }))} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Tags (one per line)</Label>
              <Textarea value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} rows={2} />
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.isFeatured} onCheckedChange={(c) => setForm((p) => ({ ...p, isFeatured: c }))} />
                <Label>Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.isBestseller} onCheckedChange={(c) => setForm((p) => ({ ...p, isBestseller: c }))} />
                <Label>Bestseller</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.isNew} onCheckedChange={(c) => setForm((p) => ({ ...p, isNew: c }))} />
                <Label>New</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.status === 'active'} onCheckedChange={(c) => setForm((p) => ({ ...p, status: c ? 'active' : 'draft' }))} />
                <Label>Active</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Sort order</Label>
              <Input type="number" min={0} value={form.sortOrder} onChange={(e) => setForm((p) => ({ ...p, sortOrder: e.target.value }))} />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Product
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
