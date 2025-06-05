// app/api/dbAPI/walks/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SPRING_BASE = process.env.SPRING_BASE_URL ?? 'http://localhost:8080';

export async function GET() {
  try {
    const springRes = await fetch(`${SPRING_BASE}/walks`);
    if (!springRes.ok) {
      const text = await springRes.text();
      return NextResponse.json(
        { error: text || 'Failed to load walks' },
        { status: springRes.status }
      );
    }
    const walks = await springRes.json();
    return NextResponse.json(walks);
  } catch (err) {
    console.error('GET /api/dbAPI/walks error', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const springRes = await fetch(`${SPRING_BASE}/walks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!springRes.ok) {
      const text = await springRes.text();
      return NextResponse.json(
        { error: text || 'Failed to create walk' },
        { status: springRes.status }
      );
    }

    const created = await springRes.json();
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/dbAPI/walks error', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
