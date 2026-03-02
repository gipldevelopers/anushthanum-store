// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import {
//   User,
//   Package,
//   MapPin,
//   Heart,
//   Settings,
//   CreditCard,
//   LogOut,
//   ChevronRight,
//   Edit3,
//   Plus,
//   Trash2,
//   Eye,
//   Download,
//   Star,
//   ShoppingBag,
//   Calendar,
//   Truck,
//   CheckCircle2,
//   Clock,
//   Camera,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { Separator } from '@/components/ui/separator';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { products } from '@/data/products';
// import { useAuth } from '@/context/AuthContext';

// const defaultUser = {
//   name: 'Arjun Sharma',
//   email: 'arjun.sharma@example.com',
//   phone: '+91 98765 43210',
//   avatar: '',
//   memberSince: 'January 2024',
//   spiritualLevel: 'Regular Practitioner',
// };

// const mockOrders = [
//   {
//     id: 'ORD-2024-001',
//     date: '2024-01-15',
//     status: 'delivered',
//     total: 4999,
//     items: [
//       { name: '5 Mukhi Rudraksha', quantity: 1, price: 2999, image: '' },
//       { name: 'Tiger Eye Bracelet', quantity: 1, price: 2000, image: '' },
//     ],
//   },
//   {
//     id: 'ORD-2024-002',
//     date: '2024-01-20',
//     status: 'shipped',
//     total: 8999,
//     items: [{ name: 'Sri Yantra Plate', quantity: 1, price: 8999, image: '' }],
//   },
//   {
//     id: 'ORD-2024-003',
//     date: '2024-01-25',
//     status: 'processing',
//     total: 3499,
//     items: [{ name: 'Rudraksha Mala', quantity: 1, price: 3499, image: '' }],
//   },
// ];

// const mockAddresses = [
//   {
//     id: '1',
//     type: 'Home',
//     name: 'Arjun Sharma',
//     address: '42, Spiritual Heights, Sector 15',
//     city: 'Gurugram',
//     state: 'Haryana',
//     pincode: '122001',
//     phone: '+91 98765 43210',
//     isDefault: true,
//   },
//   {
//     id: '2',
//     type: 'Office',
//     name: 'Arjun Sharma',
//     address: 'Tech Park, Tower B, 5th Floor',
//     city: 'Noida',
//     state: 'Uttar Pradesh',
//     pincode: '201301',
//     phone: '+91 98765 43210',
//     isDefault: false,
//   },
// ];

// const statusConfig = {
//   delivered: {
//     color: 'bg-green-500/10 text-green-600 border-green-500/20',
//     icon: CheckCircle2,
//     label: 'Delivered',
//   },
//   shipped: {
//     color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
//     icon: Truck,
//     label: 'Shipped',
//   },
//   processing: {
//     color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
//     icon: Clock,
//     label: 'Processing',
//   },
//   cancelled: {
//     color: 'bg-red-500/10 text-red-600 border-red-500/20',
//     icon: Trash2,
//     label: 'Cancelled',
//   },
// };

// const menuItems = [
//   { id: 'overview', label: 'Overview', icon: User },
//   { id: 'orders', label: 'My Orders', icon: Package },
//   { id: 'addresses', label: 'Addresses', icon: MapPin },
//   { id: 'wishlist', label: 'Wishlist', icon: Heart },
//   { id: 'settings', label: 'Settings', icon: Settings },
// ];

// export default function ProfilePage() {
//   const router = useRouter();
//   const { user: authUser, isAuthenticated, isLoading, signOut } = useAuth();
//   const [activeTab, setActiveTab] = useState('overview');
//   const [wishlistItems] = useState(products.slice(0, 4));

//   useEffect(() => {
//     if (isLoading) return;
//     if (!isAuthenticated) {
//       router.replace('/signin');
//       return;
//     }
//   }, [isLoading, isAuthenticated, router]);

//   const mockUser = authUser
//     ? {
//         name: displayUser.name || authUser?.name || defaultUser.name,
//         email: displayUser.email || authUser?.email || defaultUser.email,
//         phone: displayUser.phone || authUser?.phone || defaultUser.phone,
//         avatar: displayUser.avatar || authUser?.avatar || defaultUser.avatar,
//         memberSince: displayUser.memberSince || authUser?.memberSince || defaultUser.memberSince,
//         spiritualLevel: displayUser.spiritualLevel || authUser?.spiritualLevel || defaultUser.spiritualLevel,
//       }
//     : defaultUser;

//   const getStatusConfig = (status) =>
//     statusConfig[status] || statusConfig.processing;

//   if (isLoading || !isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-muted/30">
//         <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-muted/30">
//       <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-8 md:py-12">
//         <div className="container">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col md:flex-row items-center gap-6"
//           >
//             <div className="relative group">
//               <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-lg">
//                 <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
//                 <AvatarFallback className="bg-primary text-primary-foreground text-2xl md:text-3xl font-serif">
//                   {mockUser.name
//                     .split(' ')
//                     .map((n) => n[0])
//                     .join('')}
//                 </AvatarFallback>
//               </Avatar>
//               <button
//                 type="button"
//                 className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
//                 aria-label="Change photo"
//               >
//                 <Camera className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="text-center md:text-left flex-1">
//               <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1">
//                 {mockUser.name}
//               </h1>
//               <p className="text-muted-foreground mb-2">{mockUser.email}</p>
//               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
//                 <Badge variant="secondary" className="gap-1">
//                   <Star className="w-3 h-3" />
//                   {mockUser.spiritualLevel}
//                 </Badge>
//                 <Badge variant="outline" className="gap-1">
//                   <Calendar className="w-3 h-3" />
//                   Member since {mockUser.memberSince}
//                 </Badge>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <Button variant="outline" size="sm" asChild>
//                 <Link href="/track-order">
//                   <Truck className="w-4 h-4 mr-2" />
//                   Track Order
//                 </Link>
//               </Button>
//               <Button size="sm" asChild>
//                 <Link href="/">
//                   <ShoppingBag className="w-4 h-4 mr-2" />
//                   Continue Shopping
//                 </Link>
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-8 md:py-12">
//         <div className="container">
//           <div className="flex flex-col lg:flex-row gap-8">
//             <motion.aside
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="hidden lg:block w-64 flex-shrink-0"
//             >
//               <Card className="sticky top-24">
//                 <CardContent className="p-4">
//                   <nav className="space-y-1">
//                     {menuItems.map((item) => (
//                       <button
//                         key={item.id}
//                         type="button"
//                         onClick={() => setActiveTab(item.id)}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                           activeTab === item.id
//                             ? 'bg-primary text-primary-foreground'
//                             : 'hover:bg-muted text-muted-foreground hover:text-foreground'
//                         }`}
//                       >
//                         <item.icon className="w-5 h-5" />
//                         <span className="font-medium">{item.label}</span>
//                       </button>
//                     ))}
//                     <Separator className="my-2" />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         signOut();
//                         router.push('/signin');
//                       }}
//                       className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors"
//                     >
//                       <LogOut className="w-5 h-5" />
//                       <span className="font-medium">Logout</span>
//                     </button>
//                   </nav>
//                 </CardContent>
//               </Card>
//             </motion.aside>

//             <div className="lg:hidden">
//               <Tabs value={activeTab} onValueChange={setActiveTab}>
//                 <TabsList className="w-full grid grid-cols-5 mb-6">
//                   {menuItems.map((item) => (
//                     <TabsTrigger
//                       key={item.id}
//                       value={item.id}
//                       className="flex-col gap-1 py-2"
//                     >
//                       <item.icon className="w-4 h-4" />
//                       <span className="text-xs">{item.label.split(' ')[0]}</span>
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//               </Tabs>
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="flex-1 min-w-0"
//             >
//               {activeTab === 'overview' && (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {[
//                       {
//                         label: 'Total Orders',
//                         value: '12',
//                         icon: Package,
//                         color: 'text-blue-600',
//                       },
//                       {
//                         label: 'Wishlist Items',
//                         value: '4',
//                         icon: Heart,
//                         color: 'text-rose-600',
//                       },
//                       {
//                         label: 'Saved Addresses',
//                         value: '2',
//                         icon: MapPin,
//                         color: 'text-green-600',
//                       },
//                       {
//                         label: 'Reward Points',
//                         value: '850',
//                         icon: Star,
//                         color: 'text-amber-600',
//                       },
//                     ].map((stat) => (
//                       <Card key={stat.label}>
//                         <CardContent className="p-4 text-center">
//                           <stat.icon
//                             className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}
//                           />
//                           <p className="text-2xl font-bold">{stat.value}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {stat.label}
//                           </p>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>

//                   <Card>
//                     <CardHeader className="flex flex-row items-center justify-between">
//                       <div>
//                         <CardTitle>Recent Orders</CardTitle>
//                         <CardDescription>Your latest purchases</CardDescription>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         type="button"
//                         onClick={() => setActiveTab('orders')}
//                       >
//                         View All
//                         <ChevronRight className="w-4 h-4 ml-1" />
//                       </Button>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         {mockOrders.slice(0, 2).map((order) => {
//                           const status = getStatusConfig(order.status);
//                           const StatusIcon = status.icon;
//                           return (
//                             <div
//                               key={order.id}
//                               className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
//                             >
//                               <div className="w-16 h-16 bg-background rounded-lg flex items-center justify-center">
//                                 <Package className="w-8 h-8 text-muted-foreground" />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="font-medium">{order.id}</p>
//                                 <p className="text-sm text-muted-foreground">
//                                   {order.items.length} item
//                                   {order.items.length > 1 ? 's' : ''} • ₹
//                                   {order.total.toLocaleString()}
//                                 </p>
//                               </div>
//                               <Badge variant="outline" className={status.color}>
//                                 <StatusIcon className="w-3 h-3 mr-1" />
//                                 {status.label}
//                               </Badge>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader className="flex flex-row items-center justify-between">
//                       <div>
//                         <CardTitle>Your Wishlist</CardTitle>
//                         <CardDescription>
//                           Items you&apos;ve saved for later
//                         </CardDescription>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         type="button"
//                         onClick={() => setActiveTab('wishlist')}
//                       >
//                         View All
//                         <ChevronRight className="w-4 h-4 ml-1" />
//                       </Button>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {wishlistItems.slice(0, 4).map((product) => (
//                           <Link
//                             key={product.id}
//                             href={`/product/${product.slug}`}
//                             className="group"
//                           >
//                             <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2">
//                               <img
//                                 src={product.images[0]}
//                                 alt={product.name}
//                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                               />
//                             </div>
//                             <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
//                               {product.name}
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                               ₹{product.price.toLocaleString()}
//                             </p>
//                           </Link>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}

//               {activeTab === 'orders' && (
//                 <div className="space-y-6">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Order History</CardTitle>
//                       <CardDescription>
//                         Track and manage your orders
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-4">
//                         {mockOrders.map((order) => {
//                           const status = getStatusConfig(order.status);
//                           const StatusIcon = status.icon;
//                           return (
//                             <div
//                               key={order.id}
//                               className="border rounded-xl overflow-hidden"
//                             >
//                               <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/50">
//                                 <div className="flex items-center gap-4">
//                                   <div>
//                                     <p className="font-semibold">{order.id}</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       Placed on{' '}
//                                       {new Date(order.date).toLocaleDateString(
//                                         'en-IN',
//                                         {
//                                           day: 'numeric',
//                                           month: 'long',
//                                           year: 'numeric',
//                                         }
//                                       )}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center gap-3">
//                                   <Badge variant="outline" className={status.color}>
//                                     <StatusIcon className="w-3 h-3 mr-1" />
//                                     {status.label}
//                                   </Badge>
//                                   <p className="font-semibold">
//                                     ₹{order.total.toLocaleString()}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="p-4 space-y-3">
//                                 {order.items.map((item, idx) => (
//                                   <div
//                                     key={idx}
//                                     className="flex items-center gap-4"
//                                   >
//                                     <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
//                                       <Package className="w-8 h-8 text-muted-foreground" />
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <p className="font-medium">{item.name}</p>
//                                       <p className="text-sm text-muted-foreground">
//                                         Qty: {item.quantity}
//                                       </p>
//                                     </div>
//                                     <p className="font-medium">
//                                       ₹{item.price.toLocaleString()}
//                                     </p>
//                                   </div>
//                                 ))}
//                               </div>
//                               <div className="flex items-center justify-end gap-2 p-4 border-t bg-muted/30 flex-wrap">
//                                 <Button variant="outline" size="sm">
//                                   <Eye className="w-4 h-4 mr-2" />
//                                   View Details
//                                 </Button>
//                                 <Button variant="outline" size="sm">
//                                   <Download className="w-4 h-4 mr-2" />
//                                   Invoice
//                                 </Button>
//                                 {order.status === 'shipped' && (
//                                   <Button size="sm" asChild>
//                                     <Link href="/track-order">
//                                       <Truck className="w-4 h-4 mr-2" />
//                                       Track Order
//                                     </Link>
//                                   </Button>
//                                 )}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}

//               {activeTab === 'addresses' && (
//                 <div className="space-y-6">
//                   <Card>
//                     <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
//                       <div>
//                         <CardTitle>Saved Addresses</CardTitle>
//                         <CardDescription>
//                           Manage your delivery addresses
//                         </CardDescription>
//                       </div>
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button>
//                             <Plus className="w-4 h-4 mr-2" />
//                             Add Address
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                           <DialogHeader>
//                             <DialogTitle>Add New Address</DialogTitle>
//                           </DialogHeader>
//                           <div className="space-y-4 pt-4">
//                             <div className="grid grid-cols-2 gap-4">
//                               <div>
//                                 <Label>Full Name</Label>
//                                 <Input placeholder="Enter full name" />
//                               </div>
//                               <div>
//                                 <Label>Phone Number</Label>
//                                 <Input placeholder="+91" />
//                               </div>
//                             </div>
//                             <div>
//                               <Label>Address</Label>
//                               <Input placeholder="House no., Building, Street" />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                               <div>
//                                 <Label>City</Label>
//                                 <Input placeholder="City" />
//                               </div>
//                               <div>
//                                 <Label>State</Label>
//                                 <Input placeholder="State" />
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                               <div>
//                                 <Label>Pincode</Label>
//                                 <Input placeholder="6-digit pincode" />
//                               </div>
//                               <div>
//                                 <Label>Address Type</Label>
//                                 <Input placeholder="Home / Office / Other" />
//                               </div>
//                             </div>
//                             <Button className="w-full">Save Address</Button>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         {mockAddresses.map((address) => (
//                           <div
//                             key={address.id}
//                             className={`relative p-4 rounded-xl border-2 ${
//                               address.isDefault
//                                 ? 'border-primary bg-primary/5'
//                                 : 'border-border'
//                             }`}
//                           >
//                             {address.isDefault && (
//                               <Badge
//                                 className="absolute top-3 right-3"
//                                 variant="default"
//                               >
//                                 Default
//                               </Badge>
//                             )}
//                             <div className="flex items-center gap-2 mb-2">
//                               <MapPin className="w-4 h-4 text-primary" />
//                               <span className="font-semibold">{address.type}</span>
//                             </div>
//                             <p className="font-medium">{address.name}</p>
//                             <p className="text-sm text-muted-foreground mt-1">
//                               {address.address}
//                               <br />
//                               {address.city}, {address.state} - {address.pincode}
//                             </p>
//                             <p className="text-sm text-muted-foreground mt-1">
//                               {address.phone}
//                             </p>
//                             <div className="flex gap-2 mt-4 flex-wrap">
//                               <Button variant="outline" size="sm">
//                                 <Edit3 className="w-4 h-4 mr-1" />
//                                 Edit
//                               </Button>
//                               {!address.isDefault && (
//                                 <>
//                                   <Button variant="outline" size="sm">
//                                     Set Default
//                                   </Button>
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     className="text-destructive"
//                                   >
//                                     <Trash2 className="w-4 h-4" />
//                                   </Button>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}

//               {activeTab === 'wishlist' && (
//                 <div className="space-y-6">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Your Wishlist</CardTitle>
//                       <CardDescription>
//                         {wishlistItems.length} items saved for later
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {wishlistItems.map((product) => (
//                           <div
//                             key={product.id}
//                             className="group relative bg-muted/50 rounded-xl overflow-hidden"
//                           >
//                             <Link href={`/product/${product.slug}`}>
//                               <div className="aspect-square overflow-hidden">
//                                 <img
//                                   src={product.images[0]}
//                                   alt={product.name}
//                                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                 />
//                               </div>
//                             </Link>
//                             <button
//                               type="button"
//                               className="absolute top-3 right-3 w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
//                               aria-label="Remove from wishlist"
//                             >
//                               <Heart className="w-4 h-4 fill-current" />
//                             </button>
//                             <div className="p-4">
//                               <Link href={`/product/${product.slug}`}>
//                                 <h3 className="font-medium group-hover:text-primary transition-colors">
//                                   {product.name}
//                                 </h3>
//                               </Link>
//                               <p className="text-sm text-muted-foreground mb-3">
//                                 {product.category}
//                               </p>
//                               <div className="flex items-center justify-between gap-2 flex-wrap">
//                                 <div>
//                                   <span className="font-bold text-lg">
//                                     ₹{product.price.toLocaleString()}
//                                   </span>
//                                   {product.originalPrice && (
//                                     <span className="text-sm text-muted-foreground line-through ml-2">
//                                       ₹
//                                       {product.originalPrice.toLocaleString()}
//                                     </span>
//                                   )}
//                                 </div>
//                                 <Button size="sm" asChild>
//                                   <Link href={`/product/${product.slug}`}>
//                                     Add to Cart
//                                   </Link>
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}

//               {activeTab === 'settings' && (
//                 <div className="space-y-6">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Personal Information</CardTitle>
//                       <CardDescription>
//                         Update your personal details
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <Label>Full Name</Label>
//                           <Input defaultValue={mockUser.name} />
//                         </div>
//                         <div>
//                           <Label>Email Address</Label>
//                           <Input
//                             defaultValue={mockUser.email}
//                             type="email"
//                           />
//                         </div>
//                         <div>
//                           <Label>Phone Number</Label>
//                           <Input defaultValue={mockUser.phone} />
//                         </div>
//                         <div>
//                           <Label>Date of Birth</Label>
//                           <Input type="date" />
//                         </div>
//                       </div>
//                       <Button>Save Changes</Button>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Change Password</CardTitle>
//                       <CardDescription>
//                         Update your password regularly for security
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div>
//                         <Label>Current Password</Label>
//                         <Input
//                           type="password"
//                           placeholder="Enter current password"
//                         />
//                       </div>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <Label>New Password</Label>
//                           <Input
//                             type="password"
//                             placeholder="Enter new password"
//                           />
//                         </div>
//                         <div>
//                           <Label>Confirm New Password</Label>
//                           <Input
//                             type="password"
//                             placeholder="Confirm new password"
//                           />
//                         </div>
//                       </div>
//                       <Button>Update Password</Button>
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Notification Preferences</CardTitle>
//                       <CardDescription>
//                         Manage how you receive updates
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       {[
//                         {
//                           label: 'Order Updates',
//                           description: 'Get notified about your order status',
//                           defaultChecked: true,
//                         },
//                         {
//                           label: 'Promotions & Offers',
//                           description: 'Receive exclusive deals and discounts',
//                           defaultChecked: true,
//                         },
//                         {
//                           label: 'New Arrivals',
//                           description: 'Be the first to know about new products',
//                           defaultChecked: false,
//                         },
//                         {
//                           label: 'Spiritual Insights',
//                           description: 'Weekly spiritual wisdom and tips',
//                           defaultChecked: true,
//                         },
//                       ].map((item) => (
//                         <div
//                           key={item.label}
//                           className="flex items-center justify-between gap-4"
//                         >
//                           <div>
//                             <p className="font-medium">{item.label}</p>
//                             <p className="text-sm text-muted-foreground">
//                               {item.description}
//                             </p>
//                           </div>
//                           <Switch defaultChecked={item.defaultChecked} />
//                         </div>
//                       ))}
//                     </CardContent>
//                   </Card>

//                   <Card>
//                     <CardHeader className="flex flex-row items-center justify-between">
//                       <div>
//                         <CardTitle>Payment Methods</CardTitle>
//                         <CardDescription>
//                           Manage your saved payment options
//                         </CardDescription>
//                       </div>
//                       <Button variant="outline" size="sm">
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Card
//                       </Button>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg flex-wrap gap-4">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
//                             <CreditCard className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <p className="font-medium">•••• •••• •••• 4242</p>
//                             <p className="text-sm text-muted-foreground">
//                               Expires 12/25
//                             </p>
//                           </div>
//                         </div>
//                         <Badge>Default</Badge>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card className="border-destructive/20">
//                     <CardHeader>
//                       <CardTitle className="text-destructive">
//                         Danger Zone
//                       </CardTitle>
//                       <CardDescription>
//                         Irreversible actions for your account
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="flex items-center justify-between flex-wrap gap-4">
//                         <div>
//                           <p className="font-medium">Delete Account</p>
//                           <p className="text-sm text-muted-foreground">
//                             Permanently delete your account and all associated
//                             data
//                           </p>
//                         </div>
//                         <Button variant="destructive" size="sm">
//                           Delete Account
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  Menu,
  X,
  Phone,
  Mail,
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
import { toast } from 'sonner';
import { accountApi } from '@/services/accountApi';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

const defaultUser = { name: 'User', email: '', phone: '', avatar: '', memberSince: '', spiritualLevel: 'Regular Practitioner' };
const UPLOAD_BASE = process.env.NEXT_PUBLIC_SERVER_URL || (process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
  : 'http://localhost:5000');

function toImgUrl(path) {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  
  // Try to parse if it's a JSON array string
  try {
    const parsed = JSON.parse(path);
    if (Array.isArray(parsed) && parsed.length > 0) {
      path = parsed[0];
    }
  } catch (e) {}
  
  return path.startsWith('/') ? `${UPLOAD_BASE}${path}` : `${UPLOAD_BASE}/${path}`;
}

const _mockOrders = [
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
  {
    id: 'ORD-2024-004',
    date: '2024-02-01',
    status: 'cancelled',
    total: 1999,
    items: [{ name: 'Sage Incense Sticks', quantity: 2, price: 1999, image: '' }],
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
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Mobile Drawer Component
function MobileDrawer({ isOpen, onClose, user, activeTab, setActiveTab, signOut, router }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] sm:w-[320px] bg-background z-50 lg:hidden flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
              <Separator className="my-3" />
              <button
                type="button"
                onClick={() => {
                  signOut();
                  router.push('/signin');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user: authUser, isAuthenticated, isLoading, signOut } = useAuth();
  const { removeFromWishlist } = useWishlist();
  
  const tabParam = searchParams?.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'overview');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const [overview, setOverview] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({ name: '', phone: '', street: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false });
  const [addressSubmitting, setAddressSubmitting] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', dateOfBirth: '', spiritualLevel: '' });
  const [profileSubmitting, setProfileSubmitting] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleDownloadInvoice = (order) => {
    const itemsHtml = (order.items || []).map(i => `
      <tr>
        <td><strong>${i.productName || i.name || 'Product'}</strong></td>
        <td class="text-center">${i.quantity || 1}</td>
        <td class="text-right">₹${Number(i.price || 0).toLocaleString()}</td>
        <td class="text-right">₹${Number(i.total || (i.price * i.quantity)).toLocaleString()}</td>
      </tr>
    `).join('');

    const discountHtml = order.discount 
      ? `<div><span style="color: #666;">Discount:</span><span style="color: #16a34a;">-₹${Number(order.discount).toLocaleString()}</span></div>` 
      : '';

    const invoiceHtml = `
      <html>
        <head>
          <title>Invoice ${order.orderNumber || order.id || ''}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; }
            .title { font-size: 28px; font-weight: bold; }
            .info { margin-top: 30px; display: flex; justify-content: space-between; }
            table { width: 100%; border-collapse: collapse; margin-top: 40px; font-size: 14px; }
            th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
            th { text-transform: uppercase; font-size: 12px; color: #666; background-color: #fafafa; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .totals { width: 300px; margin-left: auto; margin-top: 30px; }
            .totals div { display: flex; justify-content: space-between; padding: 8px 0; }
            .total-row { font-weight: bold; font-size: 18px; border-top: 2px solid #333; margin-top: 10px; padding-top: 15px; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title" style="font-family: serif; color: #B45309;">Anushthanum</div>
              <div style="color: #666; margin-top: 5px;">Authentic Spiritual Products</div>
              <br/>
              <div style="font-size: 12px; color: #666;">
                123 Spiritual Lane, Varanasi, UP 221001<br/>
                contact@anushthanum.com<br/>
                +91 98765 43210
              </div>
            </div>
            <div class="text-right">
              <h2 style="margin: 0; color: #333; font-size: 32px; letter-spacing: 1px;">INVOICE</h2>
              <div style="margin-top: 10px; font-size: 14px; color: #666;">
                <strong>Invoice #:</strong> ${order.orderNumber || order.id || 'N/A'}<br/>
                <strong>Date:</strong> ${new Date(order.createdAt || order.date || Date.now()).toLocaleDateString()}<br/>
                <strong>Status:</strong> ${String(order.status || 'Paid').toUpperCase()}
              </div>
            </div>
          </div>
          <div class="info">
            <div>
              <strong style="font-size: 12px; text-transform: uppercase; color: #666;">Bill To:</strong><br/>
              <div style="margin-top: 8px; font-size: 14px;">
                <strong>${order.customerName || authUser?.name || 'Customer'}</strong><br/>
                ${order.customerEmail || authUser?.email || ''}<br/>
                ${order.shippingAddress?.street || order.shippingAddress?.address || ''}<br/>
                ${order.shippingAddress?.city ? order.shippingAddress.city + ', ' : ''}${order.shippingAddress?.state || ''} ${order.shippingAddress?.pincode || ''}
              </div>
            </div>
            <div class="text-right" style="font-size: 14px;">
               <strong style="font-size: 12px; text-transform: uppercase; color: #666;">Payment Info:</strong><br/>
               <div style="margin-top: 8px;">
                 <strong>Method:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}<br/>
                 <strong>Status:</strong> ${order.paymentStatus || 'Completed'}
               </div>
            </div>
          </div>
          <table>
            <thead>
              <tr><th>Item Description</th><th class="text-center">Qty</th><th class="text-right">Unit Price</th><th class="text-right">Total</th></tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div class="totals">
            <div><span style="color: #666;">Subtotal:</span><span>₹${Number(order.subtotal || order.total).toLocaleString()}</span></div>
            <div><span style="color: #666;">Shipping:</span><span>₹${Number(order.shippingCost || 0).toLocaleString()}</span></div>
            ${discountHtml}
            <div class="total-row"><span>Total:</span><span>₹${Number(order.total || 0).toLocaleString()}</span></div>
          </div>
          <div style="margin-top: 60px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
            Thank you for shopping with Anushthanum! For any queries, please contact our support.
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank', 'width=800,height=800');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(invoiceHtml);
      printWindow.document.close();
    } else {
      toast.error('Please allow popups to download invoice');
    }
  };

  const fetchOverview = async () => {
    try {
      const res = await accountApi.getOverview();
      setOverview(res);
      setWishlist(res?.wishlist ?? []);
    } catch (e) { toast.error(e?.message || 'Failed to load overview'); }
  };
  const fetchOrders = async () => {
    try { const res = await accountApi.getOrders({ limit: 50 }); setOrders(res?.orders ?? []); }
    catch (e) { toast.error(e?.message || 'Failed to load orders'); }
  };
  const fetchAddresses = async () => {
    try { const res = await accountApi.getAddresses(); setAddresses(res?.addresses ?? []); }
    catch (e) { toast.error(e?.message || 'Failed to load addresses'); }
  };
  const fetchWishlist = async () => {
    try { const res = await accountApi.getWishlist(); setWishlist(res?.wishlist ?? []); }
    catch (e) { toast.error(e?.message || 'Failed to load wishlist'); }
  };

  const resetAddressForm = () => {
    setAddressForm({ name: '', phone: '', street: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false });
    setEditAddress(null);
    setAddAddressOpen(false);
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    setAddressSubmitting(true);
    try {
      await accountApi.createAddress(addressForm);
      toast.success('Address added');
      resetAddressForm();
      await fetchAddresses();
      await fetchOverview();
    } catch (e) { toast.error(e?.message || 'Failed to add address'); }
    finally { setAddressSubmitting(false); }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    if (!editAddress) return;
    setAddressSubmitting(true);
    try {
      await accountApi.updateAddress(editAddress.id, addressForm);
      toast.success('Address updated');
      resetAddressForm();
      await fetchAddresses();
      await fetchOverview();
    } catch (e) { toast.error(e?.message || 'Failed to update address'); }
    finally { setAddressSubmitting(false); }
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm('Remove this address?')) return;
    try {
      await accountApi.deleteAddress(id);
      toast.success('Address removed');
      await fetchAddresses();
      await fetchOverview();
    } catch (e) { toast.error(e?.message || 'Failed to remove address'); }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await accountApi.updateAddress(id, { isDefault: true });
      toast.success('Default address updated');
      await fetchAddresses();
      await fetchOverview();
    } catch (e) { toast.error(e?.message || 'Failed to set default'); }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSubmitting(true);
    try {
      await accountApi.updateProfile(profileForm);
      toast.success('Profile updated');
      await fetchOverview();
    } catch (e) { toast.error(e?.message || 'Failed to update profile'); }
    finally { setProfileSubmitting(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setPasswordSubmitting(true);
    try {
      await accountApi.changePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
      toast.success('Password updated');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (e) { toast.error(e?.message || 'Failed to change password'); }
    finally { setPasswordSubmitting(false); }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure? This will deactivate your account and you will need to contact support to restore it.')) return;
    setDeleteSubmitting(true);
    try {
      await accountApi.deleteAccount();
      toast.success('Account deactivated');
      signOut();
      router.push('/');
    } catch (e) { toast.error(e?.message || 'Failed to delete account'); }
    finally { setDeleteSubmitting(false); }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'addresses') fetchAddresses();
    if (activeTab === 'wishlist') fetchWishlist();
    if (activeTab === 'settings') {
      const u = overview?.user ?? authUser ?? {};
      setProfileForm({
        name: u.name ?? '',
        phone: u.phone ?? '',
        dateOfBirth: u.dateOfBirth ? (typeof u.dateOfBirth === 'string' ? u.dateOfBirth.slice(0, 10) : '') : '',
        spiritualLevel: u.spiritualLevel ?? '',
      });
    }
  }, [activeTab, isAuthenticated, overview?.user, authUser]);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle authentication and loading
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      router.replace('/signin');
      return;
    }
    
    // Simulate initial loading for better UX
    (async () => {
      setIsLoadingPage(true);
      await fetchOverview();
      setIsLoadingPage(false);
    })();
  }, [isLoading, isAuthenticated, router]);

  const displayUser = overview?.user ?? authUser ?? {};
  const mockUser = (displayUser.name || displayUser.email || authUser) ? {
        name: displayUser.name || authUser?.name || defaultUser.name,
        email: displayUser.email || authUser?.email || defaultUser.email,
        phone: displayUser.phone || authUser?.phone || defaultUser.phone,
        avatar: displayUser.avatar || authUser?.avatar || defaultUser.avatar,
        memberSince: displayUser.memberSince || authUser?.memberSince || defaultUser.memberSince,
        spiritualLevel: displayUser.spiritualLevel || authUser?.spiritualLevel || defaultUser.spiritualLevel,
      }
    : defaultUser;
  const recentOrders = overview?.recentOrders ?? [];
  const displayOrders = activeTab === 'orders' ? orders : recentOrders;

  const getStatusConfig = (status) =>
    statusConfig[status] || statusConfig.processing;

  // Loading state
  if (isLoading || isLoadingPage || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 pb-8 sm:pb-12">
      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={mockUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        signOut={signOut}
        router={router}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="container px-3 sm:px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden h-10 w-10 flex-shrink-0"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Avatar */}
              <div className="relative group flex-shrink-0">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-3 sm:border-4 border-background shadow-lg">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg sm:text-xl md:text-2xl font-serif">
                    {mockUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-9 sm:h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg border-2 border-background hover:bg-primary/90 transition-colors"
                  aria-label="Change profile photo"
                >
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Mobile User Info */}
              <div className="flex-1 min-w-0 md:hidden">
                <h1 className="text-lg sm:text-xl font-serif font-bold truncate">
                  {mockUser.name}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {mockUser.email}
                </p>
                <div className="flex items-center gap-1 mt-1 flex-wrap">
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    <Star className="w-2 h-2 mr-1" />
                    {mockUser.spiritualLevel}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Desktop User Info */}
            <div className="hidden md:block flex-1">
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1">
                {mockUser.name}
              </h1>
              <p className="text-muted-foreground mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {mockUser.email}
              </p>
              <div className="flex flex-wrap items-center gap-3">
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

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="flex-1 sm:flex-none min-w-[100px]"
                asChild
              >
                <Link href="/track-order">
                  <Truck className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline">Track Order</span>
                  <span className="xs:hidden">Track</span>
                </Link>
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                className="flex-1 sm:flex-none min-w-[100px]"
                asChild
              >
                <Link href="/">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline">Continue Shopping</span>
                  <span className="xs:hidden">Shop</span>
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Mobile Contact Info */}
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{mockUser.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Since {mockUser.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 sm:py-6 md:py-8">
        <div className="container px-3 sm:px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
            {/* Desktop Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <Card className="sticky top-6">
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

            {/* Mobile Tabs Navigation */}
            <div className="lg:hidden -mx-3 sm:-mx-4">
              <div className="px-3 sm:px-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-5 h-auto p-1 bg-muted/50">
                    {menuItems.map((item) => (
                      <TabsTrigger
                        key={item.id}
                        value={item.id}
                        className="flex-col gap-1 py-2 px-1 min-w-0"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-xs truncate">{item.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    {[
                      { label: 'Total Orders', value: String(overview?.totalOrders ?? 0), icon: Package, color: 'text-blue-600', bg: 'bg-blue-500/10' },
                      { label: 'Wishlist', value: String(overview?.totalWishlist ?? wishlist.length ?? 0), icon: Heart, color: 'text-rose-600', bg: 'bg-rose-500/10' },
                      { label: 'Addresses', value: String(overview?.totalAddresses ?? addresses.length ?? 0), icon: MapPin, color: 'text-green-600', bg: 'bg-green-500/10' },
                      { label: 'Points', value: String(overview?.user?.rewardPoints ?? 0), icon: Star, color: 'text-amber-600', bg: 'bg-amber-500/10' },
                    ].map((stat) => (
                      <Card key={stat.label} className={`${stat.bg} border-0`}>
                        <CardContent className="p-3 sm:p-4 text-center">
                          <div className={`${stat.color} mb-2`}>
                            <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 mx-auto" />
                          </div>
                          <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {stat.label}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6 py-4">
                      <div>
                        <CardTitle className="text-base sm:text-lg">
                          Recent Orders
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Your latest purchases
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs sm:text-sm"
                        type="button"
                        onClick={() => setActiveTab('orders')}
                      >
                        View All
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="space-y-3">
                        {recentOrders.slice(0, 2).map((order) => {
                          const status = getStatusConfig(order.status);
                          const StatusIcon = status.icon;
                          const itemCount = order.itemCount ?? order.items?.length ?? 0;
                          return (
                            <div
                              key={order.id}
                              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg"
                            >
                              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm sm:text-base truncate">
                                  {order.orderNumber}
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  {itemCount} item{itemCount !== 1 ? 's' : ''} • ₹{Number(order.total || 0).toLocaleString()}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={`${status.color} text-xs px-2 py-0.5 sm:px-3 sm:py-1`}
                              >
                                <StatusIcon className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                                <span className="hidden sm:inline">{status.label}</span>
                                <span className="sm:hidden">{status.label.slice(0, 3)}</span>
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wishlist Preview */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6 py-4">
                      <div>
                        <CardTitle className="text-base sm:text-lg">
                          Your Wishlist
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Items saved for later
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs sm:text-sm"
                        type="button"
                        onClick={() => setActiveTab('wishlist')}
                      >
                        View All
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </Button>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(wishlist ?? []).slice(0, 4).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group"
                          >
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                              <img
                                src={toImgUrl(product.image)}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                            <p className="text-xs sm:text-sm font-medium truncate group-hover:text-primary transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ₹{Number(product.price || product.discountPrice || 0).toLocaleString()}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <CardTitle className="text-base sm:text-lg">
                        Order History
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Track and manage your orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="space-y-4">
                        {(displayOrders ?? []).map((order) => {
                          const status = getStatusConfig(order.status);
                          const StatusIcon = status.icon;
                          const orderId = order.orderNumber || order.id;
                          const orderDate = order.createdAt || order.date;
                          const orderItems = order.items ?? [];
                          return (
                            <div
                              key={order.id || orderId}
                              className="border rounded-xl overflow-hidden"
                            >
                              <div className="p-4 bg-muted/50">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div>
                                    <p className="font-semibold text-sm sm:text-base">
                                      {orderId}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                      {orderDate ? new Date(orderDate).toLocaleDateString(
                                        'en-IN',
                                        {
                                          day: 'numeric',
                                          month: 'short',
                                          year: 'numeric',
                                        }
                                      ) : ''}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Badge
                                      variant="outline"
                                      className={`${status.color} text-xs px-2 py-0.5 sm:px-3 sm:py-1`}
                                    >
                                      <StatusIcon className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                                      <span className="hidden sm:inline">{status.label}</span>
                                      <span className="sm:hidden">{status.label.slice(0, 3)}</span>
                                    </Badge>
                                    <p className="font-semibold text-sm sm:text-base whitespace-nowrap">
                                      ₹{(order.total ?? 0).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4">
                                {orderItems.map((item, idx) => (
                                  <div
                                    key={item.id ?? idx}
                                    className="flex items-center gap-3 py-2"
                                  >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-muted rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                                      {item.productImage ? (
                                        <img src={toImgUrl(item.productImage)} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm sm:text-base truncate">
                                        {item.productName ?? item.name}
                                      </p>
                                      <p className="text-xs sm:text-sm text-muted-foreground">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                    <p className="font-medium text-sm sm:text-base whitespace-nowrap">
                                      ₹{(item.price ?? item.total ?? 0).toLocaleString()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="p-4 border-t bg-muted/30 flex flex-wrap gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-8"
                                  onClick={() => setSelectedOrderDetails(order)}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">Details</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-8"
                                  onClick={() => handleDownloadInvoice(order)}
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">Invoice</span>
                                </Button>
                                {order.status === 'shipped' && (
                                  <Button
                                    size="sm"
                                    className="text-xs h-8"
                                    asChild
                                  >
                                    <Link href="/track-order">
                                      <Truck className="w-3 h-3 mr-1" />
                                      <span className="hidden sm:inline">Track</span>
                                      <span className="sm:hidden">Track</span>
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

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-base sm:text-lg">
                            Saved Addresses
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm">
                            Manage your delivery addresses
                          </CardDescription>
                        </div>
                        <Dialog open={addAddressOpen || !!editAddress} onOpenChange={(o) => { if (!o) resetAddressForm(); else { setEditAddress(null); setAddressForm({ name: '', phone: '', street: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false }); setAddAddressOpen(true); } }}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="w-full sm:w-auto text-xs sm:text-sm"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              Add Address
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-lg sm:text-xl">
                                {editAddress ? 'Edit Address' : 'Add New Address'}
                              </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={editAddress ? handleUpdateAddress : handleCreateAddress} className="space-y-4 pt-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs sm:text-sm">Full Name</Label>
                                  <Input
                                    required
                                    placeholder="Enter full name"
                                    value={addressForm.name}
                                    onChange={(e) => setAddressForm((f) => ({ ...f, name: e.target.value }))}
                                    className="text-sm h-9 sm:h-10"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs sm:text-sm">Phone</Label>
                                  <Input
                                    placeholder="+91"
                                    value={addressForm.phone}
                                    onChange={(e) => setAddressForm((f) => ({ ...f, phone: e.target.value }))}
                                    className="text-sm h-9 sm:h-10"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-xs sm:text-sm">Address</Label>
                                <Input
                                  required
                                  placeholder="House no., Building, Street"
                                  value={addressForm.street}
                                  onChange={(e) => setAddressForm((f) => ({ ...f, street: e.target.value }))}
                                  className="text-sm h-9 sm:h-10"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs sm:text-sm">City</Label>
                                  <Input
                                    required
                                    placeholder="City"
                                    value={addressForm.city}
                                    onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}
                                    className="text-sm h-9 sm:h-10"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs sm:text-sm">State</Label>
                                  <Input
                                    required
                                    placeholder="State"
                                    value={addressForm.state}
                                    onChange={(e) => setAddressForm((f) => ({ ...f, state: e.target.value }))}
                                    className="text-sm h-9 sm:h-10"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs sm:text-sm">Pincode</Label>
                                  <Input
                                    required
                                    placeholder="6-digit pincode"
                                    value={addressForm.pincode}
                                    onChange={(e) => setAddressForm((f) => ({ ...f, pincode: e.target.value }))}
                                    className="text-sm h-9 sm:h-10"
                                  />
                                </div>
                                {/* <div>
                                  <Label className="text-xs sm:text-sm">Address Type</Label>
                                  <Input
                                    placeholder="Home / Office"
                                    value={addressForm.type}
                                    onChange={(e) => setAddressForm((f) => ({ ...f, type: e.target.value }))}
                                    className="text-sm h-9 sm:h-10"
                                  />
                                </div> */}
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="addr-default" checked={addressForm.isDefault} onChange={(e) => setAddressForm((f) => ({ ...f, isDefault: e.target.checked }))} className="rounded" />
                                <Label htmlFor="addr-default" className="text-xs sm:text-sm cursor-pointer">Set as default</Label>
                              </div>
                              <Button type="submit" className="w-full h-9 sm:h-10" disabled={addressSubmitting}>
                                {addressSubmitting ? 'Saving...' : (editAddress ? 'Update' : 'Save')} Address
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {(addresses ?? []).map((address) => (
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
                                className="absolute top-2 right-2 text-xs px-2 py-0.5"
                                variant="default"
                              >
                                Default
                              </Badge>
                            )}
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-semibold text-sm sm:text-base">
                                {address.type}
                              </span>
                            </div>
                            <p className="font-medium text-sm sm:text-base">
                              {address.name}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {address.street ?? address.address}
                              <br />
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {address.phone}
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => {
                                  setEditAddress(address);
                                  setAddressForm({ name: address.name, phone: address.phone ?? '', street: address.street ?? '', city: address.city, state: address.state, pincode: address.pincode, type: address.type ?? 'Home', isDefault: !!address.isDefault });
                                }}
                              >
                                <Edit3 className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              {!address.isDefault && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-8"
                                    onClick={() => handleSetDefaultAddress(address.id)}
                                  >
                                    Set Default
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive text-xs h-8"
                                    onClick={() => handleDeleteAddress(address.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
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

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="space-y-4 sm:space-y-6">
                  <Card>
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <CardTitle className="text-base sm:text-lg">
                        Your Wishlist
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {(wishlist ?? []).length} items saved for later
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {(wishlist ?? []).map((product) => (
                          <div
                            key={product.id ?? product.productId}
                            className="group relative bg-background border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                          >
                            <Link href={product.slug ? `/product/${product.slug}` : '#'}>
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={toImgUrl(product.image)}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                            </Link>
                            <button
                              type="button"
                              className="absolute top-2 right-2 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              aria-label="Remove from wishlist"
                              onClick={async () => {
                                const pid = product.productId ?? product.id;
                                if (!pid) return;
                                try {
                                  await removeFromWishlist(pid);
                                  await fetchWishlist();
                                  await fetchOverview();
                                } catch (e) { toast.error(e?.message || 'Failed to remove'); }
                              }}
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                            <div className="p-3">
                              <Link href={`/product/${product.slug}`}>
                                <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate mb-1">
                                  {product.name}
                                </h3>
                              </Link>
                              <p className="text-xs text-muted-foreground truncate mb-2">
                                {product.category}
                              </p>
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-bold text-base">
                                    ₹{(product.discountPrice ?? product.price ?? 0).toLocaleString()}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-xs text-muted-foreground line-through ml-1">
                                      ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  className="text-xs h-8"
                                  asChild
                                >
                                  <Link href={product.slug ? `/product/${product.slug}` : '#'}>
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

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <CardTitle className="text-base sm:text-lg">
                        Personal Information
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Update your personal details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                      <form onSubmit={handleUpdateProfile}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs sm:text-sm">Full Name</Label>
                            <Input
                              value={profileForm.name}
                              onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
                              className="text-sm h-9 sm:h-10"
                            />
                          </div>
                          <div>
                            <Label className="text-xs sm:text-sm">Email Address</Label>
                            <Input
                              value={mockUser.email}
                              type="email"
                              className="text-sm h-9 sm:h-10"
                              disabled
                              title="Email cannot be changed"
                            />
                          </div>
                          <div>
                            <Label className="text-xs sm:text-sm">Phone Number</Label>
                            <Input
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
                              className="text-sm h-9 sm:h-10"
                            />
                          </div>
                          <div>
                            <Label className="text-xs sm:text-sm">Date of Birth</Label>
                            <Input
                              type="date"
                              value={profileForm.dateOfBirth}
                              onChange={(e) => setProfileForm((f) => ({ ...f, dateOfBirth: e.target.value }))}
                              className="text-sm h-9 sm:h-10"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs sm:text-sm">Spiritual Level</Label>
                            <Input
                              value={profileForm.spiritualLevel}
                              onChange={(e) => setProfileForm((f) => ({ ...f, spiritualLevel: e.target.value }))}
                              placeholder="e.g. Regular Practitioner"
                              className="text-sm h-9 sm:h-10"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="mt-4 h-9 sm:h-10" disabled={profileSubmitting}>
                          {profileSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Change Password */}
                  <Card>
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <CardTitle className="text-base sm:text-lg">
                        Change Password
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Update your password regularly for security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                      <form onSubmit={handleChangePassword}>
                        <div>
                          <Label className="text-xs sm:text-sm">Current Password</Label>
                          <Input
                            type="password"
                            required
                            placeholder="Enter current password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))}
                            className="text-sm h-9 sm:h-10"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs sm:text-sm">New Password</Label>
                            <Input
                              type="password"
                              required
                              minLength={8}
                              placeholder="Enter new password (min 8 chars)"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
                              className="text-sm h-9 sm:h-10"
                            />
                          </div>
                          <div>
                            <Label className="text-xs sm:text-sm">
                              Confirm New Password
                            </Label>
                            <Input
                              type="password"
                              required
                              placeholder="Confirm new password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                              className="text-sm h-9 sm:h-10"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="h-9 sm:h-10" disabled={passwordSubmitting}>
                          {passwordSubmitting ? 'Updating...' : 'Update Password'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Notification Preferences */}
                  <Card>
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <CardTitle className="text-base sm:text-lg">
                        Notification Preferences
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Manage how you receive updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
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
                          description: 'Be first to know about new products',
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
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm sm:text-base">
                              {item.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          <Switch defaultChecked={item.defaultChecked} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Payment Methods */}
                  <Card>
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-base sm:text-lg">
                            Payment Methods
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm">
                            Manage your saved payment options
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm h-8 sm:h-9"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Add Card
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm sm:text-base">
                              •••• •••• •••• 4242
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <Badge className="text-xs">Default</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="border-destructive/20">
                    <CardHeader className="px-4 sm:px-6 py-4">
                      <CardTitle className="text-base sm:text-lg text-destructive">
                        Danger Zone
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Irreversible actions for your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm sm:text-base">
                            Delete Account
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
                          onClick={handleDeleteAccount}
                          disabled={deleteSubmitting}
                        >
                          {deleteSubmitting ? 'Deactivating...' : 'Delete Account'}
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

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrderDetails} onOpenChange={(open) => !open && setSelectedOrderDetails(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedOrderDetails && (() => {
            const order = selectedOrderDetails;
            const statusConf = getStatusConfig(order.status);
            return (
              <>
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="flex justify-between items-center text-xl">
                    <span>Order Details</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">
                  {/* Order Header Info */}
                  <div className="flex flex-wrap items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                      <p className="font-semibold text-base">{order.orderNumber || order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date Placed</p>
                      <p className="font-semibold text-base">{new Date(order.createdAt || order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge variant={statusConf.variant} className="mt-1 flex items-center gap-1">
                        <statusConf.icon className="w-3 h-3" />
                        {statusConf.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Items Ordered</h3>
                    <div className="space-y-3">
                      {(order.items || []).map((item, idx) => (
                        <div key={idx} className="flex gap-4 p-3 border rounded-lg items-center">
                          <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                            {item.productImage || item.image || item.thumbnail ? (
                              <img src={toImgUrl(item.productImage || item.image || item.thumbnail)} alt={item.productName || item.name} className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{item.productName || item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{(item.total || (item.price * item.quantity)).toLocaleString()}</p>
                            {item.quantity > 1 && <p className="text-xs text-muted-foreground">₹{item.price?.toLocaleString()} each</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two-column layout for Shipping and Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Shipping Address</h3>
                      <div className="p-3 border rounded-lg bg-muted/10 text-sm h-full">
                        <p className="font-medium">{order.shippingAddress?.name || authUser?.name}</p>
                        <p className="text-muted-foreground mt-1">
                          {order.shippingAddress?.address || order.shippingAddress?.street}<br/>
                          {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">{order.shippingAddress?.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment Details</h3>
                      <div className="p-3 border rounded-lg bg-muted/10 text-sm h-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-muted-foreground">Method:</span>
                          <span className="font-medium uppercase">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium capitalize">{order.paymentStatus || 'Completed'}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="space-y-1">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>₹{Number(order.subtotal || order.total).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span>{Number(order.shippingCost || 0) === 0 ? 'FREE' : '₹' + Number(order.shippingCost || 0).toLocaleString()}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span>-₹{Number(order.discount).toLocaleString()}</span>
                            </div>
                          )}
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold text-base">
                            <span>Total</span>
                            <span>₹{Number(order.total || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="outline" onClick={() => setSelectedOrderDetails(null)}>Close</Button>
                  <Button onClick={() => handleDownloadInvoice(order)}><Download className="w-4 h-4 mr-2"/> Download Invoice</Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </main>
  );
}
