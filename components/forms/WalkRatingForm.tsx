'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RatingSelector from '@/components/RatingSelector';
import type { RatingLevel } from '@/types/rating'; // or from your shared module

interface WalkRatingFormProps {
  walkId: string;
  defaultRating?: RatingLevel; // may be undefined if unrated
}

export default function WalkRatingForm({ walkId, defaultRating }: WalkRatingFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState<RatingLevel | ''>(defaultRating ?? '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false); // tiny UX flag

  // keep local state in sync if parent re-fetches
  useEffect(() => {
    setRating(defaultRating ?? '');
  }, [defaultRating]);

  async function submitRating(val: RatingLevel) {
    if (submitting) return;
    setSubmitting(true);
    setError('');
    setSaved(false);

    try {
      const res = await fetch(`/api/dbAPI/walks/${walkId}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val), // "GREAT" | "OK" | "NOT_OK"
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setError(payload.error || 'Server error while saving rating');
        return;
      }

      // success: reflect saved value; optionally refresh server components
      setRating(val);
      setSaved(true);
      router.refresh(); //  if  page fetches data server-side
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleSelect(val: RatingLevel) {
    setRating(val);      // update UI immediately
    void submitRating(val); // fire-and-forget; uses val directly (not stale state)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      {error && <p role="alert">{error}</p>}

      {/* Show a small status line if you like */}
      {submitting && <p>Saving…</p>}
      {saved && !submitting && <p>Saved.</p>}

      <RatingSelector
        value={rating}
        onChange={handleSelect}
        disabled={submitting}
        id="walk-rating"
      />

      {/* Optional: keep a visible Change/Reset */}
      {rating && !submitting && (
        <button
          type="button"
          onClick={() => { setRating(''); setSaved(false); setError(''); }}
        >
          Change
        </button>
      )}
    </form>
  );
}
