import { NextRequest } from 'next/server';

const SPRING_BASE = process.env.SPRING_BASE_URL ?? 'http://localhost:8080';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const walkId = params.id;

  try {
    const reportText = await req.text();

    const res = await fetch(`${SPRING_BASE}/walks/${walkId}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: reportText,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ error: errorBody.error || 'Failed to submit walk report' }),
        { status: res.status }
      );
    }

    const walkDTO = await res.json();
    return Response.json(walkDTO);
  } catch (err) {
    console.error('[POST] /walks/[id]/report error:', err);
    return new Response(JSON.stringify({ error: 'Network error' }), { status: 500 });
  }
}
