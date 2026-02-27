'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, FolderTree } from 'lucide-react';
import { categoriesApi } from '@/services/adminApi';
import { imageSrc } from '@/lib/utils';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const params = filterType !== 'all' ? { type: filterType } : {};
      const data = await categoriesApi.getAll(params);
      setCategories(data?.categories ?? []);
    } catch (e) {
      toast.error(e?.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filtered = categories.filter(
    (c) => c.name?.toLowerCase().includes(search.toLowerCase()) || c.slug?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = async (cat) => {
    const newStatus = cat.status === 'active' ? 'inactive' : 'active';
    try {
      await categoriesApi.update(cat.id, { status: newStatus });
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? { ...c, status: newStatus } : c)));
      toast.success('Status updated');
    } catch (e) {
      toast.error(e?.message || 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await categoriesApi.delete(deleteId);
      setCategories((prev) => prev.filter((c) => c.id !== deleteId));
      toast.success('Category deleted');
      setDeleteId(null);
    } catch (e) {
      toast.error(e?.message || 'Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage navbar and material-wise categories</p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new"><Plus className="h-4 w-4 mr-2" />Add Category</Link>
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="main">Navbar (main)</SelectItem>
                <SelectItem value="material">Material-wise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FolderTree className="h-5 w-5" />All Categories ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Sort</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-12 w-12 rounded-lg" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-8" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No categories found</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell>
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden">
                          {cat.image ? (
                            <img src={imageSrc(cat.image)} alt={cat.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">—</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{cat.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">{cat.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{cat.type === 'material' ? 'Material' : 'Navbar'}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={cat.status === 'active' ? 'default' : 'secondary'}>{cat.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">{cat.sortOrder ?? 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/categories/${cat.id}/edit`}><Pencil className="h-4 w-4 mr-2" />Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggle(cat)}>
                              {cat.status === 'active' ? <><EyeOff className="h-4 w-4 mr-2" />Deactivate</> : <><Eye className="h-4 w-4 mr-2" />Activate</>}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(cat.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />Delete
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
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>Are you sure? This action cannot be undone. Sub-categories under this category may also be affected.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
