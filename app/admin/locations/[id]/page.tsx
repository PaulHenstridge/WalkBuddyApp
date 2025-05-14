import React from 'react';

interface LocationPageProps {
  params: {
    id: string;
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { id } = params;  
  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/locations/${id}`);
  if (!res.ok) throw new Error('Failed to fetch location');
  const location = await res.json();

  return (
    <div>
      <h1>name: {location.name}</h1>
      <p>w3wLocation: {location.w3wLocation}</p>
      <p>description: {location.description}</p>
      <p>notes: {location.notes}</p>
    </div>
  );
}
