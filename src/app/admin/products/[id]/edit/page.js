'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(!!id);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      await new Promise((r) => setTimeout(r, 500));
      setInitialData({
        name: '5 Mukhi Rudraksha',
        slug: '5-mukhi-rudraksha',
        categoryId: '1',
        subCategoryId: '1',
        price: '1499',
        discountPrice: '1299',
        stock: '45',
        sku: 'RUD-5M-001',
        shortDescription: 'Sacred 5 Mukhi Rudraksha for peace and spiritual growth',
        fullDescription: 'The 5 Mukhi Rudraksha is the most common and powerful bead...',
        thumbnail: '/images/products/rudraksha-5mukhi.jpg',
        images: ['/images/products/rudraksha-5mukhi.jpg', '/images/products/rudraksha-detail.jpg'],
        tags: ['bestseller', 'spiritual'],
        isFeatured: true,
        isVisible: true,
        seoTitle: 'Buy 5 Mukhi Rudraksha Online',
        seoDescription: 'Authentic 5 Mukhi Rudraksha with certificate',
        status: 'active',
      });
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <ProductForm isEdit={true} initialData={initialData} />;
}
