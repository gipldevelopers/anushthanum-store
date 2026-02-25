'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { usersApi } from '@/services/adminApi';

export default function AdminUserEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    spiritualLevel: '',
    isActive: true,
  });

  useEffect(() => {
    if (!id) return;
    usersApi
      .getById(id)
      .then((data) => {
        const u = data?.user;
        if (!u) {
          toast.error('User not found');
          router.push('/admin/users');
          return;
        }
        setForm({
          name: u.name ?? '',
          phone: u.phone ?? '',
          dateOfBirth: u.dateOfBirth ? String(u.dateOfBirth).slice(0, 10) : '',
          spiritualLevel: u.spiritualLevel ?? '',
          isActive: !!u.isActive,
        });
      })
      .catch((e) => {
        toast.error(e?.message || 'Failed to load user');
        router.push('/admin/users');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      await usersApi.update(id, {
        name: form.name.trim() || null,
        phone: form.phone.trim() || null,
        dateOfBirth: form.dateOfBirth?.trim() || null,
        spiritualLevel: form.spiritualLevel?.trim() || null,
        isActive: form.isActive,
      });
      toast.success('User updated successfully');
      router.push(`/admin/users/${id}`);
    } catch (e) {
      toast.error(e?.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-80 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/users/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Edit User</h1>
          <p className="text-muted-foreground mt-1">Update user details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Basic information (read-only: email, sign-in method)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="User name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="Phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => setForm((p) => ({ ...p, dateOfBirth: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spiritualLevel">Spiritual Level</Label>
              <Input
                id="spiritualLevel"
                value={form.spiritualLevel}
                onChange={(e) => setForm((p) => ({ ...p, spiritualLevel: e.target.value }))}
                placeholder="e.g. Beginner, Intermediate"
              />
            </div>
            <div className="flex items-center gap-4 pt-4 border-t">
              <Switch
                id="isActive"
                checked={form.isActive}
                onCheckedChange={(c) => setForm((p) => ({ ...p, isActive: c }))}
              />
              <Label htmlFor="isActive">Active (user can sign in)</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href={`/admin/users/${id}`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
