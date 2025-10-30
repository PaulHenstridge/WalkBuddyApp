'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type RateWalkParams = {
  walkId: string;
  children?: React.ReactNode;

};

const RateWalk = ({ walkId }: RateWalkParams) => {
  const router = useRouter(); 



  return (
       <h2>Rate walk: {walkId}</h2>
  );
};

export default RateWalk;
