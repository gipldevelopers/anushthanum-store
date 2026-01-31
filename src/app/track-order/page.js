'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Package,
  ChevronRight,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim().toLowerCase().includes('anu')) {
      setOrderStatus('found');
    } else {
      setOrderStatus('not-found');
    }
  };

  const mockOrder = {
    id: 'ANU-2024-001234',
    date: 'January 25, 2024',
    status: 'In Transit',
    expectedDelivery: 'January 30, 2024',
    items: [
      { name: '5 Mukhi Rudraksha', quantity: 1, price: 1499 },
      { name: 'Tiger Eye Bracelet', quantity: 2, price: 2598 },
    ],
    total: 4097,
    timeline: [
      { status: 'Order Placed', date: 'Jan 25, 2024 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: 'Jan 25, 2024 10:32 AM', completed: true },
      { status: 'Puja & Energization', date: 'Jan 26, 2024 6:00 AM', completed: true },
      { status: 'Shipped', date: 'Jan 27, 2024 2:00 PM', completed: true },
      { status: 'In Transit', date: 'Jan 28, 2024', completed: true, current: true },
      { status: 'Out for Delivery', date: 'Expected Jan 30', completed: false },
      { status: 'Delivered', date: 'Expected Jan 30', completed: false },
    ],
  };

  return (
    <main className="py-12">
      <div className="container max-w-4xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Track Order</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order ID to see the current status of your shipment
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleTrack}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter Order ID (e.g., ANU-2024-001234)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
          <Button type="submit" size="lg" className="px-8 shrink-0">
            Track Order
          </Button>
        </motion.form>

        {orderStatus === 'found' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Order #{mockOrder.id}</h2>
                  <p className="text-sm text-muted-foreground">Placed on {mockOrder.date}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
                  <Truck className="w-4 h-4" />
                  <span className="font-medium">{mockOrder.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  Expected Delivery:{' '}
                  <strong className="text-foreground">{mockOrder.expectedDelivery}</strong>
                </span>
              </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-6">Order Timeline</h3>
              <div className="space-y-4">
                {mockOrder.timeline.map((step, index) => (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? step.current
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-accent text-accent-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      {index < mockOrder.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${step.completed ? 'bg-accent' : 'bg-muted'}`}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <h4 className={`font-medium ${step.current ? 'text-primary' : ''}`}>
                        {step.status}
                      </h4>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {mockOrder.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">₹{mockOrder.total}</span>
              </div>
            </div>
          </motion.div>
        )}

        {orderStatus === 'not-found' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-destructive/10 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-destructive mb-2">Order Not Found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn&apos;t find an order with that ID. Please check and try again.
            </p>
            <Button variant="outline" type="button" onClick={() => setOrderStatus(null)}>
              Try Again
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
