import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;              
  const res = await fetch(`http://localhost:8080/walks/${id}`);
  if (!res.ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const walk = await res.json();
  return NextResponse.json(walk);
}
