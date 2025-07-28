'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

type PostWalkParams = {
  walkId: string;
  isComplete: boolean;
};

const PostWalkOptions = ({ walkId, isComplete }: PostWalkParams) => {
  const router = useRouter(); // ✅ valid use of hook

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
    <>
      {!isComplete ? (
        <button onClick={() => onComplete(walkId)}>Mark complete</button>
      ) : (
        <Link href={`/admin/walks/${walkId}/report`}>Add a walk report</Link>
      )}
    </>
  );
};

export default PostWalkOptions;
