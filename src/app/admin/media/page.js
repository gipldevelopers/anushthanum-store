'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Media Manager</h1>
        <p className="text-muted-foreground mt-1">Upload and manage images</p>
      </div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2"><ImageIcon className="h-5 w-5" />All Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Button><Upload className="h-4 w-4 mr-2" />Upload Images</Button>
          <p className="text-muted-foreground mt-4">Connect your API to list and upload files.</p>
        </CardContent>
      </Card>
    </div>
  );
}
