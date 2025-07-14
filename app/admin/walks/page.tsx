import Link from 'next/link';
import React from 'react'

import { Walk } from '@/types/walk';

import PageShell from '@/components/AdminPageShell'


const WalksPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/walks`);
  const walks = await res.json();

  // split these into two components - a location viwer, and the link button
  return ( <PageShell
  title="Walks"
  actions={
    <Link href="/admin/walks/new" className="text-blue-500 underline">
      Create a new Walk
    </Link>
  }
  > 

    <ul>
    {walks.map((walk: Walk) => (
      <li key={walk.id}>{walk.id} {walk.location.name}<Link href={`/admin/walks/${walk.id}`}>View Walk</Link> </li>
    ))}
  </ul>


  </PageShell>
  )
}

export default WalksPage
