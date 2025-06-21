import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const station = searchParams.get('station');
    
    if (!station) {
      return NextResponse.json({ error: 'station parameter is required' }, { status: 400 });
    }
    
    // Fetch from the existing backend endpoint
    const response = await fetch(`https://api.mumbaiflood.in/db/daywiseprediction/latest-three/?station=${station}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching latest three predictions:', error);
    return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
  }
} 