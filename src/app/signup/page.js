'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

const OTP_LENGTH = 6;

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams.get('redirect');
  const redirectPath = redirectParams || '/';
  
  const { signUp, verifyOtp, resendOtp, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [devOtp, setDevOtp] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, router, redirectPath]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((c) => (c <= 1 ? 0 : c - 1)), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  if (isAuthenticated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    const result = await signUp(name, email, phone, password);
    setIsSubmitting(false);
    if (result.success) {
      setOtpEmail(result.email || email);
      setOtpInput('');
      setResendCooldown(60);
      setDevOtp(result.devOtp || '');
      setShowOtpDialog(true);
      toast.success(result.message || 'OTP sent to your email', result.devOtp ? { description: `Dev OTP: ${result.devOtp}` } : undefined);
    } else {
      toast.error(result.error || 'Sign up failed.');
    }
  };

  const handleVerifyOtp = async () => {
    if (otpInput.length !== OTP_LENGTH) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }
    setIsVerifying(true);
    const result = await verifyOtp(otpEmail, otpInput);
    setIsVerifying(false);
    if (result.success) {
      setShowOtpDialog(false);
      setOtpInput('');
      setDevOtp('');
      toast.success('Account created! Welcome to Anushthanum.');
      router.push(redirectPath);
    } else {
      toast.error(result.error || 'Verification failed.');
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    const result = await resendOtp(otpEmail);
    if (result.success) {
      setOtpInput('');
      setResendCooldown(60);
      if (result.devOtp) setDevOtp(result.devOtp);
      toast.success(result.message || 'New OTP sent', result.devOtp ? { description: `Dev OTP: ${result.devOtp}` } : undefined);
    } else {
      toast.error(result.error || 'Failed to resend OTP.');
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-serif font-bold text-gradient-gold">
              Anushthanum
            </h1>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Create an account to save your orders and wishlist
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="text-sm font-medium">Join us</span>
            </div>
            <CardTitle className="text-xl font-serif">Sign up</CardTitle>
            <CardDescription>
              Enter your details to create your account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <GoogleSignInButton
                variant="outline"
                className="w-full h-11 border-border bg-background hover:bg-muted/50 text-foreground font-medium"
                redirectTo="/"
              />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Arjun Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-phone">Phone (optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 h-11"
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{' '}
                <Link
                  href="/signin"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <Dialog open={showOtpDialog} onOpenChange={(open) => !open && setShowOtpDialog(false)}>
          <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center">Verify your email</DialogTitle>
              <DialogDescription className="text-center">
                We&apos;ve sent a 6-digit code to <span className="font-medium text-foreground">{otpEmail}</span>. Enter it below.
                {devOtp && <span className="block mt-2 text-xs">Dev: {devOtp}</span>}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="otp-input">Enter OTP</Label>
                <Input
                  id="otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={OTP_LENGTH}
                  placeholder="000000"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH))}
                  className="h-12 text-center text-xl tracking-[0.5em] font-mono"
                  autoFocus
                />
              </div>
              <Button
                type="button"
                className="w-full h-11"
                onClick={handleVerifyOtp}
                disabled={isVerifying || otpInput.length !== OTP_LENGTH}
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  'Verify & create account'
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive the code?{' '}
                {resendCooldown > 0 ? (
                  <span>Resend in {resendCooldown}s</span>
                ) : (
                  <button type="button" className="font-medium text-primary hover:underline" onClick={handleResendOtp}>
                    Resend OTP
                  </button>
                )}
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
