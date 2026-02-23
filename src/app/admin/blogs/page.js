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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, BookOpen } from 'lucide-react';
import { blogsApi } from '@/services/adminApi';

const BLOG_CATEGORIES = [
  { id: 'rudraksha', name: 'Rudraksha Guide' },
  { id: 'yantra', name: 'Yantra Knowledge' },
  { id: 'crystals', name: 'Crystal Healing' },
  { id: 'meditation', name: 'Meditation' },
  { id: 'astrology', name: 'Astrology' },
  { id: 'rituals', name: 'Rituals & Practices' },
  { id: 'wellness', name: 'Spiritual Wellness' },
];

import { imageSrc } from '@/lib/utils';

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterStatus !== 'all') params.status = filterStatus;
      if (filterCategory !== 'all') params.category = filterCategory;
      if (search.trim()) params.search = search.trim();
      const data = await blogsApi.getAll(params);
      setPosts(data?.blogPosts ?? []);
    } catch (e) {
      toast.error(e?.message || 'Failed to load blog posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await blogsApi.delete(deleteId);
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success('Blog post deleted');
      setDeleteId(null);
    } catch (e) {
      toast.error(e?.message || 'Failed to delete');
    }
  };

  const catName = (id) => BLOG_CATEGORIES.find((c) => c.id === id)?.name ?? id ?? '—';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage articles and spiritual insights</p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog Post
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {BLOG_CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
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
            <BookOpen className="h-5 w-5" />
            All Blog Posts ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-12 w-16 rounded-lg" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No blog posts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="h-12 w-16 rounded-lg bg-muted overflow-hidden">
                          {post.image ? (
                            <img
                              src={imageSrc(post.image) || post.image}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                              —
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium line-clamp-1">{post.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {post.slug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{catName(post.category)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        <div className="flex gap-1 mt-1">
                          {post.isFeatured && (
                            <Badge variant="outline" className="text-[10px]">
                              Featured
                            </Badge>
                          )}
                          {post.isMustRead && (
                            <Badge variant="outline" className="text-[10px]">
                              Must Read
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                        {post.date || post.publishedAt?.slice(0, 10) || '—'}
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
                              <Link href={`/admin/blogs/${post.id}/edit`}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {post.status === 'published' && (
                              <DropdownMenuItem asChild>
                                <a
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </a>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteId(post.id)}
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
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This action cannot be undone.
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
