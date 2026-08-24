// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getActiveProducts, searchProducts } from '@/services/product.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const skip = (page - 1) * limit;

    let products;
    if (query) {
      products = await searchProducts(query, limit, skip);
    } else {
      products = await getActiveProducts(limit, skip);
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
