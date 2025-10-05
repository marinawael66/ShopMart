import { Loader2, SplinePointerIcon } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-cols justify-center items-center min-h-screen gap-3'><h2 className='font-bold '>shopMart</h2><Loader2 className='animate-spin ' size={90}/></div>
  )
}
