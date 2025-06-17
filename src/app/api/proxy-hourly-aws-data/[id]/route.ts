import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    
    console.log('Fetching from:', `https://api.mumbaiflood.in/aws/hourly-aws-data/${id}/`);
    
    const response = await fetch(`https://api.mumbaiflood.in/aws/hourly-aws-data/${id}/`);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const text = await response.text();
      console.error('Error response:', text);
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching hourly AWS data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hourly AWS data', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
} 