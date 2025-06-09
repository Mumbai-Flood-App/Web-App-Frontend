   // src/app/api/proxy-stations/route.ts
   import { NextResponse } from 'next/server';

   export async function GET() {
     const response = await fetch('https://api.mumbaiflood.in/aws/stations/');
     const data = await response.json();
     return NextResponse.json(data);
   }