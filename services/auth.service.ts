// services/auth.service.ts
import { prisma } from '@/lib/prisma';
import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });
}

export async function createUser(email: string, password: string, name?: string) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || email.split('@')[0],
      profile: {
        create: {
          fullName: name,
        },
      },
    },
    include: { profile: true },
  });

  return user;
}

export async function updateUserPassword(userId: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);

  return prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}
