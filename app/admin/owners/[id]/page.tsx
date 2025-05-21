import React from 'react';
import Link from 'next/link';
import { Dog } from '@/types/dog';

interface OwnerPageProps {
  params: {
    id: string;
  };
}

export default async function OwnerPage({ params }: OwnerPageProps) {
  const { id } = await params;  
  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/owners/${id}`);
  if (!res.ok) throw new Error('Failed to fetch Owner');
  const owner = await res.json();
  console.log('OWNER--->', owner)

  return (<>
      <div>
      <h1>name: {owner.name}</h1>
      <p>address: {owner.contactDetails.address}</p>
      <p>phone: {owner.contactDetails.phoneNumber}</p>
      <p>email: {owner.contactDetails.email}</p>
      <p>notes: {owner.notes}</p>

      <h3>{owner.name}'s dogs</h3>
      {owner.dogs.map( (dog: Dog) => (<> 
        <p>{dog.name}</p>
        <Link href={`/admin/dogs/${dog.id}`}>View Dog</Link> 
      </>
      
      ))}
    </div>

    <Link
      href={`/admin/owners/${id}/dogs/new`}>
      Add Dog for {owner.name}
    </Link>
  </>

  );
}