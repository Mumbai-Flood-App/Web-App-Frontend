import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    
    console.log('Making request to:', `https://api.mumbaiflood.in/aws/stations/${id}/hourly-aws-data/`);
    
    const response = await fetch(`https://api.mumbaiflood.in/aws/stations/${id}/hourly-aws-data/`);
    
    // Log response status and headers
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    // Get the raw text first
    const rawText = await response.text();
    console.log('Raw response text:', rawText);
    
    // Try to parse as JSON
    try {
      const data = JSON.parse(rawText);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      console.error('Raw response was:', rawText);
      return NextResponse.json(
        { error: 'Invalid JSON response from server', details: rawText.substring(0, 200) },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in proxy-hourly-aws-data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hourly AWS data', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
} 