'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminContentPage() {
  const handleSave = () => toast.success('Content saved. Connect API to persist.');
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Content CMS</h1>
          <p className="text-muted-foreground mt-1">Manage website content and settings</p>
        </div>
        <Button onClick={handleSave}>Save All Changes</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Homepage and Site Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Edit homepage sections, site name, contact info and footer. Connect your API to load and save content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
