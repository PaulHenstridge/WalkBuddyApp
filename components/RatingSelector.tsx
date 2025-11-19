// components/RatingSelector.tsx
import React from 'react';
import { RATING_LEVELS, type RatingLevel } from '@/types/rating'; // optional shared module

type RatingSelectorProps = {
  value: RatingLevel | '';
  onChange: (val: RatingLevel) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
};

export default function RatingSelector({
  value,
  onChange,
  disabled,
  id,
  name = 'rating',
}: RatingSelectorProps) {
  return (
    <>
      {value && <h1>Rating: {value}</h1>}

      {!value && (
        <fieldset id={id}>
          <legend>Rating</legend>
          {RATING_LEVELS.map((opt) => (
            <label key={opt} style={{ display: 'block', cursor: disabled ? 'not-allowed' : 'pointer' }}>
              <input
                type="radio"
                name={name}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
                disabled={disabled}
              />
              {opt}
            </label>
          ))}
        </fieldset>
      )}
    </>
  );
}
