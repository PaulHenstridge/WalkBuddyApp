'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import DateOfBirthInput from '@/components/DateOfBirthInput';
import styles from './NewDogForm.module.css';

interface DogForm {
  name: string;
  breed: string;
  description: string;
  dateOfBirth: string;
  notes: string;
}

export default function NewDogForm({ ownerId }: { ownerId: string }) {
  const router = useRouter();
  const [form, setForm] = useState<DogForm>({
    name: '',
    breed: '',
    description: '',
    dateOfBirth: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<DogForm & { form: string }>>({});
  const [submitting, setSubmitting] = useState(false);
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

    setSubmitting(true);
    try {
      const res = await fetch(`${base}/api/dbAPI/dogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ownerId }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setErrors({ form: payload.error || 'Unexpected server error' });
      } else {
        router.push('/admin/dogs');
      }
    } catch {
      setErrors({ form: 'Network error, please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      {errors.form && <p className={styles.error}>{errors.form}</p>}

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Dog Name</label>
        <input
          id="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="breed" className={styles.label}>Dog Breed</label>
        <input
          id="breed"
          value={form.breed}
          onChange={e => setForm({ ...form, breed: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <input
          id="description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className={styles.input}
        />
      </div>

      <DateOfBirthInput
        value={form.dateOfBirth}
        onChange={(dob: string) => setForm({ ...form, dateOfBirth: dob })}
      />

      <div className={styles.field}>
        <label htmlFor="notes" className={styles.label}>Notes</label>
        <input
          id="notes"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className={styles.input}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={styles.submitButton}
      >
        {submitting ? 'Saving…' : 'Create Dog'}
      </button>
    </form>
  );
}
