// components/features/hero.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-ghana-green/10 to-ghana-gold/10"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-ghana-green mb-6">
          Buy & Sell School Items
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the easiest way to buy and sell textbooks, uniforms, calculators, and everything you need for school across Ghana.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Link href="/marketplace">
            <Button size="lg" className="bg-ghana-green hover:bg-ghana-green/90">
              Browse Marketplace
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">
              Start Selling
            </Button>
          </Link>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 bg-white rounded-lg shadow-lg p-2">
            <input
              type="text"
              placeholder="Search for textbooks, uniforms, calculators..."
              className="flex-1 px-4 py-3 outline-none"
            />
            <Button size="lg" className="bg-ghana-green hover:bg-ghana-green/90">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
