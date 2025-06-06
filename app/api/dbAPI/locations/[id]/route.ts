import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;              
  const res = await fetch(`http://localhost:8080/locations/${id}`);
  if (!res.ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const location = await res.json();
  return NextResponse.json(location);
}
