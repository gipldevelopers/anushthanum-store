'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Layers } from 'lucide-react';
import { subCategoriesApi, categoriesApi } from '@/services/adminApi';
import { imageSrc } from '@/lib/utils';



export default function AdminSubCategoriesPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoriesApi.getAll({ type: 'main' });
      setCategories(data?.categories ?? []);
    } catch {
      setCategories([]);
    }
  }, []);

  const fetchSubCategories = useCallback(async () => {
    setLoading(true);
    try {
      const params = filterCategory !== 'all' ? { parentId: filterCategory } : {};
      const data = await subCategoriesApi.getAll(params);
      setSubCategories(data?.subCategories ?? []);
    } catch (e) {
      toast.error(e?.message || 'Failed to load sub-categories');
      setSubCategories([]);
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  const filteredSubCategories = subCategories.filter((sub) => {
    const matchesSearch = sub.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || String(sub.parentId) === String(filterCategory);
    return matchesSearch && matchesCategory;
  });

  const handleToggleStatus = async (sub) => {
    const newStatus = sub.status === 'active' ? 'inactive' : 'active';
    try {
      await subCategoriesApi.update(sub.id, { status: newStatus });
      setSubCategories((prev) =>
        prev.map((s) => (s.id === sub.id ? { ...s, status: newStatus } : s))
      );
      toast.success('Status updated');
    } catch (e) {
      toast.error(e?.message || 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await subCategoriesApi.delete(deleteId);
      setSubCategories((prev) => prev.filter((s) => s.id !== deleteId));
      toast.success('Sub-category deleted');
      setDeleteId(null);
    } catch (e) {
      toast.error(e?.message || 'Failed to delete');
    }
  };

  const parentName = (sub) => sub.parent?.name ?? categories.find((c) => c.id === sub.parentId)?.name ?? sub.parentId;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sub-Categories</h1>
          <p className="text-muted-foreground mt-1">Manage sub-categories under navbar categories</p>
        </div>
        <Button asChild>
          <Link href="/admin/subcategories/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Sub-Category
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sub-categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="h-5 w-5" />
            All Sub-Categories ({filteredSubCategories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Parent Category</TableHead>
                  <TableHead className="hidden md:table-cell">Sort</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-10 w-12 rounded" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-8" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredSubCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No sub-categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubCategories.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div className="h-10 w-12 rounded bg-muted overflow-hidden">
                          {sub.image ? (
                            <img src={imageSrc(sub.image) || sub.image} alt={sub.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">—</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {sub.slug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{parentName(sub)}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{sub.sortOrder ?? 0}</TableCell>
                      <TableCell>
                        <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/subcategories/${sub.id}/edit`}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(sub)}>
                              {sub.status === 'active' ? (
                                <>
                                  <EyeOff className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteId(sub.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sub-Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? Products in this sub-category may be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
