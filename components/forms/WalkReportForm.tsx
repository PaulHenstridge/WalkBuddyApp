'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './WalkReportForm.module.css';

interface WalkReportFormProps {
  walkId: string;
}

export default function WalkReportForm({ walkId }: WalkReportFormProps) {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const base = process.env.NEXT_PUBLIC_APP_URL;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Notes are required');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${base}/api/dbAPI/walks/${walkId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notes),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setError(payload.error || 'Server error while saving report');
      } else {
        router.push(`/admin/walks/${walkId}`);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label htmlFor="notes" className={styles.label}>Walk Report Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className={styles.textarea}
          rows={6}
        />
      </div>

      <button type="submit" disabled={submitting} className={styles.submitButton}>
        {submitting ? 'Submitting…' : 'Submit Walk Report'}
      </button>
    </form>
  );
}
