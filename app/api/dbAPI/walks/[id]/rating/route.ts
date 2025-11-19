import { NextRequest } from 'next/server';

const SPRING_BASE = process.env.SPRING_BASE_URL ?? 'http://localhost:8080';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const walkId = await params.id;

  try {
    // 1️⃣ Read the JSON body (this will be a simple string like "GREAT")
    const ratingValue = await req.json();
    console.log("ratingValue in rating route:", ratingValue)

    // 2️⃣ Forward it to Spring
    const res = await fetch(`${SPRING_BASE}/walks/${walkId}/rating`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ratingValue), // send as JSON string literal
    });

    // 3️⃣ Handle errors
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ error: errorBody.error || 'Failed to submit walk rating' }),
        { status: res.status }
      );
    }

    // 4️⃣ Return success to client
    const walkDTO = await res.json();
    console.log('response in rating route', walkDTO)

    return Response.json(walkDTO);
  } catch (err) {
    console.error('[POST] /walks/[id]/rating error:', err);
    return new Response(JSON.stringify({ error: 'Network error' }), { status: 500 });
  }
}
