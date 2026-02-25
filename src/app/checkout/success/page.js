'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkoutApi } from '@/services/checkoutApi';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }
    checkoutApi
      .getOrder(orderNumber)
      .then((res) => setOrder(res?.order ?? null))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  if (loading) {
    return (
      <main className="min-h-screen bg-muted/30 py-12">
        <div className="container max-w-2xl">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-6" />
            <p className="text-muted-foreground">Loading your order...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!orderNumber) {
    return (
      <main className="min-h-screen bg-muted/30 py-12">
        <div className="container max-w-2xl">
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <p className="text-muted-foreground mb-6">No order found. Please check your link or start a new order.</p>
              <Button asChild>
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. {order?.paymentStatus === 'cod' ? 'Pay when your order arrives.' : 'Your payment has been received.'}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="w-5 h-5" />
              Order {orderNumber}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="capitalize font-medium">{order.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold">₹{Number(order.total || 0).toLocaleString()}</span>
                </div>
                {order.items?.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Items ({order.items.length})</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span>{item.productName} × {item.quantity}</span>
                          <span>₹{Number(item.total || 0).toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            {!order && (
              <p className="text-sm text-muted-foreground">Order details will be available shortly.</p>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/profile">
              <User className="w-4 h-4 mr-2" />
              View My Orders
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-muted/30 py-12">
          <div className="container max-w-2xl">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-6" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
