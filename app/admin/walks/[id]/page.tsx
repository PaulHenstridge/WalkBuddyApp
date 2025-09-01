import React from 'react';
import Link from 'next/link';
import { Dog } from '@/types/dog';
import PostWalkOptions from '@/components/PostWalkOptions';

interface WalkPageProps {
  params: {
    id: string;
  };
}

export default async function WalkPage({ params }: WalkPageProps) {
  const { id } = await params;  
  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/walks/${id}`);
  if (!res.ok) throw new Error('Failed to fetch walk');
  const walk = await res.json();

  console.log('returned walk', walk)


  return (<>
      <div>
      <h1>id: {walk.id}</h1>
      <p>Location: {walk.locationName}</p>
      <p>time: {walk.dateTime}</p>

      <h3>Walk {walk.id}'s dogs</h3>
      {walk.dogs.map( (dog: Dog) => (<div key={dog.id}> 
        <p >{dog.name}</p>
        <Link href={`/admin/dogs/${dog.id}`}>View Dog</Link> 
      </div>
      ))}
      <h4>Walk Report: {walk.report}</h4>

    </div>

    <PostWalkOptions walkId={walk.id} isComplete={walk.complete}/>

  </>

  );
}