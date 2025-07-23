'use client'

import Link from 'next/link';
import React from 'react'

type PostWalkParams = {
    walkId: string;
    isComplete: boolean;
}

const onComplete = async (id: string) => {
    const base = process.env.NEXT_PUBLIC_APP_URL
    const res = await fetch(`${base}/api/dbAPI/walks/${id}/complete`)
    console.log('REZZZ->', res)
    const completedWalk = await res.json()
}

const PostWalkOptions = ({walkId, isComplete}: PostWalkParams) => {
  return (
    <>
    {!isComplete ?
    <button  onClick={() => onComplete(walkId)}>Mark complete</button>
    :
    <Link href={`/admin/walks/${walkId}report`}> Add a walk report</Link>
    }
    
    </>
  )
}

export default PostWalkOptions