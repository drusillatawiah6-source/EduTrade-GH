// app/page.tsx
import { Metadata } from 'next';
import { Hero } from '@/components/features/hero';
import { Categories } from '@/components/features/categories';
import { FeaturedProducts } from '@/components/features/featured-products';
import { HowItWorks } from '@/components/features/how-it-works';
import { CTA } from '@/components/features/cta';

export const metadata: Metadata = {
  title: 'EduTrade GH - Buy & Sell School Items in Ghana',
  description: 'Buy and sell school uniforms, textbooks, calculators, and more on Ghana\'s leading educational marketplace.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <CTA />
    </>
  );
}
