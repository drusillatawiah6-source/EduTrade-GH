// app/(marketplace)/marketplace/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ghana-green mb-2">
            Marketplace
          </h1>
          <p className="text-muted-foreground">Browse and search school items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Category</label>
                  <select className="w-full border rounded-md p-2">
                    <option>All Categories</option>
                    <option>Textbooks</option>
                    <option>Uniforms</option>
                    <option>Calculators</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Price Range</label>
                  <input type="range" className="w-full" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">School</label>
                  <input type="text" placeholder="Search school" className="w-full border rounded-md p-2" />
                </div>
                <Button className="w-full bg-ghana-green hover:bg-ghana-green/90">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <Card className="text-center py-12">
              <CardContent>
                <h2 className="text-2xl font-bold text-gray-600 mb-4">
                  No products have been listed yet
                </h2>
                <p className="text-gray-500 mb-6">
                  Be the first to upload your school item and help other students find what they need.
                </p>
                <Button className="bg-ghana-green hover:bg-ghana-green/90">
                  List Your First Item
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
