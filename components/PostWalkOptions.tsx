'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

import MarkComplete from './MarkComplete';
import RateWalk from './RateWalk';
type PostWalkParams = {
  walkId: string;
  isComplete: boolean;
};

const PostWalkOptions = ({ walkId, isComplete }: PostWalkParams) => {


  return (
    <>
      {!isComplete ? (
        <MarkComplete walkId={walkId}  >Mark complete</MarkComplete>
      ) : (<>
        <Link href={`/admin/walks/${walkId}/report`}>Add a walk report</Link>
        <RateWalk walkId={walkId}/>
        </>
      )}
    </>
  );
};

export default PostWalkOptions;
