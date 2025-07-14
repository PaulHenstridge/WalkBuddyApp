import { Dog } from '@/types/dog';
import Link from 'next/link';
import React from 'react'

import PageShell from '@/components/AdminPageShell'



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
      <ul className="space-y-4">
        {dogs.map((dog: any) => (
          <li key={dog.id} className="p-4 border rounded shadow-sm">
            <div className="font-medium">{dog.name} ({dog.breed})</div>
            <div className="text-sm text-gray-600">Age: {dog.age}</div>
            <Link href={`/admin/dogs/${dog.id}`} className="text-blue-600 text-sm">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
export default DogsPage
