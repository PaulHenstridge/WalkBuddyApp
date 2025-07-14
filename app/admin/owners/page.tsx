import Link from 'next/link';
import React from 'react'
import PageShell from '@/components/AdminPageShell'

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
      <ul className="space-y-4">
        {owners.map((owner: any) => (
          <li key={owner.id} className="p-4 border rounded shadow-sm">
            <div className="font-medium">{owner.name}</div>
            <div className="text-sm text-gray-600">{owner.email}</div>
            <div className="text-sm text-gray-600">{owner.phone}</div>
            <Link href={`/admin/owners/${owner.id}`} className="text-blue-600 text-sm">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

export default OwnersPage
