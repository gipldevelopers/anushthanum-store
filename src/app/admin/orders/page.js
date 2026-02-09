'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage customer orders</p>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2"><ShoppingCart className="h-5 w-5" />All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Order list will load here. Connect your backend API to load real orders.</p>
        </CardContent>
      </Card>
    </div>
  );
}
