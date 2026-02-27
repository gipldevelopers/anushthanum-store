'use client';

import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';
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
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth();
  
  const emailParam = searchParams.get('email');
  const codeParam = searchParams.get('code');
  
  const email = emailParam || '';
  const code = codeParam || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !code) {
      toast.error('Invalid or missing reset link parameters.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsResetting(true);
    const result = await resetPassword(email.trim(), code.trim(), password);
    setIsResetting(false);

    if (result.success) {
      setIsSuccess(true);
      toast.success(result.message || 'Password reset successful!');
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } else {
      toast.error(result.error || 'Failed to reset password.');
    }
  };

  if (!email || !code) {
    return (
      <CardContent className="space-y-6 pt-6">
        <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground">This reset link is invalid or malformed.</p>
            <Button variant="outline" asChild>
                <Link href="/forgot-password">Request a new link</Link>
            </Button>
        </div>
      </CardContent>
    );
  }

  if (isSuccess) {
    return (
        <CardContent className="space-y-6 pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-primary" />
            </div>
            <div>
                <p className="font-medium text-foreground">Password Reset Successfully</p>
                <p className="text-sm text-muted-foreground mt-1">
                You can now sign in with your new password. We are redirecting you...
                </p>
            </div>
            <Button className="w-full mt-4" asChild>
                <Link href="/signin">Sign in now</Link>
            </Button>
            </div>
        </CardContent>
    );
  }

  return (
    <form onSubmit={handleReset}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-password">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="reset-password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-11"
              required
              minLength={6}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reset-confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="reset-confirm"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-11"
              required
              minLength={6}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90"
          disabled={isResetting || password.length < 6}
        >
          {isResetting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Resetting...
            </span>
          ) : (
            'Reset Password'
          )}
        </Button>
      </CardFooter>
    </form>
  );
}

export default function ResetPasswordPage() {
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
            Set your new password
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-serif">Reset Password</CardTitle>
            <CardDescription>
              Please enter your new password below.
            </CardDescription>
          </CardHeader>
          
          <Suspense fallback={
            <CardContent className="flex justify-center py-6">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </CardContent>
          }>
            <ResetPasswordForm />
          </Suspense>
        </Card>

        <p className="text-center mt-6">
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
