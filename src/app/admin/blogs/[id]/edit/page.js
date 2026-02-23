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
import { blogsApi, uploadApi } from '@/services/adminApi';

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

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    authorName: '',
    authorAvatar: '',
    authorRole: '',
    category: '',
    tags: '',
    readTime: '',
    isMustRead: false,
    isPopular: false,
    isFeatured: false,
    status: 'draft',
    sortOrder: 0,
  });

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
      const data = await uploadApi.uploadBlogImage(file);
      setFormData((prev) => ({ ...prev, image: data?.url ?? '' }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await blogsApi.getById(id);
        const post = data?.blogPost;
        if (!post) {
          toast.error('Blog post not found');
          router.push('/admin/blogs');
          return;
        }
        const author = post.author || {};
        const tagsArr = Array.isArray(post.tags) ? post.tags : [];
        setFormData({
          title: post.title ?? '',
          slug: post.slug ?? '',
          excerpt: post.excerpt ?? '',
          content: post.content ?? '',
          image: post.image ?? '',
          authorName: post.authorName ?? author.name ?? '',
          authorAvatar: post.authorAvatar ?? author.avatar ?? '',
          authorRole: post.authorRole ?? author.role ?? '',
          category: post.category ?? '',
          tags: tagsArr.join(', '),
          readTime: post.readTime ?? '',
          isMustRead: post.isMustRead ?? false,
          isPopular: post.isPopular ?? false,
          isFeatured: post.isFeatured ?? false,
          status: post.status ?? 'draft',
          sortOrder: post.sortOrder ?? 0,
        });
      } catch (e) {
        toast.error(e?.message || 'Failed to load blog post');
        router.push('/admin/blogs');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const tags = formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
      await blogsApi.update(id, {
        title: formData.title.trim(),
        slug: formData.slug?.trim(),
        excerpt: formData.excerpt?.trim() || null,
        content: formData.content?.trim() || '',
        image: formData.image?.trim() || null,
        authorName: formData.authorName?.trim() || null,
        authorAvatar: formData.authorAvatar?.trim() || null,
        authorRole: formData.authorRole?.trim() || null,
        category: formData.category || null,
        tags,
        readTime: formData.readTime?.trim() || null,
        isMustRead: formData.isMustRead,
        isPopular: formData.isPopular,
        isFeatured: formData.isFeatured,
        status: formData.status,
        sortOrder: Number(formData.sortOrder) ?? 0,
      });
      toast.success('Blog post updated.');
      router.push('/admin/blogs');
    } catch (err) {
      toast.error(err?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blogs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground">Update article details</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Title, excerpt and content (Markdown supported)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Complete Guide to Choosing Your First Rudraksha"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read time</Label>
                <Input
                  id="readTime"
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, readTime: e.target.value }))
                  }
                  placeholder="e.g. 8 min read"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Brief description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Full article content. Use ## for headings, - for lists, **bold**..."
                rows={14}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
            <CardDescription>Main image for the blog post</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              {formData.image ? (
                <div className="relative inline-flex w-fit">
                  <div className="relative h-40 w-64 rounded-md border bg-muted overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc(formData.image) || formData.image}
                      alt="Featured"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  {uploading ? 'Uploading...' : 'Upload image'}
                </Button>
              )}
              <p className="text-xs text-muted-foreground">JPEG, PNG, GIF or WebP, max 5MB</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Author & Metadata</CardTitle>
            <CardDescription>Author info and categorization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="authorName">Author name</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, authorName: e.target.value }))
                  }
                  placeholder="e.g. Dr. Priya Devi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorRole">Author role</Label>
                <Input
                  id="authorRole"
                  value={formData.authorRole}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, authorRole: e.target.value }))
                  }
                  placeholder="e.g. Vedic Scholar"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorAvatar">Author avatar URL</Label>
                <Input
                  id="authorAvatar"
                  value={formData.authorAvatar}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, authorAvatar: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category || 'none'}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, category: v === 'none' ? '' : v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {BLOG_CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  placeholder="rudraksha, beginners, guide"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor="status">Published</Label>
                  <p className="text-sm text-muted-foreground">Make visible on blog</p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status === 'published'}
                  onCheckedChange={(c) =>
                    setFormData((prev) => ({ ...prev, status: c ? 'published' : 'draft' }))
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="isFeatured">Featured</Label>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(c) =>
                    setFormData((prev) => ({ ...prev, isFeatured: c }))
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="isMustRead">Must Read</Label>
                <Switch
                  id="isMustRead"
                  checked={formData.isMustRead}
                  onCheckedChange={(c) =>
                    setFormData((prev) => ({ ...prev, isMustRead: c }))
                  }
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="isPopular">Popular</Label>
                <Switch
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(c) =>
                    setFormData((prev) => ({ ...prev, isPopular: c }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2 max-w-[120px]">
              <Label htmlFor="sortOrder">Sort order</Label>
              <Input
                id="sortOrder"
                type="number"
                min={0}
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sortOrder: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Blog Post
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/blogs">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
