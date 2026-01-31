'use client';

import { Truck, Clock, MapPin, Check } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DeliveryEstimate({ inStock }) {
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const checkDelivery = () => {
    setError('');
    if (!/^\d{6}$/.test(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }
    setIsChecking(true);
    setTimeout(() => {
      const today = new Date();
      const deliveryDays = Math.floor(Math.random() * 3) + 3;
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + deliveryDays);
      setDeliveryInfo({
        estimatedDate: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }),
        codAvailable: parseInt(pincode.charAt(0), 10) <= 5,
        freeDelivery: true,
      });
      setIsChecking(false);
    }, 500);
  };

  if (!inStock) {
    return (
      <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
        <div className="flex items-center gap-3 text-destructive">
          <Clock className="w-5 h-5" />
          <div>
            <p className="font-medium">Currently Out of Stock</p>
            <p className="text-sm text-destructive/80">Enter your email to be notified when available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Check Delivery</span>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
              setDeliveryInfo(null);
            }}
            className="flex-1"
            maxLength={6}
          />
          <Button variant="secondary" onClick={checkDelivery} disabled={isChecking}>
            {isChecking ? 'Checking...' : 'Check'}
          </Button>
        </div>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </div>
      {deliveryInfo && (
        <div className="p-4 bg-accent/10 rounded-xl border border-accent/20 space-y-3">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium flex items-center gap-2">
                Delivery by {deliveryInfo.estimatedDate}
                <Check className="w-4 h-4 text-accent" />
              </p>
              {deliveryInfo.freeDelivery && <p className="text-sm text-accent">Free Delivery</p>}
            </div>
          </div>
          {deliveryInfo.codAvailable && (
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Check className="w-4 h-4 text-accent" />
              <span className="text-sm">Cash on Delivery available</span>
            </div>
          )}
        </div>
      )}
      {!deliveryInfo && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Truck className="w-4 h-4 text-primary" />
            <span>Free shipping ₹999+</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Ships in 24-48 hrs</span>
          </div>
        </div>
      )}
    </div>
  );
}
