'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, RefreshCw, Home, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function FailureContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <main className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Payment Failed</h1>
          <p className="text-muted-foreground">
            Your payment could not be completed. This could be due to cancellation, insufficient funds, or a technical issue.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6 pb-6">
            <h2 className="font-semibold mb-4">What you can do:</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Check your payment method and try again</li>
              <li>• Use a different payment option (UPI, card, or netbanking)</li>
              <li>• Choose Cash on Delivery if available</li>
              <li>• Contact support if the amount was debited but order shows failed</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/checkout">
              <CreditCard className="w-4 h-4 mr-2" />
              Try Again
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {orderNumber && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            Order reference: <strong>{orderNumber}</strong>
          </p>
        )}
      </div>
    </main>
  );
}

export default function CheckoutFailurePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-muted/30 py-12">
          <div className="container max-w-xl">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-6" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <FailureContent />
    </Suspense>
  );
}
