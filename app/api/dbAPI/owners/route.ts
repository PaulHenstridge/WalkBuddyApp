// app/api/dbAPI/owners/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SPRING_BASE = process.env.SPRING_BASE_URL ?? 'http://localhost:8080';

export async function GET() {
  try {
    const springRes = await fetch(`${SPRING_BASE}/owners`);
    if (!springRes.ok) {
      const text = await springRes.text();
      return NextResponse.json(
        { error: text || 'Failed to load owners' },
        { status: springRes.status }
      );
    }
    const owners = await springRes.json();
    return NextResponse.json(owners);
  } catch (err) {
    console.error('GET /api/dbAPI/owners error', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const springRes = await fetch(`${SPRING_BASE}/owners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!springRes.ok) {
      const text = await springRes.text();
      return NextResponse.json(
        { error: text || 'Failed to create owner' },
        { status: springRes.status }
      );
    }

    const created = await springRes.json();
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/dbAPI/owners error', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
