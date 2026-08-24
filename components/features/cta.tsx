// components/features/cta.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-16 px-4 bg-ghana-green">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to get started?
        </h2>
        <p className="text-xl mb-8 text-ghana-green/90">
          Join EduTrade today and start buying and selling school items with ease.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="bg-white text-ghana-green hover:bg-gray-100">
              Create Account
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Browse Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
