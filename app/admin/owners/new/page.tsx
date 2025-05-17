'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ContactDetails } from '@/types/contactDetails';
import { Dog } from '@/types/dog';

interface OwnerForm {
  name: string;
  contactDetails: ContactDetails;
  description?: string;
  dogs: Dog[]
  notes?: string
}

export default function NewOwnerPage() {

    const initialForm: OwnerForm = {
        name: '',
        contactDetails: {
          address: '',
          phoneNumber: '',
          email: '',
        },
        description: '',
        dogs: [],      
        notes: '',
      }

  const router = useRouter();
  const [form, setForm] = useState<OwnerForm>(initialForm);
  const [errors, setErrors] = useState<Partial<OwnerForm & { form: string }>>({});

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
    console.log('Submitting owner:', form)


    try {
        const base = process.env.NEXT_PUBLIC_APP_URL
        const res = await fetch(`${base}/api/dbAPI/owners`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

      if (!res.ok) {
        // read validation error from the server
        const payload = await res.json();
        setErrors({ form: payload.error || 'Unexpected server error' });
      } else {
        router.push('/admin/owners');
      }
    } catch (err) {
      setErrors({ form: 'Network error, please try again.' });
    } finally {
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form && <p className="text-red-600">{errors.form}</p>}

        <div>
            <label htmlFor="name" className="block font-medium">Owner Name</label>
            <input
            id="name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full border px-2 py-1"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        

        <div>
            <label htmlFor="address" className="block font-medium">Address</label>
            <input
            id="address"
            value={form.contactDetails.address}
            onChange={e => setForm({
                ...form,
                contactDetails: {
                ...form.contactDetails,
                address: e.target.value,     // overwriting the address
                },
            })}
            className="mt-1 block w-full border px-2 py-1"
            />
            {errors.contactDetails?.address && (
                <p className="text-red-600 text-sm">
                    {errors.contactDetails.address}
                </p>
            )}      
        </div>

        <div>
            <label htmlFor="phoneNumber" className="block font-medium">Phone Number</label>
            <input
                id="phoneNumber"
                type="tel"
                value={form.contactDetails.phoneNumber}
                onChange={e => setForm({
                ...form,
                contactDetails: {
                    ...form.contactDetails,
                    phoneNumber: e.target.value,     // overwriting the phoneNumber
                },
                })}
                className="mt-1 block w-full border px-2 py-1"
            />
            {errors.contactDetails?.phoneNumber && (
                <p className="text-red-600 text-sm">
                {errors.contactDetails.phoneNumber}
                </p>
            )}
            </div>

            <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
                id="email"
                type="email"
                value={form.contactDetails.email}
                onChange={e => setForm({
                ...form,
                contactDetails: {
                    ...form.contactDetails,
                    email: e.target.value,           // overwriting the email
                },
                })}
                className="mt-1 block w-full border px-2 py-1"
            />
            {errors.contactDetails?.email && (
                <p className="text-red-600 text-sm">
                {errors.contactDetails.email}
                </p>
            )}
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
            className="px-4 py-2 bg-blue-600 text-white rounded"
        > Add new Owner
        </button>
    </form>
  );
}