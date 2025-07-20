'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Owner } from '@/types/owner';
import styles from './SelectOwnerForDog.module.css';

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
      router.push(`/admin/owners/${selectedOwnerId}/dogs/new`);
    }
  }

  function handleAddOwner() {
    router.push('/admin/owners/new');
  }

  const isDisabled = selectedOwnerId === '';

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Attach a Dog to an Existing Owner</h2>

      <div>
        <label htmlFor="ownerSelect" className={styles.label}>
          Select Owner
        </label>
        <select
          id="ownerSelect"
          value={isDisabled ? '' : String(selectedOwnerId)}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">— Choose an owner —</option>
          {owners.map(owner => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.buttonRow}>
        <button
          type="button"
          onClick={handleProceed}
          disabled={isDisabled}
          className={`${styles.button} ${styles.buttonNext} ${isDisabled ? styles.disabled : ''}`}
        >
          Next: Add Dog for Selected Owner
        </button>

        <button
          type="button"
          onClick={handleAddOwner}
          className={`${styles.button} ${styles.buttonAlt}`}
        >
          OR Create New Owner
        </button>
      </div>
    </div>
  );
}
