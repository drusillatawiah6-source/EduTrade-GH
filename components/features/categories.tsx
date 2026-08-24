// components/features/categories.tsx
'use client';

import Link from 'next/link';
import { BookOpen, Shirt, Trophy, Footprints, Backpack, Calculator, Laptop, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  { name: 'Textbooks', icon: BookOpen, color: 'text-blue-600' },
  { name: 'Uniforms', icon: Shirt, color: 'text-purple-600' },
  { name: 'PE Kits', icon: Trophy, color: 'text-red-600' },
  { name: 'Shoes', icon: Footprints, color: 'text-yellow-600' },
  { name: 'School Bags', icon: Backpack, color: 'text-green-600' },
  { name: 'Calculators', icon: Calculator, color: 'text-indigo-600' },
  { name: 'Laptops', icon: Laptop, color: 'text-cyan-600' },
  { name: 'Art Supplies', icon: Palette, color: 'text-pink-600' },
];

export function Categories() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-ghana-green">
          Shop by Category
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Browse items from our most popular categories
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={`/marketplace?category=${category.name.toLowerCase()}`}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <Icon className={`w-12 h-12 ${category.color} mb-4`} />
                    <p className="font-semibold text-center text-sm">{category.name}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
