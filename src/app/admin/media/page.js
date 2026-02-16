'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  Upload,
  Search,
  Trash2,
  Image as ImageIcon,
  Copy,
  Check,
  Grid,
  List,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock media files
const mockMedia = [
  { id: '1', name: 'rudraksha-5mukhi.jpg', url: '/placeholder.svg', type: 'image', size: 245000, dimensions: { width: 800, height: 800 }, uploadedAt: '2024-01-15T10:30:00Z' },
  { id: '2', name: 'yantra-pendant.jpg', url: '/placeholder.svg', type: 'image', size: 180000, dimensions: { width: 600, height: 600 }, uploadedAt: '2024-01-16T11:00:00Z' },
  { id: '3', name: 'crystal-amethyst.jpg', url: '/placeholder.svg', type: 'image', size: 320000, dimensions: { width: 1000, height: 1000 }, uploadedAt: '2024-01-17T09:15:00Z' },
  { id: '4', name: 'bracelet-tiger-eye.jpg', url: '/placeholder.svg', type: 'image', size: 156000, dimensions: { width: 500, height: 500 }, uploadedAt: '2024-01-18T14:45:00Z' },
  { id: '5', name: 'banner-homepage.jpg', url: '/placeholder.svg', type: 'image', size: 520000, dimensions: { width: 1920, height: 600 }, uploadedAt: '2024-01-19T08:20:00Z' },
  { id: '6', name: 'category-rudraksha.jpg', url: '/placeholder.svg', type: 'image', size: 210000, dimensions: { width: 400, height: 400 }, uploadedAt: '2024-01-20T16:30:00Z' },
];

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMedia = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setMedia(mockMedia);
      setLoading(false);
    };
    fetchMedia();
  }, []);

  const filteredMedia = media.filter(file =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newFiles = Array.from(files).map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: 'image',
      size: file.size,
      uploadedAt: new Date().toISOString(),
    }));

    setMedia(prev => [...newFiles, ...prev]);
    setUploading(false);
    toast(`${files.length} file(s) uploaded successfully`);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setMedia(prev => prev.filter(file => file.id !== deleteId));
    if (selectedFile?.id === deleteId) {
      setSelectedFile(null);
    }
    toast('File deleted successfully');
    setDeleteId(null);
  };

  const handleCopyUrl = (file) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    toast('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Media Manager</h1>
          <p className="text-muted-foreground mt-1">Upload and manage images</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Media Grid/List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              All Files ({filteredMedia.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className={cn(
                viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'
              )}>
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className={viewMode === 'grid' ? 'aspect-square rounded-lg' : 'h-16'} />
                ))}
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No files found</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={cn(
                      "group relative aspect-square rounded-lg overflow-hidden border cursor-pointer transition-all",
                      selectedFile?.id === file.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                    )}
                  >
                    <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); handleCopyUrl(file); }}>
                        {copiedId === file.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); setDeleteId(file.id); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMedia.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      selectedFile?.id === file.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                    )}
                  >
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); handleCopyUrl(file); }}>
                        {copiedId === file.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); setDeleteId(file.id); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="hidden lg:block h-fit sticky top-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedFile ? (
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={selectedFile.url} alt={selectedFile.name} className="h-full w-full object-contain" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium truncate max-w-[150px]">{selectedFile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span>{formatFileSize(selectedFile.size)}</span>
                  </div>
                  {selectedFile.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span>{selectedFile.dimensions.width} × {selectedFile.dimensions.height}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uploaded</span>
                    <span>{new Date(selectedFile.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline" onClick={() => handleCopyUrl(selectedFile)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy URL
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => setDeleteId(selectedFile.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select an image to preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
