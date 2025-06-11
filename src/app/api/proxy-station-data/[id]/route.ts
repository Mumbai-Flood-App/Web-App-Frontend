import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`https://api.mumbaiflood.in/aws/stations/${params.id}/`);
  const data = await response.json();
  return NextResponse.json(data);
} 