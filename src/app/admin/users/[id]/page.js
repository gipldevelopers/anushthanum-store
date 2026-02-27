'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft, Phone, Calendar, Package, MapPin, CreditCard, Star, Pencil } from 'lucide-react';
import { usersApi } from '@/services/adminApi';
import { imageSrc } from '@/lib/utils';



export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    usersApi
      .getById(id)
      .then((data) => setUser(data?.user))
      .catch((e) => {
        toast.error(e?.message || 'Failed to load user');
        router.push('/admin/users');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading || !user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">User Details</h1>
            <p className="text-muted-foreground mt-1">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/users/${user.id}/edit`}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit User
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={imageSrc(user.avatar)} alt="" />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {(user.name || user.email || '?').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name || 'No name'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant={user.signInMethod === 'google' ? 'default' : 'secondary'}>
                    {user.signInMethod === 'google' ? 'Google' : 'Manual / Email'}
                  </Badge>
                  <Badge variant={user.isActive ? 'default' : 'secondary'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  {user.emailVerified && <Badge variant="outline">Verified</Badge>}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.dateOfBirth && (
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(user.dateOfBirth).toLocaleDateString()}</span>
              </div>
            )}
            {user.spiritualLevel && (
              <div className="flex items-center gap-3 text-sm">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span>{user.spiritualLevel}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>Reward points: {user.rewardPoints ?? 0}</span>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Activity
              </CardTitle>
              <CardDescription>Orders, wishlist, reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-2xl font-bold">{user.ordersCount ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Orders</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-2xl font-bold">{user.wishlistCount ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Wishlist</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-2xl font-bold">{user.cartItemsCount ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Cart items</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-2xl font-bold">{user.reviewsCount ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {(user.addresses?.length ?? 0) > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Addresses ({user.addresses?.length ?? 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.addresses.map((addr) => (
                    <div key={addr.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{addr.type}</span>
                        {addr.isDefault && <Badge variant="outline">Default</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {addr.name}
                        <br />
                        {addr.street}, {addr.city}, {addr.state} {addr.pincode}
                        {addr.phone && (
                          <>
                            <br />
                            {addr.phone}
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {(user.recentOrders?.length ?? 0) > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Last 10 orders</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/orders?customer=${user.id}`}>View all</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 font-medium">Order</th>
                        <th className="text-left p-3 font-medium">Total</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Date</th>
                        <th className="p-3 w-[80px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.recentOrders.map((o) => (
                        <tr key={o.id} className="border-b last:border-0">
                          <td className="p-3 font-medium">{o.orderNumber}</td>
                          <td className="p-3">₹{Number(o.subtotal).toLocaleString()}</td>
                          <td className="p-3">
                            <Badge variant="outline">{o.status}</Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href="/admin/orders">View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {(!user.addresses || user.addresses.length === 0) &&
            (!user.recentOrders || user.recentOrders.length === 0) && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No addresses or orders yet.
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
}
