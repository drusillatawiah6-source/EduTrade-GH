// app/api/products/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createProduct } from '@/services/product.service';
import { createProductSchema } from '@/lib/validations/product';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const validatedData = createProductSchema.parse(data);

    const product = await createProduct(validatedData, session.user.id);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
