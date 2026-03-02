'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Shield,
  Truck,
  Gift,
  Tag,
  Minus,
  Plus,
  Lock,
  Check,
  Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { accountApi } from '@/services/accountApi';
import { checkoutApi } from '@/services/checkoutApi';

const steps = [
  { id: 'cart', label: 'Cart', icon: ShoppingBag },
  { id: 'shipping-payment', label: 'Shipping & Payment', icon: CreditCard },
];

const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when your order arrives', icon: '💵' },
  { id: 'online', name: 'Online Payment', description: 'Pay securely with UPI, Card, Netbanking via Razorpay', icon: '💳' },
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [addressMode, setAddressMode] = useState('new');
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressOptions, setShowAddressOptions] = useState(false);
  const [newAddress, setNewAddress] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setNewAddress(prev => ({
        ...prev,
        email: user.email || prev.email,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
      }));
      setOrderEmail(user.email || '');
      
      accountApi.getAddresses()
        .then((res) => {
          if (res.success && res.addresses && res.addresses.length > 0) {
            setSavedAddresses(res.addresses);
            setAddressMode('saved');
            setSelectedAddressId(res.addresses.find(a => a.isDefault)?.id || res.addresses[0]?.id || null);
          }
        })
        .catch((e) => console.error('Failed to load addresses:', e));
    }
  }, [isAuthenticated, user]);

  const [formErrors, setFormErrors] = useState({});
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [orderEmail, setOrderEmail] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [saveAddress, setSaveAddress] = useState(true);
  const [editAddressId, setEditAddressId] = useState(null);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);

  const handleSaveEditAddress = async () => {
    const addressErrors = validateAddress();
    if (Object.keys(addressErrors).length > 0) {
      setFormErrors(addressErrors);
      return;
    }
    setIsUpdatingAddress(true);
    try {
      await accountApi.updateAddress(editAddressId, {
        name: newAddress.name,
        phone: newAddress.phone,
        street: newAddress.address,
        city: newAddress.city,
        state: newAddress.state,
        pincode: newAddress.pincode,
        type: Object.values(savedAddresses).find(a => a.id === editAddressId)?.type || 'Home',
      });
      toast.success('Address updated successfully');
      setAddressMode('saved');
      setEditAddressId(null);
      const res = await accountApi.getAddresses();
      if (res.addresses) {
        setSavedAddresses(res.addresses);
      }
      setSelectedAddressId(editAddressId);
    } catch(e) {
      toast.error('Failed to update address: ' + (e?.message || 'Unknown error'));
    } finally {
      setIsUpdatingAddress(false);
    }
  };

  const getShippingAddress = () => {
    if (addressMode === 'saved' && selectedAddressId) {
      const addr = savedAddresses.find((a) => a.id === selectedAddressId);
      return addr ? { ...addr, email: orderEmail } : null;
    }
    return newAddress;
  };

  const getDeliveryEstimate = () => {
    const addr = getShippingAddress();
    if (!addr || !addr.pincode || addr.pincode.length !== 6) return null;
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 3);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 5);
    const formatDate = (date) => date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const discount = promoDiscount;
  const total = subtotal + shipping - discount;

  const validateAddress = () => {
    const errors = {};
    if (addressMode === 'saved' && selectedAddressId) {
      if (!orderEmail || !/\S+@\S+\.\S+/.test(orderEmail)) errors.email = 'Valid email is required for order updates';
      return errors;
    }
    if (!newAddress.email || !/\S+@\S+\.\S+/.test(newAddress.email)) errors.email = 'Valid email is required';
    if (!newAddress.name?.trim()) errors.name = 'Name is required';
    if (!newAddress.phone || !/^\d{10}$/.test(newAddress.phone.replace(/\D/g, ''))) errors.phone = 'Valid 10-digit phone required';
    if (!newAddress.address?.trim()) errors.address = 'Address is required';
    if (!newAddress.city?.trim()) errors.city = 'City is required';
    if (!newAddress.state) errors.state = 'State is required';
    if (!/^\d{6}$/.test(newAddress.pincode || '')) errors.pincode = 'Valid 6-digit pincode required';
    return errors;
  };

  const validatePayment = () => true;

  const nextStep = () => {
    if (currentStep === 0 && items.length > 0) {
      if (!isLoading && !isAuthenticated) {
        toast.error('Please sign in to continue with checkout');
        router.push('/signin?redirect=/checkout');
        return;
      }
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'divine10') {
      setAppliedPromo('DIVINE10');
      setPromoDiscount(Math.round(subtotal * 0.1));
      toast.success('Promo applied!', { description: '10% discount added' });
    } else if (promoCode.toLowerCase() === 'first100') {
      setAppliedPromo('FIRST100');
      setPromoDiscount(100);
      toast.success('Promo applied!', { description: '₹100 off added' });
    } else {
      toast.error('Invalid code');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(window.Razorpay);
      script.onerror = () => resolve(null);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async () => {
    const addressErrors = validateAddress();
    if (Object.keys(addressErrors).length > 0) {
      setFormErrors(addressErrors);
      toast.error('Please fill in all required address fields');
      return;
    }
    if (!validatePayment()) {
      toast.error('Please complete payment details');
      return;
    }

    const addr = getShippingAddress();
    if (!addr || !addr.name || !addr.email) {
      toast.error('Please provide name and email');
      return;
    }

    const orderPayload = {
      items: items.map((it) => ({
        product: {
          id: it.product?.id,
          name: it.product?.name,
          price: it.product?.price,
          images: it.product?.images,
          thumbnail: it.product?.thumbnail,
        },
        quantity: it.quantity,
      })),
      shippingAddress: {
        name: addr.name,
        email: addr.email,
        phone: addr.phone || '',
        address: addr.address || addr.street || '',
        city: addr.city || '',
        state: addr.state || '',
        pincode: addr.pincode || '',
      },
      paymentMethod: selectedPayment === 'cod' ? 'cod' : 'razorpay',
      subtotal,
      shippingCost: shipping,
      discount,
      total,
      couponCode: appliedPromo || null,
      isGift,
      giftMessage: isGift ? giftMessage : null,
    };

    setIsPlacingOrder(true);
    try {
      const res = await checkoutApi.createOrder(orderPayload);

      if (addressMode === 'new' && saveAddress && isAuthenticated) {
        try {
          await accountApi.createAddress({
            name: addr.name,
            phone: addr.phone,
            street: addr.address || addr.street,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
            type: 'Home',
          });
        } catch (e) {
          console.error('Failed to save address', e);
        }
      }

      if (res.paymentStatus === 'cod') {
        clearCart();
        toast.success('Order placed! Pay on delivery.');
        router.push(`/checkout/success?orderNumber=${encodeURIComponent(res.orderNumber)}`);
        return;
      }

      if (!res.razorpayOrderId || !res.razorpayKeyId) {
        toast.error('Payment gateway not configured');
        setIsPlacingOrder(false);
        return;
      }

      const Razorpay = await loadRazorpayScript();
      if (!Razorpay) {
        toast.error('Payment failed to load. Please try again.');
        setIsPlacingOrder(false);
        return;
      }

      const options = {
        key: res.razorpayKeyId,
        amount: res.razorpayAmount,
        currency: res.razorpayCurrency || 'INR',
        name: 'Anushthanum',
        description: `Order ${res.orderNumber}`,
        order_id: res.razorpayOrderId,
        handler: async (response) => {
          try {
            await checkoutApi.verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            toast.success('Payment successful!');
            router.push(`/checkout/success?orderNumber=${encodeURIComponent(res.orderNumber)}`);
          } catch (e) {
            toast.error(e?.message || 'Payment verification failed');
            router.push(`/checkout/failure?orderNumber=${encodeURIComponent(res.orderNumber)}`);
          } finally {
            setIsPlacingOrder(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
            router.push(`/checkout/failure?orderNumber=${encodeURIComponent(res.orderNumber)}`);
            setIsPlacingOrder(false);
          },
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (e) {
      toast.error(e?.message || 'Failed to place order');
      setIsPlacingOrder(false);
    }
  };

  const canProceedFromCart = () => items.length > 0;
  const canPlaceOrder = () => Object.keys(validateAddress()).length === 0 && validatePayment();

  const formatPrice = (n) => `₹${Number(n).toLocaleString()}`;

  if (items.length === 0 && currentStep === 0) {
    return (
      <main className="min-h-screen bg-muted/30 py-12">
        <div className="container">
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some items to get started</p>
            <Button asChild size="lg">
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    index === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : index < currentStep
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                  <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                </div>
                {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1 md:mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-6 md:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Cart ({items.length} items)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                          <Link href={`/product/${item.product.slug}`}>
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-background flex-shrink-0">
                              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.product.slug}`}>
                              <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">{item.product.name}</h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                            <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)} each</p>
                            <Button variant="ghost" size="sm" className="text-destructive mt-1 h-8" onClick={() => removeFromCart(item.product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-2 pt-4">
                        <div className="flex-1 relative">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="pl-10" disabled={!!appliedPromo} />
                        </div>
                        {appliedPromo ? (
                          <Button variant="outline" onClick={() => { setAppliedPromo(null); setPromoDiscount(0); setPromoCode(''); }}>Remove</Button>
                        ) : (
                          <Button onClick={applyPromoCode}>Apply</Button>
                        )}
                      </div>
                      {appliedPromo && (
                        <Badge variant="secondary" className="gap-1">
                          <Check className="w-3 h-3" /> {appliedPromo} - {formatPrice(promoDiscount)} off
                        </Badge>
                      )}

                      <div className="pt-4 border-t">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox checked={isGift} onCheckedChange={(c) => setIsGift(c === true)} />
                          <Gift className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">This is a gift</span>
                        </label>
                        {isGift && (
                          <Input placeholder="Gift message (optional)" value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} className="mt-3" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div key="shipping-payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Delivery Address
                        </CardTitle>
                        {savedAddresses.length > 0 && addressMode === 'saved' && !showAddressOptions && (
                          <Button variant="ghost" size="sm" className="text-primary h-8" onClick={() => setShowAddressOptions(true)}>Change</Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {savedAddresses.length > 0 && addressMode === 'saved' && !showAddressOptions && (() => {
                        const selectedAddr = savedAddresses.find((a) => a.id === selectedAddressId);
                        return selectedAddr ? (
                          <div className="space-y-3">
                            <div className="p-4 rounded-xl border-2 border-primary bg-primary/5">
                              <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Check className="w-4 h-4 text-primary" />
                                  <span className="font-medium">{selectedAddr.name}</span>
                                  {selectedAddr.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 px-2 text-muted-foreground hover:text-primary z-10"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setAddressMode('edit');
                                    setEditAddressId(selectedAddr.id);
                                    setNewAddress({
                                      email: orderEmail || user?.email || '',
                                      name: selectedAddr.name || '',
                                      phone: selectedAddr.phone || '',
                                      address: selectedAddr.address || selectedAddr.street || '',
                                      city: selectedAddr.city || '',
                                      state: selectedAddr.state || '',
                                      pincode: selectedAddr.pincode || '',
                                    });
                                    setShowAddressOptions(true);
                                  }}
                                >
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground">{selectedAddr.address || selectedAddr.street}</p>
                              <p className="text-sm text-muted-foreground">{selectedAddr.city}, {selectedAddr.state} - {selectedAddr.pincode}</p>
                              <p className="text-sm text-muted-foreground mt-1">📞 {selectedAddr.phone}</p>
                            </div>
                            <div>
                              <Label>Email for order updates <span className="text-destructive">*</span></Label>
                              <Input type="email" value={orderEmail} onChange={(e) => setOrderEmail(e.target.value)} placeholder="your@email.com" className={formErrors.email ? 'border-destructive mt-1' : 'mt-1'} />
                              {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
                            </div>
                          </div>
                        ) : null;
                      })()}

                      {(showAddressOptions || addressMode === 'new' || addressMode === 'edit' || savedAddresses.length === 0) && (
                        <>
                          {savedAddresses.length > 0 && (
                            <RadioGroup
                              value={addressMode === 'saved' ? selectedAddressId || '' : ''}
                              onValueChange={(id) => {
                                setAddressMode('saved');
                                setSelectedAddressId(id);
                                setFormErrors({});
                                setShowAddressOptions(false);
                              }}
                              className="space-y-3"
                            >
                              {savedAddresses.map((addr) => (
                                <label
                                  key={addr.id}
                                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    addressMode === 'saved' && selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  <RadioGroupItem value={addr.id} className="mt-1" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-medium">{addr.name}</span>
                                      {addr.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{addr.address || addr.street}</p>
                                    <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} - {addr.pincode}</p>
                                    <p className="text-sm text-muted-foreground mt-1">📞 {addr.phone}</p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 px-2 text-muted-foreground hover:text-primary z-10"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setAddressMode('edit');
                                      setEditAddressId(addr.id);
                                      setNewAddress({
                                        email: orderEmail || user?.email || '',
                                        name: addr.name || '',
                                        phone: addr.phone || '',
                                        address: addr.address || addr.street || '',
                                        city: addr.city || '',
                                        state: addr.state || '',
                                        pincode: addr.pincode || '',
                                      });
                                    }}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </Button>
                                </label>
                              ))}
                            </RadioGroup>
                          )}

                          <button
                            type="button"
                            onClick={() => { setAddressMode('new'); setEditAddressId(null); setSelectedAddressId(null); setShowAddressOptions(true); }}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                              addressMode === 'new' ? 'border-primary bg-primary/5' : 'border-dashed border-border hover:border-primary/50'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${addressMode === 'new' ? 'border-primary' : 'border-muted-foreground'}`}>
                              {addressMode === 'new' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <div>
                              <span className="font-medium">{savedAddresses.length > 0 ? '+ Add New Address' : 'Enter Shipping Address'}</span>
                              <p className="text-sm text-muted-foreground">
                                {savedAddresses.length > 0 
                                  ? 'Ship to a different address' 
                                  : isAuthenticated 
                                    ? 'Add a new shipping address' 
                                    : 'No account needed - checkout as guest'}
                              </p>
                            </div>
                          </button>
                        </>
                      )}

                      {(addressMode === 'new' || addressMode === 'edit') && (
                        <div className="space-y-4 pt-2">
                          <div>
                            <Label>Email <span className="text-destructive">*</span></Label>
                            <Input type="email" value={newAddress.email} onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })} placeholder="your@email.com" className={formErrors.email ? 'border-destructive' : ''} />
                            {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
                            <p className="text-xs text-muted-foreground mt-1">Order updates will be sent here</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Full Name <span className="text-destructive">*</span></Label>
                              <Input value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} placeholder="Enter your name" className={formErrors.name ? 'border-destructive' : ''} />
                              {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
                            </div>
                            <div>
                              <Label>Phone <span className="text-destructive">*</span></Label>
                              <Input type="tel" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit number" className={formErrors.phone ? 'border-destructive' : ''} />
                              {formErrors.phone && <p className="text-xs text-destructive mt-1">{formErrors.phone}</p>}
                            </div>
                          </div>
                          <div>
                            <Label>Address <span className="text-destructive">*</span></Label>
                            <Input value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} placeholder="House no., Building, Street" className={formErrors.address ? 'border-destructive' : ''} />
                            {formErrors.address && <p className="text-xs text-destructive mt-1">{formErrors.address}</p>}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label>City <span className="text-destructive">*</span></Label>
                              <Input value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} placeholder="City" className={formErrors.city ? 'border-destructive' : ''} />
                              {formErrors.city && <p className="text-xs text-destructive mt-1">{formErrors.city}</p>}
                            </div>
                            <div>
                              <Label>State <span className="text-destructive">*</span></Label>
                              <Select value={newAddress.state} onValueChange={(v) => setNewAddress({ ...newAddress, state: v })}>
                                <SelectTrigger className={formErrors.state ? 'border-destructive' : ''}>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {indianStates.map((state) => (
                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {formErrors.state && <p className="text-xs text-destructive mt-1">{formErrors.state}</p>}
                            </div>
                            <div>
                              <Label>Pincode <span className="text-destructive">*</span></Label>
                              <Input value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} placeholder="6-digit" maxLength={6} className={formErrors.pincode ? 'border-destructive' : ''} />
                              {formErrors.pincode && <p className="text-xs text-destructive mt-1">{formErrors.pincode}</p>}
                            </div>
                          </div>
                          {isAuthenticated && addressMode === 'new' && (
                            <div className="flex items-center gap-2 pt-2">
                              <Checkbox 
                                id="save-address" 
                                checked={saveAddress} 
                                onCheckedChange={(c) => setSaveAddress(c === true)} 
                              />
                              <Label htmlFor="save-address" className="text-sm font-medium leading-none cursor-pointer">
                                Save this address for future orders
                              </Label>
                            </div>
                          )}
                          {addressMode === 'edit' && (
                            <div className="flex gap-2 pt-4">
                              <Button type="button" onClick={handleSaveEditAddress} disabled={isUpdatingAddress}>
                                {isUpdatingAddress ? 'Saving...' : 'Update Address'}
                              </Button>
                              <Button type="button" variant="outline" onClick={() => {
                                setAddressMode('saved');
                                setEditAddressId(null);
                                setShowAddressOptions(true);
                              }}>
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="p-4 bg-accent/10 rounded-lg flex items-center gap-3">
                    <Truck className="w-5 h-5 text-accent flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {getDeliveryEstimate() ? `Expected Delivery: ${getDeliveryEstimate()}` : 'Estimated Delivery: 3-5 business days'}
                      </p>
                      <p className="text-xs text-muted-foreground">{shipping === 0 ? '✓ Free shipping on this order!' : `Shipping: ${formatPrice(shipping)}`}</p>
                    </div>
                    {selectedPayment === 'cod' && <Badge variant="outline" className="text-xs">COD Available</Badge>}
                  </div>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                        {paymentMethods.map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedPayment === method.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                          >
                            <RadioGroupItem value={method.id} />
                            <span className="text-2xl">{method.icon}</span>
                            <div className="flex-1">
                              <p className="font-medium">{method.name}</p>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                            {method.id === 'cod' && <Badge variant="secondary">Popular</Badge>}
                            {method.id === 'online' && (
                              <Badge variant="outline" className="text-xs">Razorpay</Badge>
                            )}
                          </label>
                        ))}
                      </RadioGroup>
                      <div className="flex items-center gap-2 mt-6 p-3 bg-accent/10 rounded-lg">
                        <Lock className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground">Your payment is secure and encrypted</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {currentStep === 0 ? (
                <Button onClick={nextStep} disabled={!canProceedFromCart()} size="lg">
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={placeOrder} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPlacingOrder}>
                  <Lock className="w-4 h-4 mr-2" />
                  {isPlacingOrder ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <span className="text-muted-foreground truncate max-w-[180px]">{item.product.name} × {item.quantity}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                  {items.length > 3 && <p className="text-muted-foreground text-xs">+{items.length - 3} more</p>}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? 'text-accent font-medium' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-accent">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>100% Authentic Products</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping over ₹999</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                </div>
                {currentStep === 1 && (
                  <div className="pt-4 border-t">
                    <p className="text-xs font-medium mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Shipping to
                    </p>
                    {(() => {
                      const addr = getShippingAddress();
                      return addr && (addr.name || addr.address) ? (
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium text-foreground">{addr.name}</p>
                          <p>{addr.address}</p>
                          <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">Complete address above</p>
                      );
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
