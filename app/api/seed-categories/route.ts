// app/api/seed-categories/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const categories = [
  { name: 'School Uniforms', slug: 'school-uniforms', icon: '👕' },
  { name: 'House Wear', slug: 'house-wear', icon: '👗' },
  { name: 'PE Kits', slug: 'pe-kits', icon: '⚽' },
  { name: 'Shoes', slug: 'shoes', icon: '👞' },
  { name: 'Sandals', slug: 'sandals', icon: '🩴' },
  { name: 'School Bags', slug: 'school-bags', icon: '🎒' },
  { name: 'Textbooks', slug: 'textbooks', icon: '📚' },
  { name: 'Exercise Books', slug: 'exercise-books', icon: '📓' },
  { name: 'Past Questions', slug: 'past-questions', icon: '📄' },
  { name: 'Scientific Calculators', slug: 'scientific-calculators', icon: '🧮' },
  { name: 'Graphic Calculators', slug: 'graphic-calculators', icon: '📊' },
  { name: 'Laptops', slug: 'laptops', icon: '💻' },
  { name: 'Tablets', slug: 'tablets', icon: '📱' },
  { name: 'Printers', slug: 'printers', icon: '🖨️' },
  { name: 'Stationery', slug: 'stationery', icon: '✏️' },
  { name: 'Art Supplies', slug: 'art-supplies', icon: '🎨' },
  { name: 'Musical Instruments', slug: 'musical-instruments', icon: '🎸' },
  { name: 'Hostel Items', slug: 'hostel-items', icon: '🛏️' },
  { name: 'Sports Equipment', slug: 'sports-equipment', icon: '🏃' },
  { name: 'Laboratory Coats', slug: 'laboratory-coats', icon: '🥼' },
  { name: 'Other', slug: 'other', icon: '📦' },
];

export async function POST() {
  try {
    for (let i = 0; i < categories.length; i++) {
      await prisma.category.upsert({
        where: { slug: categories[i].slug },
        update: {},
        create: {
          name: categories[i].name,
          slug: categories[i].slug,
          icon: categories[i].icon,
          order: i,
          isActive: true,
        },
      });
    }

    return NextResponse.json({ message: 'Categories seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed categories' }, { status: 500 });
  }
}
