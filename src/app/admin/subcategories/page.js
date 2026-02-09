'use client';

import { useState, useEffect } from 'react';
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
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Layers,
} from 'lucide-react';

const mockCategories = [
  { id: '1', name: 'Rudraksha' },
  { id: '2', name: 'Yantra' },
  { id: '3', name: 'Bracelets' },
  { id: '4', name: 'Crystals' },
];

const mockSubCategories = [
  { id: '1', parentCategoryId: '1', parentCategoryName: 'Rudraksha', name: 'Single Mukhi', slug: 'single-mukhi', description: '1 to 14 Mukhi beads', status: 'active', productCount: 14, createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-15T10:30:00Z' },
  { id: '2', parentCategoryId: '1', parentCategoryName: 'Rudraksha', name: 'Mala', slug: 'mala', description: 'Rudraksha malas', status: 'active', productCount: 8, createdAt: '2024-01-16T11:00:00Z', updatedAt: '2024-01-16T11:00:00Z' },
  { id: '3', parentCategoryId: '2', parentCategoryName: 'Yantra', name: 'Pendants', slug: 'pendants', description: 'Yantra pendants', status: 'active', productCount: 12, createdAt: '2024-01-17T09:15:00Z', updatedAt: '2024-01-17T09:15:00Z' },
  { id: '4', parentCategoryId: '3', parentCategoryName: 'Bracelets', name: 'Gemstone Bracelets', slug: 'gemstone-bracelets', description: 'Crystal and gemstone bracelets', status: 'inactive', productCount: 18, createdAt: '2024-01-18T14:45:00Z', updatedAt: '2024-01-18T14:45:00Z' },
];

export default function AdminSubCategoriesPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories] = useState(mockCategories);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 600));
      setSubCategories(mockSubCategories);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredSubCategories = subCategories.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || sub.parentCategoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleStatus = (id) => {
    setSubCategories((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, status: sub.status === 'active' ? 'inactive' : 'active' }
          : sub
      )
    );
    toast.success('Status updated successfully');
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setSubCategories((prev) => prev.filter((sub) => sub.id !== deleteId));
    toast.success('Sub-category deleted successfully');
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sub-Categories</h1>
          <p className="text-muted-foreground mt-1">Manage product sub-categories</p>
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
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Parent Category</TableHead>
                  <TableHead className="hidden md:table-cell">Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-8" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredSubCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No sub-categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubCategories.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {sub.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{sub.parentCategoryName}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {sub.productCount}
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleToggleStatus(sub.id)}>
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
              Are you sure you want to delete this sub-category? Products in this sub-category will be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
