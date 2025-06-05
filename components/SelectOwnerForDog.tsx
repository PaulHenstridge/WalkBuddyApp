// components/SelectOwnerForDog.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Owner } from '@/types/owner';

interface SelectOwnerForDogProps {
  owners: Owner[];
}

export default function SelectOwnerForDog({ owners }: SelectOwnerForDogProps) {
  const router = useRouter();
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | ''>('');

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOwnerId(Number(e.target.value));
  }

  function handleProceed() {
    if (selectedOwnerId !== '') {
      // Redirect to the “new dog for this owner” route
      router.push(`/admin/owners/${selectedOwnerId}/dogs/new`);
    }
  }

  function handleAddOwner() {
    // Redirect to create a new owner
    router.push('/admin/owners/new');
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold">Attach a Dog to an Existing Owner</h2>

      {/* Owner dropdown */}
      <div>
        <label htmlFor="ownerSelect" className="block font-medium">
          Select Owner
        </label>
        <select
          id="ownerSelect"
          value={selectedOwnerId === '' ? '' : String(selectedOwnerId)}
          onChange={handleChange}
          className="mt-1 block w-full border px-2 py-1"
        >
          <option value="">— Choose an owner —</option>
          {owners.map(owner => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={handleProceed}
          disabled={selectedOwnerId === ''}
          className={`
            px-4 py-2 rounded 
            ${selectedOwnerId === '' 
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'}
          `}
        >
          Next: Add Dog for Selected Owner
        </button>

        <button
          type="button"
          onClick={handleAddOwner}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          OR Create New Owner
        </button>
      </div>
    </div>
  );
}
