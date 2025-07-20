'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ContactDetails } from '@/types/contactDetails';
import { Dog } from '@/types/dog';
import styles from './NewOwnerForm.module.css';

interface OwnerForm {
  name: string;
  contactDetails: ContactDetails;
  description?: string;
  dogs: Dog[];
  notes?: string;
}

export default function NewOwnerForm() {
  const router = useRouter();

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
  };

  const [form, setForm] = useState<OwnerForm>(initialForm);
  const [errors, setErrors] = useState<Partial<OwnerForm & { form: string }>>({});
  const base = process.env.NEXT_PUBLIC_APP_URL;

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${base}/api/dbAPI/owners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setErrors({ form: payload.error || 'Unexpected server error' });
      } else {
        router.push('/admin/owners');
      }
    } catch {
      setErrors({ form: 'Network error, please try again.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      {errors.form && <p className={styles.error}>{errors.form}</p>}

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Owner Name</label>
        <input
          id="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="address" className={styles.label}>Address</label>
        <input
          id="address"
          value={form.contactDetails.address}
          onChange={e =>
            setForm({
              ...form,
              contactDetails: {
                ...form.contactDetails,
                address: e.target.value,
              },
            })
          }
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phoneNumber" className={styles.label}>Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          value={form.contactDetails.phoneNumber}
          onChange={e =>
            setForm({
              ...form,
              contactDetails: {
                ...form.contactDetails,
                phoneNumber: e.target.value,
              },
            })
          }
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          type="email"
          value={form.contactDetails.email}
          onChange={e =>
            setForm({
              ...form,
              contactDetails: {
                ...form.contactDetails,
                email: e.target.value,
              },
            })
          }
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="notes" className={styles.label}>Notes</label>
        <input
          id="notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.button}>Add New Owner</button>
    </form>
  );
}
