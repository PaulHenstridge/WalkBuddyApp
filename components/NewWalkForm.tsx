
'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Location } from '@/types/location';
import { Dog } from '@/types/dog';

interface NewWalkRequest {
  dateTime:  string;    // "YYYY-MM-DDTHH:mm:00"
  locationId:number;
  dogIds:    number[];
}

interface NewWalkFormProps {
  locations: Location[];
  dogs:      Dog[];
}

export default function NewWalkForm({ locations, dogs }: NewWalkFormProps) {
  const router = useRouter();

  // --- Form state ---
  const [dateTimeLocal, setDateTimeLocal]           = useState<string>('');
  const [selectedLocationId, setSelectedLocationId] = useState<number | ''>('');
  const [selectedDogIds, setSelectedDogIds]         = useState<number[]>([]);
  const [error, setError]                           = useState<string>('');
  const [submitting, setSubmitting]                 = useState<boolean>(false);

  // The browser's <input type="datetime-local" /> gives "YYYY-MM-DDTHH:mm",
  // append ":00" so Spring can parse it as LocalDateTime.
  function formatForSpring(dtLocal: string): string {
    return dtLocal.endsWith(':00') ? dtLocal : dtLocal + ':00';
  }

  // Simple validation before sending:
  function validateForm(): boolean {
    const missing: string[] = [];
    if (!dateTimeLocal)            missing.push('Date & Time');
    if (selectedLocationId === '') missing.push('Location');
    if (selectedDogIds.length === 0) missing.push('At least one Dog');

    if (missing.length > 0) {
      setError(`Please provide: ${missing.join(', ')}.`);
      return false;
    }
    return true;
  }

  // Toggle a dog ID in the selected list
  function toggleDog(dogId: number) {
    setSelectedDogIds(prev =>
      prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]
    );
  }

  // Once the user submits, build a NewWalkRequest and POST to our Next API route:
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    const payload: NewWalkRequest = {
      dateTime:  formatForSpring(dateTimeLocal),
      locationId:selectedLocationId as number,
      dogIds:    selectedDogIds,
    };

    setSubmitting(true);

    try {
      const res = await fetch('/api/dbAPI/walks', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || `Server returned ${res.status}`);
      } else {
        // On success, redirect back to the walks list 
        router.push('/admin/walks');
      }
    } catch {
      setError('Network error, please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 max-w-lg mx-auto">
      {error && <p className="text-red-600">{error}</p>}

      {/* Date & Time Picker */}
      <div>
        <label htmlFor="walkDateTime" className="block font-medium">
          Date &amp; Time
        </label>
        <input
          id="walkDateTime"
          type="datetime-local"
          value={dateTimeLocal}
          onChange={e => setDateTimeLocal(e.target.value)}
          className="mt-1 block w-full border px-2 py-1"
        />
      </div>

      {/* Location Dropdown */}
      <div>
        <label htmlFor="locationSelect" className="block font-medium">
          Location
        </label>
        <select
          id="locationSelect"
          value={selectedLocationId === '' ? '' : String(selectedLocationId)}
          onChange={e => setSelectedLocationId(Number(e.target.value))}
          className="mt-1 block w-full border px-2 py-1"
        >
          <option value="">— Choose a location —</option>
          {locations.map(loc => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dogs Multi‐Select */}
      <div>
        <p className="block font-medium">Dogs</p>
        <div className="mt-1 space-y-2">
          {dogs.map(d => (
            <label key={d.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDogIds.includes(d.id)}
                onChange={() => toggleDog(d.id)}
                className="mr-2"
              />
              {d.name} ({d.breed})
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {submitting ? 'Saving…' : 'Create Walk'}
      </button>
    </form>
  );
}
