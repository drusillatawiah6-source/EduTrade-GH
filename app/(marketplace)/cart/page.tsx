// app/(marketplace)/cart/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, loading, fetchCart, updateItem, removeItem } = useCart();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCart();
    }
  }, [status, fetchCart]);

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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

        <h1 className="text-4xl font-bold text-ghana-green mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-600 mb-6">Your cart is empty</p>
              <Link href="/marketplace">
                <Button className="bg-ghana-green hover:bg-ghana-green/90">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      {item.product.images && item.product.images.length > 0 && (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          width={120}
                          height={120}
                          className="rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="font-semibold text-lg hover:text-ghana-green">
                            {item.product.title}
                          </h3>
                        </Link>
                        <p className="text-ghana-green font-bold text-lg mt-2">
                          GHS {item.product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                          <label className="text-sm font-medium">Quantity:</label>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(item.id, parseInt(e.target.value))
                            }
                            className="w-16 border rounded px-2 py-1"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>GHS {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>To be calculated</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>GHS {total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full bg-ghana-green hover:bg-ghana-green/90 h-12" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
