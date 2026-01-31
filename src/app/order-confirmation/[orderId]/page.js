'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  Clock,
  Download,
  Share2,
  Home,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId || 'ORD-XXXXXX';

  const orderData = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    total: 4999,
    paymentMethod: 'Cash on Delivery',
    address: {
      name: 'Rahul Sharma',
      address: '123, Spiritual Heights, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
    },
    items: [
      { name: '5 Mukhi Rudraksha', quantity: 1, price: 1499 },
      { name: 'Tiger Eye Bracelet', quantity: 1, price: 1299 },
    ],
  };

  const timelineSteps = [
    { icon: CheckCircle2, title: 'Order Confirmed', description: 'We have received your order', time: 'Just now', completed: true },
    { icon: Package, title: 'Processing', description: 'Your order is being prepared with sacred rituals', time: 'Within 24 hours', completed: false },
    { icon: Truck, title: 'Shipped', description: 'Your order is on its way', time: 'In 2-3 days', completed: false },
    { icon: MapPin, title: 'Delivered', description: 'Package delivered to your address', time: orderData.estimatedDelivery, completed: false },
  ];

  const formatPrice = (n) => `₹${Number(n).toLocaleString()}`;

  return (
    <main className="min-h-screen bg-muted/30 relative">
      <div className="container py-8 md:py-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground text-lg">Thank you for your order. May divine blessings be with you! 🙏</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-mono font-bold text-lg">{orderData.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Order Date</p>
                        <p className="text-sm font-medium">{orderData.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Delivery</p>
                        <p className="text-sm font-medium">{orderData.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Total Amount</p>
                        <p className="text-sm font-medium">{formatPrice(orderData.total)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-6">Order Status</h2>
                  <div className="space-y-6">
                    {timelineSteps.map((step, index) => (
                      <div key={step.title} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                            <step.icon className="w-5 h-5" />
                          </div>
                          {index < timelineSteps.length - 1 && <div className="w-px flex-1 bg-border min-h-[24px]" />}
                        </div>
                        <div className="pb-6 flex-1">
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-lg mb-4">Delivery Address</h2>
                  <div className="text-sm text-muted-foreground space-y-1 mb-6">
                    <p className="font-medium text-foreground">{orderData.address.name}</p>
                    <p>{orderData.address.address}</p>
                    <p>{orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}</p>
                    <p>{orderData.address.phone}</p>
                  </div>
                  <Separator className="my-4" />
                  <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                  <div className="space-y-2 text-sm">
                    {orderData.items.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(orderData.total)}</span>
                  </div>
                  <Badge variant="secondary" className="mt-2 block w-fit">{orderData.paymentMethod}</Badge>
                  <div className="mt-6 flex flex-col gap-2">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/">
                        <Home className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <Link href="/track-order">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Track Order
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
