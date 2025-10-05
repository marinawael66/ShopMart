"use client"

import { HeartIcon, Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { WhishlistContext } from '../context/wishlistContext';
import { useSession } from 'next-auth/react';

import { addToWishlistAction } from '@/app/_actions/addToWishlist.action';
import { useRouter } from 'next/navigation';

export default function AddToWishlist({ productid }: { productid: string }) {


    const [isLoading, setIsLoading] = useState(false);
    const { setwishlistData, wishlistData, getWhishlist } = useContext(WhishlistContext);
    const session = useSession();
    const router = useRouter()



    async function addProductToWhishlist() {

        if (session.status == 'authenticated') {
            setIsLoading(true);
            const data = await addToWishlistAction(productid);


           
            setwishlistData(data);
            await getWhishlist();


            if (data.status == "success") {
                toast.success(data.message);
            }
            setIsLoading(false);
       



    }else{
        router.push('/login');

       }
}
    return (
        <>
        {isLoading ? <Loader2 className='animate-spin me-5' /> : wishlistData?.data.some((product) => product._id === productid) ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" size-6.5 me-5">
                 <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
             </svg>:<HeartIcon className='me-5'  onClick={addProductToWhishlist} />}
         
        
        
        </>
    )
        
       
    
}
 