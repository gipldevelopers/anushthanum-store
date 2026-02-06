'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Loader2, Upload, X, Plus, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const generateSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const mockCategories = [
  { id: '1', name: 'Rudraksha' },
  { id: '2', name: 'Yantra' },
  { id: '3', name: 'Bracelets' },
  { id: '4', name: 'Crystals' },
];

const mockSubCategories = [
  { id: '1', parentCategoryId: '1', name: 'Single Mukhi' },
  { id: '2', parentCategoryId: '1', name: 'Mala' },
  { id: '3', parentCategoryId: '2', name: 'Sri Yantra' },
  { id: '4', parentCategoryId: '3', name: 'Rudraksha Bracelets' },
];

const emptyForm = {
  name: '', slug: '', categoryId: '', subCategoryId: '', price: '', discountPrice: '', stock: '', sku: '',
  shortDescription: '', fullDescription: '', thumbnail: '', images: [], tags: [],
  isFeatured: false, isVisible: true, seoTitle: '', seoDescription: '', status: 'active',
};

export default function ProductForm({ isEdit, initialData }) {
  const router = useRouter();
  const [categories] = useState(mockCategories);
  const [subCategories] = useState(mockSubCategories);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState(initialData || emptyForm);

  const handleNameChange = (name) => {
    setFormData((prev) => ({ ...prev, name, slug: isEdit ? prev.slug : generateSlug(name) }));
  };

  const handleImageUpload = (e, type) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (type === 'thumbnail') setFormData((prev) => ({ ...prev, thumbnail: result }));
        else setFormData((prev) => ({ ...prev, images: [...prev.images, result] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.categoryId || !formData.price) {
      toast.error('Name, category and price are required');
      return;
    }
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success(isEdit ? 'Product updated' : 'Product created');
      router.push('/admin/products');
    } catch {
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const filteredSubCategories = subCategories.filter((sub) => sub.parentCategoryId === formData.categoryId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
          <p className="text-muted-foreground">{isEdit ? 'Update product details' : 'Create a new product'}</p>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? 'Update Product' : 'Create Product'}
        </Button>
      </div>

      <form className="grid gap-6 lg:grid-cols-3" onSubmit={handleSubmit}>
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <Card>
                <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g., 5 Mukhi Rudraksha" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input id="slug" value={formData.slug} readOnly className="bg-muted" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select value={formData.categoryId} onValueChange={(value) => setFormData((prev) => ({ ...prev, categoryId: value, subCategoryId: '' }))}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Sub-Category</Label>
                      <Select value={formData.subCategoryId} onValueChange={(value) => setFormData((prev) => ({ ...prev, subCategoryId: value }))} disabled={!formData.categoryId}>
                        <SelectTrigger><SelectValue placeholder="Select sub-category" /></SelectTrigger>
                        <SelectContent>
                          {filteredSubCategories.map((sub) => <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shortDesc">Short Description</Label>
                    <Textarea id="shortDesc" value={formData.shortDescription} onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))} placeholder="Brief product summary" rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullDesc">Full Description</Label>
                    <Textarea id="fullDesc" value={formData.fullDescription} onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))} placeholder="Detailed product description" rows={6} />
                    <p className="text-xs text-muted-foreground">Supports markdown formatting</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add tag and press Enter" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} />
                      <Button type="button" variant="outline" onClick={addTag}><Plus className="h-4 w-4" /></Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)}><X className="h-3 w-3" /></button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload product thumbnail and gallery images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    <div className="flex items-start gap-4">
                      {formData.thumbnail ? (
                        <div className="relative">
                          <img src={formData.thumbnail} alt="Thumbnail" className="h-32 w-32 rounded-lg object-cover border" />
                          <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6" onClick={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))}><X className="h-3 w-3" /></Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-32 w-32 rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-colors">
                          <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground">Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'thumbnail')} />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gallery Images</Label>
                    <div className="flex flex-wrap gap-4">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative">
                          <img src={img} alt={`Gallery ${index + 1}`} className="h-24 w-24 rounded-lg object-cover border" />
                          <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6" onClick={() => removeImage(index)}><X className="h-3 w-3" /></Button>
                        </div>
                      ))}
                      <label className="flex flex-col items-center justify-center h-24 w-24 rounded-lg border-2 border-dashed border-muted-foreground/25 cursor-pointer hover:border-primary/50 transition-colors">
                        <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Add</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, 'gallery')} />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <Card>
                <CardHeader><CardTitle>Pricing & Inventory</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="price">Price (₹) *</Label><Input id="price" type="number" value={formData.price} onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))} placeholder="1499" /></div>
                    <div className="space-y-2"><Label htmlFor="discountPrice">Discount Price (₹)</Label><Input id="discountPrice" type="number" value={formData.discountPrice} onChange={(e) => setFormData((prev) => ({ ...prev, discountPrice: e.target.value }))} placeholder="1299" /></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="stock">Stock Quantity</Label><Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))} placeholder="45" /></div>
                    <div className="space-y-2"><Label htmlFor="sku">SKU / Product Code</Label><Input id="sku" value={formData.sku} onChange={(e) => setFormData((prev) => ({ ...prev, sku: e.target.value }))} placeholder="RUD-5M-001" /></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">Meta Title</Label>
                    <Input id="seoTitle" value={formData.seoTitle} onChange={(e) => setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))} placeholder="SEO title (50-60 characters)" maxLength={60} />
                    <p className="text-xs text-muted-foreground text-right">{formData.seoTitle.length}/60</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">Meta Description</Label>
                    <Textarea id="seoDescription" value={formData.seoDescription} onChange={(e) => setFormData((prev) => ({ ...prev, seoDescription: e.target.value }))} placeholder="SEO description (150-160 characters)" maxLength={160} rows={3} />
                    <p className="text-xs text-muted-foreground text-right">{formData.seoDescription.length}/160</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Product Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div><Label>Visible on Store</Label><p className="text-xs text-muted-foreground">Show on website</p></div>
                <Switch checked={formData.isVisible} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isVisible: checked }))} />
              </div>
              <div className="flex items-center justify-between">
                <div><Label>Featured Product</Label><p className="text-xs text-muted-foreground">Show in featured</p></div>
                <Switch checked={formData.isFeatured} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isFeatured: checked }))} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" asChild><Link href="/admin/products">Cancel</Link></Button>
                <Button type="button" className="flex-1" onClick={handleSubmit} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
