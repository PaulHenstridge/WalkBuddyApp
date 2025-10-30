'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type MarkCompleteParams = {
  walkId: string;
  children?: React.ReactNode;

};

const MarkComplete = ({ walkId }: MarkCompleteParams) => {
  const router = useRouter(); 

  const onComplete = async (id: string) => {
    try {
      const res = await fetch(`/api/dbAPI/walks/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Error marking walk complete:', text);
        return;
      }

      const completedWalk = await res.json();
      console.log('Completed Walk:', completedWalk);
      router.push(`/admin/walks/${id}`);
    } catch (err) {
      console.error('Network or parsing error:', err);
    }
  };

  return (
        <button onClick={() => onComplete(walkId)}>Mark complete</button>
  );
};

export default MarkComplete;
