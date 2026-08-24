// components/features/how-it-works.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Search, MessageSquare, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'List Your Item',
    description: 'Upload photos and details about your school item',
  },
  {
    icon: Search,
    title: 'Browse & Search',
    description: 'Find exactly what you need with our powerful search',
  },
  {
    icon: MessageSquare,
    title: 'Connect',
    description: 'Chat with buyers and sellers directly on the platform',
  },
  {
    icon: CheckCircle,
    title: 'Complete Trade',
    description: 'Arrange pickup or delivery and complete your transaction',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-ghana-green">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Four simple steps to get started
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className="w-8 h-8 text-ghana-green" />
                    <span className="text-2xl font-bold text-ghana-gold">{index + 1}</span>
                  </div>
                  <CardTitle className="mt-4">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
