// services/cart.service.ts
import { prisma } from '@/lib/prisma';

export async function addToCart(userId: string, productId: string, quantity: number) {
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
      include: { product: true },
    });
  }

  return prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
    },
    include: { product: true },
  });
}

export async function getCartItems(userId: string) {
  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          images: { take: 1 },
          seller: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateCartItem(userId: string, cartItemId: string, quantity: number) {
  const item = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!item || item.userId !== userId) {
    throw new Error('Unauthorized');
  }

  if (quantity <= 0) {
    return prisma.cartItem.delete({ where: { id: cartItemId } });
  }

  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: { product: true },
  });
}

export async function removeFromCart(userId: string, cartItemId: string) {
  const item = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!item || item.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return prisma.cartItem.delete({ where: { id: cartItemId } });
}

export async function clearCart(userId: string) {
  return prisma.cartItem.deleteMany({
    where: { userId },
  });
}

export async function saveForLater(userId: string, cartItemId: string) {
  const item = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!item || item.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { savedForLater: true },
    include: { product: true },
  });
}

export async function getSavedItems(userId: string) {
  return prisma.cartItem.findMany({
    where: { userId, savedForLater: true },
    include: {
      product: {
        include: {
          images: { take: 1 },
          seller: true,
        },
      },
    },
  });
}
