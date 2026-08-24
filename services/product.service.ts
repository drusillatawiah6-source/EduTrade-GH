// services/product.service.ts
import { prisma } from '@/lib/prisma';
import { CreateProductInput } from '@/lib/validations/product';
import { Prisma } from '@prisma/client';

export async function createProduct(data: CreateProductInput, userId: string) {
  const slug = data.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return prisma.product.create({
    data: {
      ...data,
      slug: `${slug}-${Date.now()}`,
      userId,
    },
    include: {
      images: true,
      category: true,
      seller: { include: { profile: true } },
    },
  });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      category: true,
      seller: { include: { profile: true } },
      reviews: { include: { reviewer: { include: { profile: true } } } },
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: 'asc' } },
      category: true,
      seller: { include: { profile: true } },
      reviews: { include: { reviewer: { include: { profile: true } } } },
    },
  });
}

export async function getUserProducts(userId: string) {
  return prisma.product.findMany({
    where: { userId },
    include: { images: true, category: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateProduct(
  id: string,
  userId: string,
  data: Partial<CreateProductInput>
) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || product.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return prisma.product.update({
    where: { id },
    data,
    include: { images: true, category: true },
  });
}

export async function deleteProduct(id: string, userId: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || product.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return prisma.product.delete({
    where: { id },
  });
}

export async function getActiveProducts(limit = 20, skip = 0) {
  return prisma.product.findMany({
    where: { status: 'ACTIVE' },
    include: {
      images: { take: 1 },
      category: true,
      seller: { include: { profile: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip,
  });
}

export async function searchProducts(query: string, limit = 20, skip = 0) {
  return prisma.product.findMany({
    where: {
      status: 'ACTIVE',
      OR: [
        { title: { search: query } },
        { description: { search: query } },
      ],
    },
    include: {
      images: { take: 1 },
      category: true,
      seller: { include: { profile: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip,
  });
}
