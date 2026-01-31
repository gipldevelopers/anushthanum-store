'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email?.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call – replace with real password-reset API when backend is ready
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('If an account exists, we\'ve sent a reset link.');
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
            Reset your account password
          </p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-serif">Forgot password?</CardTitle>
            <CardDescription>
              Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </CardHeader>

          {isSuccess ? (
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Check your email</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    If an account exists for <span className="font-medium text-foreground">{email}</span>, you will receive a password reset link shortly.
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or{' '}
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="text-primary font-medium hover:underline"
                  >
                    try again
                  </button>
                  .
                </p>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="forgot-email"
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
                      Sending...
                    </span>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
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
