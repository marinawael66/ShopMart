import { ProductI } from '@/interfaces/product';

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import AddToWishlist from '@/components/AddToWishlist/AddToWishlist';

export default async function Products({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
   await searchParams;
    const getFirst = (v: string | string[] | undefined) => Array.isArray(v) ? v[0] : v ?? null;
   
    const category = getFirst(searchParams?.category);
    const brand = getFirst(searchParams?.brand);
    let url = `${process.env.NEXT_PUBLIC_URL_API}products`;
    const query = new URLSearchParams();
    if (category) query.append('category[in]', category);
    if (brand) query.append('brand', brand);
    if (query.toString()) {
        url += `?${query.toString()}`;
    }
    
    const response = await fetch(url,
        {
            next: {
                revalidate: 10 * 60
            }
        }
    );
    const { data: products }: { data: ProductI[] } = await response.json();

  

    return <>

        {products?.length > 0 ?
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                {
                    products.map((product) =>

                        <div key={product._id} className=" ">


                            <Card className='object-fit'>
                                <Link href={`/products/${product._id}`}>
                                    <Image src={product.imageCover} className='w-full  object-cover h-80 pb-2 ' alt='' width={300} height={300} />
                                    <CardHeader>
                                        <CardTitle>{product.title.split(' ', 2)}</CardTitle>
                                        <CardDescription>{product.category.name}</CardDescription>
                                        <CardAction>{product.brand.name}</CardAction>
                                    </CardHeader>
                                    <CardContent className='flex justify-between'>
                                        
                                        <div className='flex gap-2 justify-center items-center py-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-amber-500">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                            
                                        </svg>
                                        <span className='font-semibold'>{product.ratingsAverage}</span>
                                        </div>
                                        <span className='font-bold self-center'>{product.price} EGP</span>
                                    </CardContent>
                                </Link>
                                <div className="flex justify-between ">
                                    <AddToCart productid={product._id} />
                                   <AddToWishlist productid={product._id}  />
                                    
                                </div>



                            </Card>


                        </div>)
                }
            </div> :
            <div className='min-h-[60vh] flex justify-center items-center flex-col'>
                <h2 className='text-2xl mb-10'>There is no products yet</h2>

                <Button className='py-5 '>
                    <Link href={"/products"}>Continue Shopping
                    </Link>
                </Button>
            </div>
        }




    </>
}