'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Loader2, Settings, Lock, Bell, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@anushthanum.com',
  });
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    lowStock: true,
    newsletters: false,
  });

  const handleSaveProfile = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Profile updated successfully');
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (!password.current || !password.new || !password.confirm) {
      toast.error('Please fill all password fields');
      return;
    }
    if (password.new !== password.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (password.new.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Password changed successfully');
    setPassword({ current: '', new: '', confirm: '' });
    setSaving(false);
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Notification preferences saved');
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" />Profile Settings</CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
            </div>
          </div>
          <Button onClick={handleSaveProfile} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" />Change Password</CardTitle>
          <CardDescription>Update your password for security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input id="current" type="password" value={password.current} onChange={(e) => setPassword((p) => ({ ...p, current: e.target.value }))} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" value={password.new} onChange={(e) => setPassword((p) => ({ ...p, new: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" value={password.confirm} onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))} />
            </div>
          </div>
          <Button onClick={handleChangePassword} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Change Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Notification Preferences</CardTitle>
          <CardDescription>Control which notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Order Alerts</p><p className="text-sm text-muted-foreground">Get notified for new orders</p></div>
            <Switch checked={notifications.orderAlerts} onCheckedChange={(c) => setNotifications((p) => ({ ...p, orderAlerts: c }))} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Low Stock Alerts</p><p className="text-sm text-muted-foreground">Alert when products are running low</p></div>
            <Switch checked={notifications.lowStock} onCheckedChange={(c) => setNotifications((p) => ({ ...p, lowStock: c }))} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Newsletter Updates</p><p className="text-sm text-muted-foreground">Platform updates and tips</p></div>
            <Switch checked={notifications.newsletters} onCheckedChange={(c) => setNotifications((p) => ({ ...p, newsletters: c }))} />
          </div>
          <Button onClick={handleSaveNotifications} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Security Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Last Login</span><span>{new Date().toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Account Role</span><span className="capitalize">{user?.role || 'Admin'}</span></div>
        </CardContent>
      </Card>
    </div>
  );
}
