import { NextResponse } from 'next/server';
import { fetchDashboardData } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'London';

  try {
    const data = await fetchDashboardData(city);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}