import Link from 'next/link';
import React from 'react'
import PageShell from '@/components/AdminPageShell'
import { Owner } from '@/types/owner';
import OwnerCard from '@/components/cards/OwnerCard';

const OwnersPage = async () => {
  const base = process.env.NEXT_PUBLIC_APP_URL
  const res = await fetch(`${base}/api/dbAPI/owners`)
  const owners = await res.json()

  return (
    <PageShell
      title="Owners"
      actions={
        <Link href="/admin/owners/new" className="text-blue-500 underline">
          Add Owner
        </Link>
      }
    >
        {owners.map((owner: Owner) => (
          <OwnerCard key={owner.id} owner={owner}/>
 
        ))}
    </PageShell>
  )
}

export default OwnersPage
