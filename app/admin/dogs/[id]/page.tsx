import React from 'react';

interface dogPageProps {
  params: {
    id: string;
  };
}

export default async function dogPage({ params }: dogPageProps) {
  const { id } = await params;  
  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/dogs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch dog');
  const dog = await res.json();

  console.log('id, dog.--->', id, dog)

  return (
    <div>

      <h1>name: {dog.name}</h1>
      <h1>owner: {dog.owner.name}</h1>
      <p>breed: {dog.breed}</p>
      <p>description: {dog.description}</p>
      <p>notes: {dog.notes}</p>
    </div>
  );
}
