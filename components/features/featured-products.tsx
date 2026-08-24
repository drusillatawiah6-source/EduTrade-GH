// components/features/featured-products.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-ghana-green">
          No products have been listed yet
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Be the first to upload your school item and start earning!
        </p>
        <div className="flex justify-center">
          <Card className="max-w-md text-center">
            <CardHeader>
              <CardTitle>Ready to sell?</CardTitle>
              <CardDescription>
                Join thousands of students and parents selling school items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Upload photos, set your price, and start earning money from items you no longer need.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
