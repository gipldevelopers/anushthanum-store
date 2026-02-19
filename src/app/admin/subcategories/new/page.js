'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { subCategoriesApi, categoriesApi } from '@/services/adminApi';

const generateSlug = (n) =>
  String(n)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function NewSubCategoryPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    parentId: '',
    name: '',
    slug: '',
    description: '',
    status: 'active',
    sortOrder: 0,
  });

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

  const onName = (name) =>
    setForm((p) => ({ ...p, name, slug: p.slug || generateSlug(name) }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.parentId) {
      toast.error('Name and parent category are required');
      return;
    }
    setSaving(true);
    try {
      await subCategoriesApi.create({
        parentId: Number(form.parentId),
        name: form.name.trim(),
        slug: form.slug?.trim() || generateSlug(form.name),
        description: form.description?.trim() || null,
        status: form.status,
        sortOrder: Number(form.sortOrder) || 0,
      });
      toast.success('Sub-category created.');
      router.push('/admin/subcategories');
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
          <Link href="/admin/subcategories"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Sub-Category</h1>
          <p className="text-muted-foreground">Create a sub-category under a navbar category</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Sub-category details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Parent Category *</Label>
              <Select
                value={form.parentId}
                onValueChange={(v) => setForm((p) => ({ ...p, parentId: v }))}
              >
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
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => onName(e.target.value)}
                  placeholder="e.g. Rudraksha Beads"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Label htmlFor="sortOrder">Sort order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={(e) => setForm((p) => ({ ...p, sortOrder: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between flex-1">
                <div>
                  <Label htmlFor="status">Active</Label>
                  <p className="text-sm text-muted-foreground">Visible on website</p>
                </div>
                <Switch
                  id="status"
                  checked={form.status === 'active'}
                  onCheckedChange={(c) =>
                    setForm((p) => ({ ...p, status: c ? 'active' : 'inactive' }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Sub-Category
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/subcategories">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
