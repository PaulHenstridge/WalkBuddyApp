// components/RatingSelector.tsx
import React from 'react';

export type RatingLevel = 'GREAT' | 'OK' | 'NOT_OK';

type RatingSelectorProps = {
  value: RatingLevel | '';                 // current selection from parent
  onChange: (val: RatingLevel) => void;    // tell parent when it changes
  disabled?: boolean;
  id?: string;                             // optional for label association
};

const OPTIONS: RatingLevel[] = ['GREAT', 'OK', 'NOT_OK'];

export default function RatingSelector({ value, onChange, disabled, id }: RatingSelectorProps) {
  return (
    <fieldset id={id}>
      <legend>Rating</legend>
      {OPTIONS.map(opt => (
        <label key={opt} style={{ display: 'block', cursor: disabled ? 'not-allowed' : 'pointer' }}>
          <input
            type="radio"
            name="rating"
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            disabled={disabled}
          />
          {opt}
        </label>
      ))}
    </fieldset>
  );
}
