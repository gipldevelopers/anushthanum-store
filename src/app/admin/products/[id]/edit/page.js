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
import { productsApi, categoriesApi, subCategoriesApi, subSubCategoriesApi, uploadApi, filterAttributesApi } from '@/services/adminApi';
import { imageSrc } from '@/lib/utils';



const textToArray = (s) => (typeof s === 'string' ? s.split('\n').map((x) => x.trim()).filter(Boolean) : Array.isArray(s) ? s : []);
const arrayToText = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
const generateSlug = (n) =>
  String(n || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';

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
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    categoryId: '',
    subCategoryId: '',
    subSubCategoryId: '',
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
    filterAttributes: {},
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
    subSubCategoryId: p.subSubCategoryId ? String(p.subSubCategoryId) : '',
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
    categoriesApi.getAll().then((d) => setCategories(d?.categories ?? [])).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    filterAttributesApi.getAll().then((d) => setFilterCategories(d?.filterCategories ?? [])).catch(() => setFilterCategories([]));
  }, []);

  useEffect(() => {
    if (!form.categoryId) {
      setSubCategories([]);
      setSubSubCategories([]);
      return;
    }
    subCategoriesApi.getByCategory(form.categoryId).then((d) => setSubCategories(d?.subCategories ?? [])).catch(() => setSubCategories([]));
  }, [form.categoryId]);

  useEffect(() => {
    if (!form.subCategoryId) {
      setSubSubCategories([]);
      return;
    }
    subSubCategoriesApi.getBySubCategory(form.subCategoryId).then((d) => setSubSubCategories(d?.subSubCategories ?? [])).catch(() => setSubSubCategories([]));
  }, [form.subCategoryId]);

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
        slug: generateSlug(form.name),
        categoryId: Number(form.categoryId),
        subCategoryId: form.subCategoryId ? Number(form.subCategoryId) : null,
        subSubCategoryId: form.subSubCategoryId ? Number(form.subSubCategoryId) : null,
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
                <Input
                  value={generateSlug(form.name) || form.slug}
                  disabled
                  readOnly
                  className="bg-muted cursor-not-allowed"
                />
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Sub-Sub-Category</Label>
                <Select value={form.subSubCategoryId || '__none__'} onValueChange={(v) => setForm((p) => ({ ...p, subSubCategoryId: v === '__none__' ? '' : v }))} disabled={!form.subCategoryId}>
                  <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">—</SelectItem>
                    {subSubCategories.map((s) => (
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
            <CardTitle>Display &amp; Status</CardTitle>
            <CardDescription>Control where this product appears on the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Label>New Arrivals</Label>
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

        <Card>
          <CardHeader>
            <CardTitle>Filter Attributes</CardTitle>
            <CardDescription>Used for category page filters. Manage categories in Admin → Filter Attributes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {filterCategories.map((cat) => (
              <div key={cat.id}>
                <Label className="mb-2 block">{cat.name}</Label>
                <div className="flex flex-wrap gap-2">
                  {(cat.attributes ?? []).map((attr) => (
                    <Button
                      key={attr.id}
                      type="button"
                      variant={form.filterAttributes?.[cat.slug]?.includes(attr.name) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleFilter(cat.slug, attr.name)}
                    >
                      {attr.name}
                    </Button>
                  ))}
                  {(!cat.attributes || cat.attributes.length === 0) && (
                    <span className="text-sm text-muted-foreground">No attributes. Add in Filter Attributes.</span>
                  )}
                </div>
              </div>
            ))}
            {filterCategories.length === 0 && (
              <p className="text-sm text-muted-foreground">No filter categories. Add them in Admin → Filter Attributes.</p>
            )}
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
