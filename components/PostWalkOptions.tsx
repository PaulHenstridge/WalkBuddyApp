'use client';

import Link from 'next/link';
import React from 'react';
import MarkComplete from './MarkComplete';
import WalkRatingForm from './forms/WalkRatingForm';
import { toRatingLevel, type RatingLevel } from '@/types/rating';

type PostWalkParams = {
  walkId: string;
  defaultRating: string | null | undefined; // raw from server DTO
  isComplete: boolean;
};

const PostWalkOptions = ({ walkId, defaultRating, isComplete }: PostWalkParams) => {
  // Normalize raw server value to the union (or '')
  const normalized: RatingLevel | '' = toRatingLevel(defaultRating ?? '');

  return (
    <>
      {!isComplete ? (
        <MarkComplete walkId={walkId}>Mark complete</MarkComplete>
      ) : (
        <>
          <Link href={`/admin/walks/${walkId}/report`}>Add a walk report</Link>
          <WalkRatingForm walkId={walkId} defaultRating={normalized || undefined} />
        </>
      )}
    </>
  );
};

export default PostWalkOptions;
