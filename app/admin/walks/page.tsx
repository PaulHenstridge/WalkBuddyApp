import Link from 'next/link';
import React from 'react'

import { Walk } from '@/types/walk';

const WalksPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/walks`);
  const walks = await res.json();

  // split these into two components - a location viwer, and the link button
  return ( <> 
    <div>WalksPage</div>
    <ul>
    {walks.map((walk: Walk) => (
      <li key={walk.id}>{walk.id} {walk.location.name}<Link href={`/admin/walks/${walk.id}`}>View Walk</Link> </li>
    ))}
  </ul>

<Link href='/admin/walks/new ' >Create a new Walk</Link>

  </>
  )
}

export default WalksPage
