import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryI } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {


  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}categories`, {
    method: "GET",
    next:{
      revalidate:10*60
    },
  });
  const data = await response.json();
  const categories: CategoryI[] = data.data;


  return (
        <div className="container mx-auto">
      <div className="lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-4">
        {
          categories.map((category) => 
            
            <Card key={category._id} className='hover:shadow-xl duration-100 inset-shadow-2xlg object-fit p-0  '>
              <Link href={`/products?category=${category._id}`} className='z-60'>
              <Image src={category.image} alt={category.name} width={200} height={200} className='w-full  h-100 rounded-t-2xl object-cover  '/>
              <CardHeader >
                
                <CardTitle className='text-lg font-semibold text-center'>{category.name}</CardTitle>
                
              </CardHeader>
              </Link>
            </Card>

          )

        }
      </div>
    </div>
  )
}
