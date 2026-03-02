'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { dashboardApi } from '@/services/adminApi';
import {
  FolderTree,
  Layers,
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  IndianRupee,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await dashboardApi.getStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Categories', value: stats?.totalCategories ?? 0, icon: FolderTree, color: 'text-blue-600', bgColor: 'bg-blue-100', href: '/admin/categories' },
    { title: 'Sub-Categories', value: stats?.totalSubCategories ?? 0, icon: Layers, color: 'text-purple-600', bgColor: 'bg-purple-100', href: '/admin/subcategories' },
    { title: 'Total Products', value: stats?.totalProducts ?? 0, icon: Package, color: 'text-green-600', bgColor: 'bg-green-100', href: '/admin/products' },
    { title: 'Total Orders', value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: 'text-orange-600', bgColor: 'bg-orange-100', href: '/admin/orders' },
  ];

  const quickActions = [
    { label: 'Add Product', href: '/admin/products/new', icon: Package },
    { label: 'Add Category', href: '/admin/categories/new', icon: FolderTree },
    { label: 'Upload Media', href: '/admin/media', icon: Plus },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your store overview.</p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => (
            <Button key={action.href} asChild variant="outline" size="sm">
              <Link href={action.href}>
                <action.icon className="h-4 w-4 mr-1.5" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 md:p-6">
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ) : (
                  <>
                    <div className={`inline-flex p-2.5 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{stat.title}</p>
                    <p className="text-2xl md:text-3xl font-bold mt-1">{Number(stat.value).toLocaleString()}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Active Products
                </div>
                <p className="text-2xl font-bold mt-2">{stats?.activeProducts}</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Pending Orders
                </div>
                <p className="text-2xl font-bold mt-2">{stats?.pendingOrders}</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IndianRupee className="h-4 w-4 text-primary" />
                  Total Revenue
                </div>
                <p className="text-2xl font-bold mt-2">₹{Number(stats?.revenue ?? 0).toLocaleString()}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <CardDescription>Latest orders from your store</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/orders">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : stats?.recentOrders?.length ? (
              <div className="space-y-1">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{Number(order.total).toLocaleString()}</p>
                      <Badge variant={order.status === 'pending' ? 'secondary' : 'default'} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No recent orders</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Products</CardTitle>
                <CardDescription>Recently added products</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/products">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ) : stats?.recentProducts?.length ? (
              <div className="space-y-1">
                {stats.recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 py-3 border-b last:border-0">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.categoryName}</p>
                    </div>
                    <p className="font-medium">₹{Number(product.price).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No products yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
