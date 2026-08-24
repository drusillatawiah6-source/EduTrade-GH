// app/(marketplace)/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Heart, Share2 } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images Section */}
          <div>
            <div className="bg-gray-100 rounded-lg mb-4 flex items-center justify-center h-96">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]?.url || ''}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="object-contain"
                />
              ) : (
                <div className="text-center text-gray-400">No images available</div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded border-2 ${
                      selectedImage === idx ? 'border-ghana-green' : 'border-gray-300'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`Product ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-ghana-green mb-2">{product.title}</h1>
              <p className="text-gray-600">{product.category?.name}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-ghana-green">
                  GHS {product.price.toFixed(2)}
                </CardTitle>
                {product.isNegotiable && (
                  <p className="text-sm text-ghana-gold font-semibold">Price is negotiable</p>
                )}
              </CardHeader>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Seller Information</h3>
                <div className="space-y-2">
                  <p className="font-medium">{product.seller?.name}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">Rating coming soon</span>
                  </div>
                  {product.seller?.profile?.school && (
                    <p className="text-sm text-gray-600">School: {product.seller.profile.school}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Item Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Condition:</span> {product.condition}</p>
                  <p><span className="text-gray-600">Quantity:</span> {product.quantity}</p>
                  {product.school && <p><span className="text-gray-600">School:</span> {product.school}</p>}
                  {product.region && <p><span className="text-gray-600">Region:</span> {product.region}</p>}
                  <p><span className="text-gray-600">Posted:</span> {new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h3 className="font-semibold">Actions</h3>
              <Button className="w-full bg-ghana-green hover:bg-ghana-green/90 h-12" size="lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with Seller
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isWishlisted ? 'fill-ghana-red text-ghana-red' : ''
                    }`}
                  />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
