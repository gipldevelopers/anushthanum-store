'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Search,
  Eye,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-1248',
    customerId: 'c1',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul@example.com',
    customerPhone: '9876543210',
    shippingAddress: { name: 'Rahul Sharma', street: '123 MG Road', city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
    items: [
      { productId: '1', productName: '5 Mukhi Rudraksha', productImage: '/placeholder.svg', quantity: 2, price: 1499, total: 2998 },
      { productId: '2', productName: 'Tiger Eye Bracelet', productImage: '/placeholder.svg', quantity: 1, price: 1299, total: 1299 },
    ],
    subtotal: 4297,
    shippingCost: 99,
    tax: 773,
    total: 5169,
    status: 'pending',
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-1247',
    customerId: 'c2',
    customerName: 'Priya Patel',
    customerEmail: 'priya@example.com',
    customerPhone: '9876543211',
    shippingAddress: { name: 'Priya Patel', street: '456 Park Street', city: 'Delhi', state: 'Delhi', pincode: '110001' },
    items: [
      { productId: '3', productName: 'Sri Yantra Pendant', productImage: '/placeholder.svg', quantity: 1, price: 5999, total: 5999 },
    ],
    subtotal: 5999,
    shippingCost: 0,
    tax: 1080,
    total: 7079,
    status: 'processing',
    paymentMethod: 'Card',
    paymentStatus: 'paid',
    createdAt: '2024-01-19T15:45:00Z',
    updatedAt: '2024-01-19T16:00:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-1246',
    customerId: 'c3',
    customerName: 'Amit Kumar',
    customerEmail: 'amit@example.com',
    customerPhone: '9876543212',
    shippingAddress: { name: 'Amit Kumar', street: '789 Lake Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001' },
    items: [
      { productId: '4', productName: 'Amethyst Crystal', productImage: '/placeholder.svg', quantity: 1, price: 2999, total: 2999 },
    ],
    subtotal: 2999,
    shippingCost: 99,
    tax: 540,
    total: 3638,
    status: 'shipped',
    paymentMethod: 'COD',
    paymentStatus: 'pending',
    createdAt: '2024-01-18T09:20:00Z',
    updatedAt: '2024-01-19T11:30:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-1245',
    customerId: 'c4',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha@example.com',
    customerPhone: '9876543213',
    shippingAddress: { name: 'Sneha Reddy', street: '321 Hill View', city: 'Hyderabad', state: 'Telangana', pincode: '500001' },
    items: [
      { productId: '5', productName: '108 Bead Mala', productImage: '/placeholder.svg', quantity: 1, price: 3999, total: 3999 },
    ],
    subtotal: 3999,
    shippingCost: 0,
    tax: 720,
    total: 4719,
    status: 'delivered',
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    createdAt: '2024-01-15T14:10:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
];

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, variant: 'secondary' },
  processing: { label: 'Processing', icon: Package, variant: 'default' },
  shipped: { label: 'Shipped', icon: Truck, variant: 'default' },
  delivered: { label: 'Delivered', icon: CheckCircle, variant: 'default' },
  cancelled: { label: 'Cancelled', icon: XCircle, variant: 'destructive' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setOrders(mockOrders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success('Order status updated');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage customer orders</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order # or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            All Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead className="hidden md:table-cell">Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Payment</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status]?.icon ?? Clock;
                    const config = statusConfig[order.status] ?? { label: order.status, variant: 'secondary' };
                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground md:hidden">{order.customerName}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div>
                            <p className="font-medium">{order.customerName}</p>
                            <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">₹{order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={config.variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge variant={order.paymentStatus === 'paid' ? 'outline' : 'secondary'}>
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedOrder.orderNumber}</span>
                  <Badge variant={statusConfig[selectedOrder.status]?.variant ?? 'secondary'}>
                    {statusConfig[selectedOrder.status]?.label ?? selectedOrder.status}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Update Status:</span>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => handleStatusChange(selectedOrder.id, value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Customer Details</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{selectedOrder.customerName}</p>
                      <p>{selectedOrder.customerEmail}</p>
                      <p>{selectedOrder.customerPhone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{selectedOrder.shippingAddress.name}</p>
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                      <p>{selectedOrder.shippingAddress.pincode}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden shrink-0">
                          <img src={item.productImage} alt={item.productName} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                        </div>
                        <p className="font-medium">₹{item.total.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{selectedOrder.shippingCost === 0 ? 'Free' : `₹${selectedOrder.shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{selectedOrder.paymentMethod}</p>
                  </div>
                  <Badge variant={selectedOrder.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
