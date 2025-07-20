'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './NewLocationForm.module.css';

interface LocationForm {
  name: string;
  description: string;
  w3wLocation: string;
}

export default function NewLocationForm() {
  const router = useRouter();
  const [form, setForm] = useState<LocationForm>({ name: '',description:'', w3wLocation: '' });
  const [errors, setErrors] = useState<Partial<LocationForm & { form: string }>>({});
  const [submitting, setSubmitting] = useState(false);
  const base = process.env.NEXT_PUBLIC_APP_URL;

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
      const res = await fetch(`${base}/api/dbAPI/locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
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
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      {errors.form && <p className={styles.error}>{errors.form}</p>}

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Location Name</label>
        <input
          id="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <input
          id="description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className={styles.input}
        />
        {errors.description && <p className={styles.error}>{errors.description}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="w3wLocation" className={styles.label}>w3wLocation</label>
        <input
          id="w3wLocation"
          value={form.w3wLocation}
          onChange={e => setForm({ ...form, w3wLocation: e.target.value })}
          className={styles.input}
        />
        {errors.w3wLocation && <p className={styles.error}>{errors.w3wLocation}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={styles.button}
      >
        {submitting ? 'Saving…' : 'Create Location'}
      </button>
    </form>
  );
}
