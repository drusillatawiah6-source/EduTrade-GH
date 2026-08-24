// services/wishlist.service.ts
import { prisma } from '@/lib/prisma';

export async function addToWishlist(userId: string, productId: string) {
  return prisma.wishlist.upsert({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    create: {
      userId,
      productId,
    },
    update: {},
    include: { product: true },
  });
}

export async function removeFromWishlist(userId: string, productId: string) {
  return prisma.wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}

export async function getWishlistItems(userId: string) {
  return prisma.wishlist.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          images: { take: 1 },
          seller: { include: { profile: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function isInWishlist(userId: string, productId: string) {
  const item = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  return !!item;
}

export async function clearWishlist(userId: string) {
  return prisma.wishlist.deleteMany({
    where: { userId },
  });
}
