import React from 'react';

interface OwnerPageProps {
  params: {
    id: string;
  };
}

export default async function OwnerPage({ params }: OwnerPageProps) {
  const { id } = params;  
  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/owners/${id}`);
  if (!res.ok) throw new Error('Failed to fetch Owner');
  const owner = await res.json();
  console.log('OWNER--->', owner)

  return (
    <div>
      <h1>name: {owner.name}</h1>
      <p>address: {owner.contactDetails.address}</p>
      <p>phone: {owner.contactDetails.phoneNumber}</p>
      <p>email: {owner.contactDetails.email}</p>
      <p>notes: {owner.notes}</p>
    </div>
  );
}