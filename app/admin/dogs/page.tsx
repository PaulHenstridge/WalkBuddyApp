import { Dog } from '@/types/dog';
import Link from 'next/link';
import React from 'react'

import PageShell from '@/components/AdminPageShell'
import DogCard from '@/components/cards/DogCard';



const DogsPage = async () => {
  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/dogs`)
  const dogs = await res.json()

  return (
    <PageShell
      title="Dogs"
      actions={
        <Link href="/admin/dogs/new" className="text-blue-500 underline">
          Add Dog
        </Link>
      }
    >
  
        {dogs.map((dog: any) => (
           <DogCard key={dog.id} dog={dog} />
        ))}

    </PageShell>
  )
}
export default DogsPage
