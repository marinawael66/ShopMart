import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 justify-center ">
      <div className="min-h-96 w-1/2  self-center">
        <Image className='w-full' src={'/images/404.png'} alt='not found page' quality={90} width={500} height={500}></Image>


      </div>
      <div className='self-center'>
        <Link href={"/"}>
          <Button>Back to shopping</Button>
        </Link>
      </div>
    </div>

  )
}
