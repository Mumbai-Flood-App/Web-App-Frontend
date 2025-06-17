import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    const response = await fetch(`https://api.mumbaiflood.in/aws/hourly-aws-data/${id}/`);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response was not JSON');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in hourly AWS data route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hourly AWS data' },
      { status: 500 }
    );
  }
} 