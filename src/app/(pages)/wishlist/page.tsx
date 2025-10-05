"use client"
import React, { useContext, useState } from 'react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { WhishlistContext } from '@/components/context/wishlistContext';
import Loading from '@/app/loading';
import Image from 'next/image';
import { formatCurrency } from '@/Helpers/FormatPrice';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { WishlistRes } from '@/interfaces';
import { useRemoveWishlistProduct } from '@/hooks/useRemoveWishlistProduct';
import AddToCart from '@/components/AddToCart/AddToCart';
export default function Wishlist() {
    const { wishlistData, Wishloading, getWhishlist, setwishlistData ,removingItem,removeProductInWishlist} = useContext(WhishlistContext);
 

    if(typeof wishlistData?.data[0]== "string"|| wishlistData==null) {getWhishlist();} 
       


    return (
        <>
        {
            Wishloading||typeof wishlistData?.data[0]== "string"?<Loading />:wishlistData?.count?
             <div className="container mx-auto px-4 py-6">

                <h1 className='text-3xl font-bold tracking-tight mb-8'> Your Wishlist</h1>

                <div className="col-span-2 space-y-4 ">
                    {

                        wishlistData?.data.map((product) =>
                            <Card key={product._id} className='grid grid-cols-3 '>
                                <div className="col-span-1  ">
                                    <Image src={product.imageCover} alt={product.title} width={120} height={120} className='w-40 h-40 object-cover rounded-4xl ms-10' />
                                </div>

                                <div className="col-span-2 relative pt-5">
                                    
                                    <CardHeader>
                                        <CardTitle>{product.title}</CardTitle>
                                        <CardDescription>{product.brand.name} . {product.category.name} </CardDescription>
                                        <CardAction>{formatCurrency(product.price)}</CardAction>
                                         <Button variant={'outline'} className=' size-8  mt-2 text-destructive hover:text-destructive border-0 bg-gray-100 hover:bg-gray-200  cursor-pointer z-40' disabled={removingItem == product._id}  onClick={()=>removeProductInWishlist(product._id)} >{ removingItem== product._id ?<Loader2 className='animate-spin' />:<Trash2/>}</Button>
                                    </CardHeader>
                                    
                                    <CardFooter className='absolute bottom-5 end-2 z-0'>
                                       <AddToCart productid={product._id}/>
                                    </CardFooter>
                                </div>





                            </Card>
                        )}


                </div>
            </div>:<div className='min-h-[60vh] flex justify-center items-center flex-col'>
          <h2 className='text-2xl mb-10'>Your Whishlist Is Empty</h2>

          <Button className='py-5 '>
            <Link href={"/products"}>Add Ones
            </Link>
          </Button>
        </div>
}
           

        </>
)
}
