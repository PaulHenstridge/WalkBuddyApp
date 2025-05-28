import { Dog } from '@/types/dog';
import Link from 'next/link';
import React from 'react'


const DogsPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/dogs`);
  const dogs = await res.json();
  console.log('dogs received:', dogs)

  // split these into two components - a location viwer, and the link button
  return ( <> 
    <div>DogsPage</div>
    
  <ul>
    {dogs.map((dog: Dog) => (
      <li key={dog.id}>
        <Link href={`/admin/dogs/${dog.id}`}>{dog.name}</Link>
      </li>
    ))}
  </ul>
  

<Link href='/admin/dogs/new ' >Add a new dog</Link>

  </>
  )
}

export default DogsPage
