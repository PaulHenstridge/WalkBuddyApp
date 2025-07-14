import { Location } from '@/types/location';
import Link from 'next/link';
import React from 'react'

import PageShell from '@/components/AdminPageShell'



const LocationsPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/locations`);
  const locations = await res.json();

  // split these into two components - a location viwer, and the link button
  return ( <> 

  <PageShell
  title="Locations"
  actions={
    <Link href="/admin/locations/new" className="text-blue-500 underline">
      Add Location
    </Link>
  }
  >
     <ul className="space-y-4">
        {locations.map((location: any) => (
          <li key={location.id} className="p-4 border rounded shadow-sm">
            <div className="font-medium">{location.name}</div>
            <div className="text-sm text-gray-600"> {location.description}</div>
            <div className="text-sm text-gray-600"> w3w: {location.w3wLocation}</div>
            <Link href={`/admin/locations/${location.id}`} className="text-blue-600 text-sm">
              View Details
            </Link>
          </li>
        ))}
      </ul>

  </PageShell>
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
