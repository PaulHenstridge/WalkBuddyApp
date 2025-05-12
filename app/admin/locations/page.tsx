import Link from 'next/link';
import React from 'react'

console.log('BASE URL →', process.env.NEXT_PUBLIC_APP_URL);

const LocationsPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/locations`);
  const locations = await res.json();

  // split these into two components - a location viwer, and the link button
  return ( <> 
    <div>LocationsPage</div>
    <ul>
    {locations.map((loc: any) => (
      <li key={loc.id}>{loc.name}</li>
    ))}
  </ul>

<Link href='/admin/locations/new ' >Add a new Location</Link>

  </>
  )
}

export default LocationsPage
