import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    
    const response = await fetch(`https://api.mumbaiflood.in/aws/stations/${id}/hourly-aws-data/`);
    
    // Log response status and headers
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Expected JSON, got:', text);
      return NextResponse.json(
        { error: 'Upstream returned non-JSON response' },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxy-hourly-aws-data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hourly AWS data' },
      { status: 500 }
    );
  }
} 