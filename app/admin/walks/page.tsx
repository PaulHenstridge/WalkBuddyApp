import Link from 'next/link';
import React from 'react'

import { Walk } from '@/types/walk';

import PageShell from '@/components/AdminPageShell'
import WalkCard from '@/components/cards/WalkCard';


const WalksPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/walks`);
  const walks = await res.json();



 
  return ( <PageShell
  title="Walks"
  actions={
    <Link href="/admin/walks/new" className="text-blue-500 underline">
      Create a new Walk
    </Link>
  }
  > 

    {walks.map((walk: Walk) => (
      <WalkCard key={walk.id} walk={walk}/>
    ))}


  </PageShell>
  )
}

export default WalksPage
