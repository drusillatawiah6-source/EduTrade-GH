// app/(dashboard)/orders/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

const statusColors: { [key: string]: string } = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Order not found</div>;
  }

  const isSeller = session?.user?.id === order.sellerId;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-ghana-green hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order {order.id.slice(0, 8)}...</CardTitle>
                    <CardDescription>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[order.status] || ''}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.orderItems.map((item: any) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      {item.product.images && item.product.images.length > 0 && (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product.title}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold text-ghana-green">
                          GHS {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Buyer/Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {isSeller ? 'Buyer Information' : 'Seller Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">
                    {isSeller ? order.buyer.name : order.seller.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isSeller ? order.buyer.email : order.seller.email}
                  </p>
                  {(isSeller ? order.buyer.profile : order.seller.profile)?.phone && (
                    <p className="text-sm text-gray-600">
                      {isSeller ? order.buyer.profile?.phone : order.seller.profile?.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>GHS {order.total.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>GHS {order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Status Update (for seller) */}
            {isSeller && order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
              <Card>
                <CardHeader>
                  <CardTitle>Update Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {order.status === 'PENDING' && (
                    <Button
                      className="w-full bg-ghana-green hover:bg-ghana-green/90"
                      onClick={() => handleStatusChange('ACCEPTED')}
                    >
                      Accept Order
                    </Button>
                  )}
                  {order.status === 'ACCEPTED' && (
                    <Button
                      className="w-full bg-ghana-green hover:bg-ghana-green/90"
                      onClick={() => handleStatusChange('SHIPPED')}
                    >
                      Mark as Shipped
                    </Button>
                  )}
                  {order.status === 'SHIPPED' && (
                    <Button
                      className="w-full bg-ghana-green hover:bg-ghana-green/90"
                      onClick={() => handleStatusChange('DELIVERED')}
                    >
                      Mark as Delivered
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200"
                    onClick={() => handleStatusChange('CANCELLED')}
                  >
                    Cancel Order
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
