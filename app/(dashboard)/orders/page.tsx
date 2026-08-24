// app/(dashboard)/orders/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Package, MessageSquare } from 'lucide-react';

const statusColors: { [key: string]: string } = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, role]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/user?role=${role}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-ghana-green mb-8">
          {role === 'buyer' ? 'My Purchases' : 'My Sales'}
        </h1>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="buyer" onClick={() => setRole('buyer')}>
              Purchases
            </TabsTrigger>
            <TabsTrigger value="seller" onClick={() => setRole('seller')}>
              Sales
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-6">
                {role === 'buyer' ? 'No purchases yet' : 'No sales yet'}
              </p>
              <Link href="/marketplace">
                <Button className="bg-ghana-green hover:bg-ghana-green/90">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order {order.id.slice(0, 8)}...
                      </CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={statusColors[order.status] || ''}>
                        {order.status}
                      </Badge>
                      <p className="text-2xl font-bold text-ghana-green mt-2">
                        GHS {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <ul className="space-y-1 text-sm">
                      {order.orderItems.map((item: any) => (
                        <li key={item.id}>
                          {item.product.title} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                    <Link href={`/messages/${order.id}`}>
                      <Button variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </Link>
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
