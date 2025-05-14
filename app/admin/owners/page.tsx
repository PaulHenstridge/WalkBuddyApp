import Link from 'next/link';
import React from 'react'


const OwnersPage = async () => {

  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/owners`);
  const owners = await res.json();

  // split these into two components - a location viwer, and the link button
  return ( <> 
    <div>OwnersPage</div>
    <ul>
    {owners.map((owner: any) => (
      <li key={owner.id}>{owner.name} <Link href={`/admin/owners/${owner.id}`}>View Owner</Link> </li>
    ))}
  </ul>

<Link href='/admin/owners/new ' >Add a new owner</Link>

  </>
  )
}

export default OwnersPage
