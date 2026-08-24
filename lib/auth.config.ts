// lib/auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/validations/auth';
import { getUserByEmail, verifyPassword } from '@/services/auth.service';

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          return null;
        }

        const user = await getUserByEmail(validatedCredentials.data.email);

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await verifyPassword(
          validatedCredentials.data.password,
          user.password
        );

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
