import React from 'react'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CategoryI } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';


export default async function Brands() {


  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}brands`, {
    method: "GET",
  });
  const data = await response.json();
  const brands: CategoryI[] = data.data;
 


  return (
    <div className="container mx-auto">
      <div className="lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-3">
        {
          brands.map((brand) => 
            <Card key={brand._id} className='hover:shadow-xl duration-100 inset-shadow-xlg'>
              <Link href={`/products?brand=${brand._id}`} className='z-60'>
              <Image src={brand.image} alt={brand.name} width={200} height={200} className='w-full'/>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-center'>{brand.name}</CardTitle>
                
              </CardHeader>
              </Link>
            </Card>
          )

        }
      </div>
    </div>
  )
}
