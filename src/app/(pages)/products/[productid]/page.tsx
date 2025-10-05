import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';
import ProductSlider from '@/components/productslider/productslider';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProductI } from '@/interfaces';
import { HeartIcon, ShoppingCartIcon, StarIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params';
import React from 'react'

export default async function ProductDetails({ params }: { params: Params }) {
    const { productid } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}products/${productid}`);
    const { data: product }: { data: ProductI } = await response.json();
   
    return (
        <>
            <Card className='md:grid-cols-3 grid outline-0 items-center relative sm:grid-cols-1 gap-4 '>
                <div className="absolute top-10 end-15 z-20">
                    <AddToWishlist productid={product._id}/>
                </div>
                <div className="md:col-span-1 mb-5 w-full sm:pt-15">
                    <ProductSlider  product={product} />
                </div>
                <div className="md:col-span-2 space-y-4 p-4 ">
                    <CardHeader>
                        <CardDescription>{product.brand.name}</CardDescription>
                        <CardTitle className='text-2xl'>{product.title}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>

                    </CardHeader>
                    <CardContent>
                        <CardDescription>{product.category.name}</CardDescription>
                        <div className='flex mt-3 gap-1'><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-amber-500 ">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                            <span>{product.ratingsAverage}</span></div>

                            <div className="flex gap-6 items-center mt-3">
                                <p className="flex gap-1 ">EGP <span className="text-xl font-semibold">{product.price}</span></p>
                               
                            </div>
                             <CardDescription className="mt-3 flex gap-3 ">remaining pieces<span className='font-medium'>{product.quantity}</span></CardDescription>
                    </CardContent>
                   
                    <AddToCart productid={product._id}/>
                 
                </div>

            </Card>

            








        </>


    )
}
