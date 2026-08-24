// app/(marketplace)/wishlist/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/hooks/useWishlist';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function WishlistPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, loading, fetchWishlist, removeItem } = useWishlist();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchWishlist();
    }
  }, [status, fetchWishlist]);

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-ghana-green hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-ghana-red fill-ghana-red" />
          <h1 className="text-4xl font-bold text-ghana-green">My Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-600 mb-6">Your wishlist is empty</p>
              <Link href="/marketplace">
                <Button className="bg-ghana-green hover:bg-ghana-green/90">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Link href={`/products/${item.product.id}`}>
                    <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden h-48">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>

                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="font-semibold text-lg hover:text-ghana-green line-clamp-2">
                      {item.product.title}
                    </h3>
                  </Link>

                  <p className="text-ghana-green font-bold text-xl my-2">
                    GHS {item.product.price.toFixed(2)}
                  </p>

                  {item.product.isNegotiable && (
                    <p className="text-sm text-ghana-gold font-semibold mb-3">
                      Price is negotiable
                    </p>
                  )}

                  <div className="space-y-2">
                    <Button className="w-full bg-ghana-green hover:bg-ghana-green/90">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 border-red-200"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Heart className="w-4 h-4 mr-2 fill-red-600" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
