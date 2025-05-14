import { Location } from '@/app/types/location';
import Link from 'next/link';
import React from 'react'


const LocationsPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/locations`);
  const locations = await res.json();

  // split these into two components - a location viwer, and the link button
  return ( <> 
    <div>LocationsPage</div>
    <ul>
    {locations.map((loc: Location) => (
      <li key={loc.id}>{loc.name} <Link href={`/admin/locations/${loc.id}`}>View Location</Link> </li>
    ))}
  </ul>

<Link href='/admin/locations/new ' >Add a new Location</Link>

  </>
  )
}

export default LocationsPage
