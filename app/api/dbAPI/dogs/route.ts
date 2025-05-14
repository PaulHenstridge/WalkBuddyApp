import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('http://localhost:8080/dogs');
  const dogs = await res.json();
  return NextResponse.json(dogs);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  await fetch('http://localhost:8080/dogs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data),
  });
  return NextResponse.json({ ok: true });
}
