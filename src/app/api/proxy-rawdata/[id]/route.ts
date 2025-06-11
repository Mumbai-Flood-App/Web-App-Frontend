import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const response = await fetch(`https://api.mumbaiflood.in/aws/stations/${params.id}/rawdata/`);
  const data = await response.json();
  return NextResponse.json(data);
} 