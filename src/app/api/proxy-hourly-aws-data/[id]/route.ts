import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').filter(Boolean).pop();
  const response = await fetch(`https://api.mumbaiflood.in/aws/hourly-aws-data/${id}/`);
  const data = await response.json();
  return NextResponse.json(data);
} 