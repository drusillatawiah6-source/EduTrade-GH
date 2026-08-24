// services/order.service.ts
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

export async function createOrder(userId: string, cartItemIds: string[], buyerNote?: string) {
  // Get cart items
  const cartItems = await prisma.cartItem.findMany({
    where: {
      id: { in: cartItemIds },
      userId,
    },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    throw new Error('No items found');
  }

  // Group items by seller
  const itemsBySection: { [key: string]: typeof cartItems } = {};
  cartItems.forEach((item) => {
    const sellerId = item.product.userId;
    if (!itemsBySection[sellerId]) {
      itemsBySection[sellerId] = [];
    }
    itemsBySection[sellerId].push(item);
  });

  // Create an order for each seller
  const orders = [];
  for (const sellerId in itemsBySection) {
    const items = itemsBySection[sellerId];
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = await prisma.order.create({
      data: {
        buyerId: userId,
        sellerId,
        total,
        status: 'PENDING',
        buyerNote,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        buyer: { include: { profile: true } },
        seller: { include: { profile: true } },
        orderItems: { include: { product: true } },
      },
    });
    orders.push(order);
  }

  // Clear cart
  await prisma.cartItem.deleteMany({
    where: { id: { in: cartItemIds } },
  });

  return orders;
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      buyer: { include: { profile: true } },
      seller: { include: { profile: true } },
      orderItems: { include: { product: { include: { images: { take: 1 } } } } },
      messages: { include: { sender: { include: { profile: true } } } },
    },
  });
}

export async function getUserOrders(userId: string, role: 'buyer' | 'seller' = 'buyer') {
  return prisma.order.findMany({
    where: role === 'buyer' ? { buyerId: userId } : { sellerId: userId },
    include: {
      buyer: { include: { profile: true } },
      seller: { include: { profile: true } },
      orderItems: { include: { product: { include: { images: { take: 1 } } } } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateOrderStatus(orderId: string, sellerId: string, status: OrderStatus) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order || order.sellerId !== sellerId) {
    throw new Error('Unauthorized');
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      buyer: { include: { profile: true } },
      seller: { include: { profile: true } },
      orderItems: { include: { product: true } },
    },
  });
}
