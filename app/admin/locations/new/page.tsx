'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface LocationForm {
  name: string;
  w3wLocation: string;
}

export default function NewLocationPage() {
  const router = useRouter();
  const [form, setForm] = useState<LocationForm>({ name: '', w3wLocation: '' });
  const [errors, setErrors] = useState<Partial<LocationForm & { form: string }>>({});
  const [submitting, setSubmitting] = useState(false);

  // Simple client-side validation
  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.w3wLocation.trim()) newErrors.w3wLocation = 'w3wLocation is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
        const base = process.env.NEXT_PUBLIC_APP_URL
        const res = await fetch(`${base}/api/dbAPI/locations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

      if (!res.ok) {
        // read validation error from the server
        const payload = await res.json();
        setErrors({ form: payload.error || 'Unexpected server error' });
      } else {
        router.push('/admin/locations');
      }
    } catch (err) {
      setErrors({ form: 'Network error, please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errors.form && <p className="text-red-600">{errors.form}</p>}

      <div>
        <label htmlFor="name" className="block font-medium">Location Name</label>
        <input
          id="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="mt-1 block w-full border px-2 py-1"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="w3wLocation" className="block font-medium">w3wLocation</label>
        <input
          id="w3wLocation"
          value={form.w3wLocation}
          onChange={e => setForm({ ...form, w3wLocation: e.target.value })}
          className="mt-1 block w-full border px-2 py-1"
        />
        {errors.w3wLocation && <p className="text-red-600 text-sm">{errors.w3wLocation}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {submitting ? 'Saving…' : 'Create Location'}
      </button>
    </form>
  );
}
