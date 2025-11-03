'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import RatingSelector, { RatingLevel } from '@/components/RatingSelector';

interface WalkRatingFormProps {
  walkId: string;
  defaultRating?: RatingLevel; // optional default if you have one
}

export default function WalkRatingForm({ walkId, defaultRating }: WalkRatingFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState<RatingLevel | ''>(defaultRating ?? '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!rating) {
      setError('Rating is required');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/dbAPI/walks/${walkId}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // IMPORTANT: send a JSON string literal so Spring/Jackson can bind to enum
        body: JSON.stringify(rating), // e.g. "GREAT"
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setError(payload.error || 'Server error while saving rating');
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
    <form onSubmit={handleSubmit} noValidate>
      {error && <p role="alert">{error}</p>}

      <RatingSelector
        value={rating}
        onChange={setRating}
        disabled={submitting}
        id="walk-rating"
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Walk Rating'}
      </button>
    </form>
  );
}
