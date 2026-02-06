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
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Package,
  Star,
} from 'lucide-react';

const mockCategories = [
  { id: '1', name: 'Rudraksha' },
  { id: '2', name: 'Yantra' },
  { id: '3', name: 'Bracelets' },
  { id: '4', name: 'Crystals' },
];

const mockProducts = [
  { id: '1', name: '5 Mukhi Rudraksha', slug: '5-mukhi-rudraksha', categoryId: '1', categoryName: 'Rudraksha', price: 1499, discountPrice: 1299, stock: 45, sku: 'RUD-5M-001', shortDescription: 'Sacred 5 Mukhi Rudraksha', thumbnail: '/images/products/rudraksha-5mukhi.jpg', isFeatured: true, isVisible: true, status: 'active' },
  { id: '2', name: 'Rudraksha Bracelet Gold', slug: 'rudraksha-bracelet-gold', categoryId: '3', categoryName: 'Bracelets', price: 2499, stock: 28, sku: 'BRC-RUD-001', shortDescription: 'Premium bracelet with gold accents', thumbnail: '/images/products/rudraksha-bracelet.jpg', isFeatured: false, isVisible: true, status: 'active' },
  { id: '3', name: 'Sri Yantra Pendant', slug: 'sri-yantra-pendant', categoryId: '2', categoryName: 'Yantra', price: 5999, discountPrice: 4999, stock: 12, sku: 'YAN-SRI-001', shortDescription: 'Sacred Sri Yantra in gold', thumbnail: '/images/products/yantra-pendant.jpg', isFeatured: true, isVisible: true, status: 'active' },
  { id: '4', name: 'Amethyst Crystal Sphere', slug: 'amethyst-crystal-sphere', categoryId: '4', categoryName: 'Crystals', price: 2999, stock: 0, sku: 'CRY-AME-001', shortDescription: 'Natural Amethyst crystal', thumbnail: '/images/products/crystal-amethyst.jpg', isFeatured: false, isVisible: false, status: 'inactive' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories] = useState(mockCategories);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise((r) => setTimeout(r, 600));
      setProducts(mockProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.sku && product.sku.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || product.categoryId === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleVisibility = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p)));
    toast.success('Visibility updated');
  };

  const handleToggleFeatured = (id) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p)));
    toast.success('Featured status updated');
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    toast.success('Product deleted successfully');
    setDeleteId(null);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedIds.length > 0 && (
        <Card className="border-primary">
          <CardContent className="py-3 flex items-center justify-between">
            <span className="text-sm font-medium">{selectedIds.length} products selected</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedIds([])}>
                Clear Selection
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden lg:table-cell">SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-12 w-12 rounded-lg" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-10" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(product.id)}
                          onCheckedChange={(checked) => handleSelectOne(product.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden">
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                              {product.shortDescription}
                            </p>
                          </div>
                          {product.isFeatured && (
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{product.categoryName}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {product.sku}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            ₹{Number(product.discountPrice ?? product.price).toLocaleString()}
                          </p>
                          {product.discountPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              ₹{Number(product.price).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={product.stock === 0 ? 'text-destructive font-medium' : ''}>
                          {product.stock === 0 ? 'Out of stock' : product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status}
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
                              <Link href={`/admin/products/${product.id}/edit`}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleVisibility(product.id)}>
                              {product.isVisible ? (
                                <><EyeOff className="h-4 w-4 mr-2" />Hide</>
                              ) : (
                                <><Eye className="h-4 w-4 mr-2" />Show</>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFeatured(product.id)}>
                              <Star className="h-4 w-4 mr-2" />
                              {product.isFeatured ? 'Remove Featured' : 'Make Featured'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteId(product.id)}
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
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
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
