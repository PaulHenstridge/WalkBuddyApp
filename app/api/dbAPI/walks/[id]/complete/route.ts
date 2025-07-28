import { NextRequest } from 'next/server';

const SPRING_BASE = process.env.SPRING_BASE_URL ?? 'http://localhost:8080';

export async function PATCH(_: NextRequest, { params }: { params: { id: string } }) {
  const walkId = params.id;

  console.log('WOOWOOWOO PATCH ROUTE HIT', walkId);

  try {
    const res = await fetch(`${SPRING_BASE}/walks/${walkId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ error: payload.error || 'Failed to mark walk as complete' }),
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Network error' }), { status: 500 });
  }
}

export async function OPTIONS() {
    return new Response(null, {
      status: 204,
      headers: {
        Allow: 'PATCH, OPTIONS',
      },
    });
  }