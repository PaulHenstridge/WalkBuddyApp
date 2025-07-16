import { Location } from '@/types/location';
import Link from 'next/link';
import React from 'react'

import PageShell from '@/components/AdminPageShell'
import LocationCard from '@/components/cards/LocationCard';



const LocationsPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/locations`);
  const locations = await res.json();

  return ( 

  <PageShell
    title="Locations"
    actions={
        <Link href="/admin/locations/new" className="text-blue-500 underline">
          Add Location
        </Link>
       }
  >
        {locations.map((location: Location) => (
          <LocationCard key={location.id} location={location}/>
        ))}

  </PageShell>
  )
}

export default LocationsPage
