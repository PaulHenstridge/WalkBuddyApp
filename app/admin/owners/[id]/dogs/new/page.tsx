'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Owner } from '@/types/owner';

type Props = { params: { id: string } }


interface DogForm {
  name: string;
  breed: string;
  description: string;
  notes: string
}

export default  function NewDogPage() {
  const router = useRouter();
  const params = useParams()
  const base = process.env.NEXT_PUBLIC_APP_URL

  const ownerId = params?.id as string;
  console.log('OWNER IDEEEEEE', ownerId)

  const [form, setForm] = useState<DogForm>({ name: '', breed: '' , description:'', notes:''});
  const [errors, setErrors] = useState<Partial<DogForm & { form: string }>>({});
  const [submitting, setSubmitting] = useState(false);

  // Simple client-side validation
  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
        const res = await fetch(`${base}/api/dbAPI/dogs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...form ,ownerId}),
        });

      if (!res.ok) {
        // read validation error from the server
        const payload = await res.json();
        setErrors({ form: payload.error || 'Unexpected server error' });
      } else {
        router.push('/admin/dogs');
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
        <label htmlFor="name" className="block font-medium">Dog Name</label>
        <input
          id="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="mt-1 block w-full border px-2 py-1"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="breed" className="block font-medium">Dog breed</label>
        <input
          id="breed"
          value={form.breed}
          onChange={e => setForm({ ...form, breed: e.target.value })}
          className="mt-1 block w-full border px-2 py-1"
        />
        {errors.breed && <p className="text-red-600 text-sm">{errors.breed}</p>}
      </div>



      <div>
        <label htmlFor="description" className="block font-medium">description</label>
        <input
          id="description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="mt-1 block w-full border px-2 py-1"
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="notes" className="block font-medium">notes</label>
        <input
          id="notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="mt-1 block w-full border px-2 py-1"
        />
        {errors.notes && <p className="text-red-600 text-sm">{errors.notes}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {submitting ? 'Saving…' : 'Create dog'}
      </button>
    </form>
  );
}