// services/message.service.ts
import { prisma } from '@/lib/prisma';

export async function createMessage(
  orderId: string,
  senderId: string,
  content: string
) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order || (order.buyerId !== senderId && order.sellerId !== senderId)) {
    throw new Error('Unauthorized');
  }

  return prisma.message.create({
    data: {
      orderId,
      senderId,
      content,
    },
    include: {
      sender: { include: { profile: true } },
    },
  });
}

export async function getOrderMessages(orderId: string, userId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order || (order.buyerId !== userId && order.sellerId !== userId)) {
    throw new Error('Unauthorized');
  }

  return prisma.message.findMany({
    where: { orderId },
    include: {
      sender: { include: { profile: true } },
    },
    orderBy: { createdAt: 'asc' },
  });
}

export async function getConversations(userId: string) {
  return prisma.order.findMany({
    where: {
      OR: [
        { buyerId: userId },
        { sellerId: userId },
      ],
    },
    include: {
      buyer: { include: { profile: true } },
      seller: { include: { profile: true } },
      messages: {
        take: 1,
        orderBy: { createdAt: 'desc' },
        include: { sender: { include: { profile: true } } },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });
}
