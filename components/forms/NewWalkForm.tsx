'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Location } from '@/types/location';
import { Dog } from '@/types/dog';
import styles from './NewWalkForm.module.css';

interface NewWalkRequest {
  dateTime: string;
  locationId: number;
  dogIds: number[];
}

interface NewWalkFormProps {
  locations: Location[];
  dogs: Dog[];
}

export default function NewWalkForm({ locations, dogs }: NewWalkFormProps) {
  const router = useRouter();

  const [dateTimeLocal, setDateTimeLocal] = useState<string>('');
  const [selectedLocationId, setSelectedLocationId] = useState<number | ''>('');
  const [selectedDogIds, setSelectedDogIds] = useState<number[]>([]);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  function formatForSpring(dtLocal: string): string {
    return dtLocal.endsWith(':00') ? dtLocal : dtLocal + ':00';
  }

  function validateForm(): boolean {
    const missing: string[] = [];
    if (!dateTimeLocal) missing.push('Date & Time');
    if (selectedLocationId === '') missing.push('Location');
    if (selectedDogIds.length === 0) missing.push('At least one Dog');

    if (missing.length > 0) {
      setError(`Please provide: ${missing.join(', ')}.`);
      return false;
    }
    return true;
  }

  function toggleDog(dogId: number) {
    setSelectedDogIds(prev =>
      prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    const payload: NewWalkRequest = {
      dateTime: formatForSpring(dateTimeLocal),
      locationId: selectedLocationId as number,
      dogIds: selectedDogIds,
    };

    setSubmitting(true);

    try {
      const res = await fetch('/api/dbAPI/walks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || `Server returned ${res.status}`);
      } else {
        router.push('/admin/walks');
      }
    } catch {
      setError('Network error, please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}

      <div>
        <label htmlFor="walkDateTime" className={styles.label}>Date &amp; Time</label>
        <input
          id="walkDateTime"
          type="datetime-local"
          value={dateTimeLocal}
          onChange={e => setDateTimeLocal(e.target.value)}
          className={styles.input}
        />
      </div>

      <div>
        <label htmlFor="locationSelect" className={styles.label}>Location</label>
        <select
          id="locationSelect"
          value={selectedLocationId === '' ? '' : String(selectedLocationId)}
          onChange={e => setSelectedLocationId(Number(e.target.value))}
          className={styles.select}
        >
          <option value="">— Choose a location —</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className={styles.label}>Dogs</p>
        <div>
          {dogs.map(d => (
            <label key={d.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedDogIds.includes(d.id)}
                onChange={() => toggleDog(d.id)}
                className={styles.checkbox}
              />
              {d.name} ({d.breed})
            </label>
          ))}
        </div>
      </div>

      <button type="submit" disabled={submitting} className={styles.button}>
        {submitting ? 'Saving…' : 'Create Walk'}
      </button>
    </form>
  );
}
