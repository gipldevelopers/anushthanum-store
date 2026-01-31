'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  CreditCard,
  LogOut,
  ChevronRight,
  Edit3,
  Plus,
  Trash2,
  Eye,
  Download,
  Star,
  ShoppingBag,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { products } from '@/data/products';
import { useAuth } from '@/context/AuthContext';

const defaultUser = {
  name: 'Arjun Sharma',
  email: 'arjun.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: '',
  memberSince: 'January 2024',
  spiritualLevel: 'Regular Practitioner',
};

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 4999,
    items: [
      { name: '5 Mukhi Rudraksha', quantity: 1, price: 2999, image: '' },
      { name: 'Tiger Eye Bracelet', quantity: 1, price: 2000, image: '' },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 8999,
    items: [{ name: 'Sri Yantra Plate', quantity: 1, price: 8999, image: '' }],
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-25',
    status: 'processing',
    total: 3499,
    items: [{ name: 'Rudraksha Mala', quantity: 1, price: 3499, image: '' }],
  },
];

const mockAddresses = [
  {
    id: '1',
    type: 'Home',
    name: 'Arjun Sharma',
    address: '42, Spiritual Heights, Sector 15',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Office',
    name: 'Arjun Sharma',
    address: 'Tech Park, Tower B, 5th Floor',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    phone: '+91 98765 43210',
    isDefault: false,
  },
];

const statusConfig = {
  delivered: {
    color: 'bg-green-500/10 text-green-600 border-green-500/20',
    icon: CheckCircle2,
    label: 'Delivered',
  },
  shipped: {
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    icon: Truck,
    label: 'Shipped',
  },
  processing: {
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Clock,
    label: 'Processing',
  },
  cancelled: {
    color: 'bg-red-500/10 text-red-600 border-red-500/20',
    icon: Trash2,
    label: 'Cancelled',
  },
};

const menuItems = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user: authUser, isAuthenticated, isLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [wishlistItems] = useState(products.slice(0, 4));

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace('/signin');
      return;
    }
  }, [isLoading, isAuthenticated, router]);

  const mockUser = authUser
    ? {
        name: authUser.name || defaultUser.name,
        email: authUser.email || defaultUser.email,
        phone: authUser.phone || defaultUser.phone,
        avatar: defaultUser.avatar,
        memberSince: authUser.memberSince || defaultUser.memberSince,
        spiritualLevel: defaultUser.spiritualLevel,
      }
    : defaultUser;

  const getStatusConfig = (status) =>
    statusConfig[status] || statusConfig.processing;

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-8 md:py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="relative group">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-lg">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl md:text-3xl font-serif">
                  {mockUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Change photo"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1">
                {mockUser.name}
              </h1>
              <p className="text-muted-foreground mb-2">{mockUser.email}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Badge variant="secondary" className="gap-1">
                  <Star className="w-3 h-3" />
                  {mockUser.spiritualLevel}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Calendar className="w-3 h-3" />
                  Member since {mockUser.memberSince}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/track-order">
                  <Truck className="w-4 h-4 mr-2" />
                  Track Order
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                    <Separator className="my-2" />
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        router.push('/signin');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </motion.aside>

            <div className="lg:hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-5 mb-6">
                  {menuItems.map((item) => (
                    <TabsTrigger
                      key={item.id}
                      value={item.id}
                      className="flex-col gap-1 py-2"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs">{item.label.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: 'Total Orders',
                        value: '12',
                        icon: Package,
                        color: 'text-blue-600',
                      },
                      {
                        label: 'Wishlist Items',
                        value: '4',
                        icon: Heart,
                        color: 'text-rose-600',
                      },
                      {
                        label: 'Saved Addresses',
                        value: '2',
                        icon: MapPin,
                        color: 'text-green-600',
                      },
                      {
                        label: 'Reward Points',
                        value: '850',
                        icon: Star,
                        color: 'text-amber-600',
                      },
                    ].map((stat) => (
                      <Card key={stat.label}>
                        <CardContent className="p-4 text-center">
                          <stat.icon
                            className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}
                          />
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Your latest purchases</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => setActiveTab('orders')}
                      >
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockOrders.slice(0, 2).map((order) => {
                          const status = getStatusConfig(order.status);
                          const StatusIcon = status.icon;
                          return (
                            <div
                              key={order.id}
                              className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                            >
                              <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.items.length} item
                                  {order.items.length > 1 ? 's' : ''} • ₹
                                  {order.total.toLocaleString()}
                                </p>
                              </div>
                              <Badge variant="outline" className={status.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Your Wishlist</CardTitle>
                        <CardDescription>
                          Items you&apos;ve saved for later
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => setActiveTab('wishlist')}
                      >
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {wishlistItems.slice(0, 4).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group"
                          >
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {product.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ₹{product.price.toLocaleString()}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>
                        Track and manage your orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockOrders.map((order) => {
                          const status = getStatusConfig(order.status);
                          const StatusIcon = status.icon;
                          return (
                            <div
                              key={order.id}
                              className="border rounded-xl overflow-hidden"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/50">
                                <div className="flex items-center gap-4">
                                  <div>
                                    <p className="font-semibold">{order.id}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Placed on{' '}
                                      {new Date(order.date).toLocaleDateString(
                                        'en-IN',
                                        {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                        }
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className={status.color}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {status.label}
                                  </Badge>
                                  <p className="font-semibold">
                                    ₹{order.total.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <div className="p-4 space-y-3">
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-4"
                                  >
                                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                                      <Package className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-medium">
                                      ₹{item.price.toLocaleString()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-end gap-2 p-4 border-t bg-muted/30 flex-wrap">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 mr-2" />
                                  Invoice
                                </Button>
                                {order.status === 'shipped' && (
                                  <Button size="sm" asChild>
                                    <Link href="/track-order">
                                      <Truck className="w-4 h-4 mr-2" />
                                      Track Order
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
                      <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>
                          Manage your delivery addresses
                        </CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Address
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Full Name</Label>
                                <Input placeholder="Enter full name" />
                              </div>
                              <div>
                                <Label>Phone Number</Label>
                                <Input placeholder="+91" />
                              </div>
                            </div>
                            <div>
                              <Label>Address</Label>
                              <Input placeholder="House no., Building, Street" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>City</Label>
                                <Input placeholder="City" />
                              </div>
                              <div>
                                <Label>State</Label>
                                <Input placeholder="State" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Pincode</Label>
                                <Input placeholder="6-digit pincode" />
                              </div>
                              <div>
                                <Label>Address Type</Label>
                                <Input placeholder="Home / Office / Other" />
                              </div>
                            </div>
                            <Button className="w-full">Save Address</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {mockAddresses.map((address) => (
                          <div
                            key={address.id}
                            className={`relative p-4 rounded-xl border-2 ${
                              address.isDefault
                                ? 'border-primary bg-primary/5'
                                : 'border-border'
                            }`}
                          >
                            {address.isDefault && (
                              <Badge
                                className="absolute top-3 right-3"
                                variant="default"
                              >
                                Default
                              </Badge>
                            )}
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-semibold">{address.type}</span>
                            </div>
                            <p className="font-medium">{address.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {address.address}
                              <br />
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {address.phone}
                            </p>
                            <div className="flex gap-2 mt-4 flex-wrap">
                              <Button variant="outline" size="sm">
                                <Edit3 className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              {!address.isDefault && (
                                <>
                                  <Button variant="outline" size="sm">
                                    Set Default
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Wishlist</CardTitle>
                      <CardDescription>
                        {wishlistItems.length} items saved for later
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((product) => (
                          <div
                            key={product.id}
                            className="group relative bg-muted/50 rounded-xl overflow-hidden"
                          >
                            <Link href={`/product/${product.slug}`}>
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </Link>
                            <button
                              type="button"
                              className="absolute top-3 right-3 w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              aria-label="Remove from wishlist"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                            <div className="p-4">
                              <Link href={`/product/${product.slug}`}>
                                <h3 className="font-medium group-hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-muted-foreground mb-3">
                                {product.category}
                              </p>
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <div>
                                  <span className="font-bold text-lg">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through ml-2">
                                      ₹
                                      {product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <Button size="sm" asChild>
                                  <Link href={`/product/${product.slug}`}>
                                    Add to Cart
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input defaultValue={mockUser.name} />
                        </div>
                        <div>
                          <Label>Email Address</Label>
                          <Input
                            defaultValue={mockUser.email}
                            type="email"
                          />
                        </div>
                        <div>
                          <Label>Phone Number</Label>
                          <Input defaultValue={mockUser.phone} />
                        </div>
                        <div>
                          <Label>Date of Birth</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password regularly for security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Current Password</Label>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>New Password</Label>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <Label>Confirm New Password</Label>
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <Button>Update Password</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          label: 'Order Updates',
                          description: 'Get notified about your order status',
                          defaultChecked: true,
                        },
                        {
                          label: 'Promotions & Offers',
                          description: 'Receive exclusive deals and discounts',
                          defaultChecked: true,
                        },
                        {
                          label: 'New Arrivals',
                          description: 'Be the first to know about new products',
                          defaultChecked: false,
                        },
                        {
                          label: 'Spiritual Insights',
                          description: 'Weekly spiritual wisdom and tips',
                          defaultChecked: true,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch defaultChecked={item.defaultChecked} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>
                          Manage your saved payment options
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Card
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-destructive">
                        Danger Zone
                      </CardTitle>
                      <CardDescription>
                        Irreversible actions for your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="font-medium">Delete Account</p>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all associated
                            data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
