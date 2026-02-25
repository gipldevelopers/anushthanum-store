'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Plus, MoreHorizontal, Pencil, Trash2, SlidersHorizontal } from 'lucide-react';
import { filterAttributesApi } from '@/services/adminApi';

export default function AdminFilterAttributesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryDialog, setCategoryDialog] = useState({ open: false, edit: null });
  const [attributeDialog, setAttributeDialog] = useState({ open: false, categoryId: null, edit: null });
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [deleteAttributeId, setDeleteAttributeId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [categoryForm, setCategoryForm] = useState({ name: '', sortOrder: 0 });
  const [attributeForm, setAttributeForm] = useState({ name: '', sortOrder: 0 });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await filterAttributesApi.getAll();
      setCategories(data?.filterCategories ?? []);
    } catch (e) {
      toast.error(e?.message || 'Failed to load filter attributes');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openAddCategory = () => {
    setCategoryForm({ name: '', sortOrder: categories.length });
    setCategoryDialog({ open: true, edit: null });
  };
  const openEditCategory = (cat) => {
    setCategoryForm({ name: cat.name, sortOrder: cat.sortOrder ?? 0 });
    setCategoryDialog({ open: true, edit: cat });
  };
  const openAddAttribute = (cat) => {
    setAttributeForm({ name: '', sortOrder: (cat.attributes?.length ?? 0) });
    setAttributeDialog({ open: true, categoryId: cat.id, edit: null });
  };
  const openEditAttribute = (attr, cat) => {
    setAttributeForm({ name: attr.name, sortOrder: attr.sortOrder ?? 0 });
    setAttributeDialog({ open: true, categoryId: cat.id, edit: attr });
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    setSaving(true);
    try {
      if (categoryDialog.edit) {
        await filterAttributesApi.updateCategory(categoryDialog.edit.id, categoryForm);
        toast.success('Category updated');
      } else {
        await filterAttributesApi.createCategory(categoryForm);
        toast.success('Category created');
      }
      setCategoryDialog({ open: false, edit: null });
      fetchCategories();
    } catch (e) {
      toast.error(e?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAttribute = async () => {
    if (!attributeForm.name.trim()) {
      toast.error('Attribute name is required');
      return;
    }
    if (!attributeDialog.categoryId) return;
    setSaving(true);
    try {
      if (attributeDialog.edit) {
        await filterAttributesApi.updateAttribute(attributeDialog.edit.id, attributeForm);
        toast.success('Attribute updated');
      } else {
        await filterAttributesApi.createAttribute({ ...attributeForm, categoryId: attributeDialog.categoryId });
        toast.success('Attribute added');
      }
      setAttributeDialog({ open: false, categoryId: null, edit: null });
      fetchCategories();
    } catch (e) {
      toast.error(e?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId) return;
    try {
      await filterAttributesApi.deleteCategory(deleteCategoryId);
      toast.success('Category deleted');
      setDeleteCategoryId(null);
      fetchCategories();
    } catch (e) {
      toast.error(e?.message || 'Failed to delete');
    }
  };

  const handleDeleteAttribute = async () => {
    if (!deleteAttributeId) return;
    try {
      await filterAttributesApi.deleteAttribute(deleteAttributeId);
      toast.success('Attribute deleted');
      setDeleteAttributeId(null);
      fetchCategories();
    } catch (e) {
      toast.error(e?.message || 'Failed to delete');
    }
  };

  const cat = categories.find((c) => c.id === attributeDialog.categoryId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Filter Attributes</h1>
          <p className="text-muted-foreground mt-1">Manage filter categories and attributes for the category page</p>
        </div>
        <Button onClick={openAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-24 rounded bg-muted" />
              <div className="h-24 rounded bg-muted" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{cat.name}</CardTitle>
                    <CardDescription>Slug: {cat.slug} — {cat.attributes?.length ?? 0} attributes</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => openAddAttribute(cat)}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditCategory(cat)}>
                          <Pencil className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteCategoryId(cat.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(cat.attributes ?? []).map((attr) => (
                    <span
                      key={attr.id}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted text-sm"
                    >
                      {attr.name}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 -mr-1">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditAttribute(attr, cat)}>
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteAttributeId(attr.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  ))}
                  {(!cat.attributes || cat.attributes.length === 0) && (
                    <span className="text-sm text-muted-foreground">No attributes yet</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {categories.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <SlidersHorizontal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No filter categories. Add one to get started.</p>
                <Button className="mt-4" onClick={openAddCategory}>
                  <Plus className="h-4 w-4 mr-2" /> Add Category
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Category Dialog */}
      <Dialog open={categoryDialog.open} onOpenChange={(o) => setCategoryDialog({ ...categoryDialog, open: o })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{categoryDialog.edit ? 'Edit Category' : 'Add Filter Category'}</DialogTitle>
            <DialogDescription>Category name becomes the slug (e.g. Purpose → purposes)</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={categoryForm.name}
                onChange={(e) => setCategoryForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Purpose"
              />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input
                type="number"
                min={0}
                value={categoryForm.sortOrder}
                onChange={(e) => setCategoryForm((p) => ({ ...p, sortOrder: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialog({ open: false, edit: null })}>Cancel</Button>
            <Button onClick={handleSaveCategory} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Attribute Dialog */}
      <Dialog open={attributeDialog.open} onOpenChange={(o) => !o && setAttributeDialog({ open: false, categoryId: null, edit: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {attributeDialog.edit ? 'Edit Attribute' : 'Add Attribute'}
              {cat && ` (${cat.name})`}
            </DialogTitle>
            <DialogDescription>Add an attribute value for the category page filter</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={attributeForm.name}
                onChange={(e) => setAttributeForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Health, Rudraksha"
              />
            </div>
            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input
                type="number"
                min={0}
                value={attributeForm.sortOrder}
                onChange={(e) => setAttributeForm((p) => ({ ...p, sortOrder: Number(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAttributeDialog({ open: false, categoryId: null, edit: null })}>Cancel</Button>
            <Button onClick={handleSaveAttribute} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category */}
      <AlertDialog open={!!deleteCategoryId} onOpenChange={(o) => !o && setDeleteCategoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete filter category?</AlertDialogTitle>
            <AlertDialogDescription>This will also delete all attributes in this category. Products using these filters will be affected.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Attribute */}
      <AlertDialog open={!!deleteAttributeId} onOpenChange={(o) => !o && setDeleteAttributeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete attribute?</AlertDialogTitle>
            <AlertDialogDescription>Products using this attribute will no longer match this filter.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAttribute} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
