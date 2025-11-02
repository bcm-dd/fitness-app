import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV,
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  };

  try {
    return NextResponse.json(healthcheck, { status: 200 });
  } catch (error) {
    healthcheck.message = 'ERROR';
    return NextResponse.json(healthcheck, { status: 503 });
  }
}
