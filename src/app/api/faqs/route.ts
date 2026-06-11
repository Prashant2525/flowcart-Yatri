import { NextResponse } from 'next/server';
import { faqs } from '@/data/faqs';
import { MOCK_API_DELAY } from '@/lib/constants';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

  return NextResponse.json({ faqs });
}
