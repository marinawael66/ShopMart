"use client"
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Loader2, ShoppingCartIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/cartContext'
import { addToCartAction } from '@/app/_actions/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { WhishlistContext } from '../context/wishlistContext'
import { useRemoveWishlistProduct } from '@/hooks/useRemoveWishlistProduct'

export default function AddToCart({ productid }: { productid: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCartData, getCart, cartData } = useContext(CartContext);
  const { wishlistData, getWhishlist, removeProductInWishlist } = useContext(WhishlistContext);
  const session = useSession();
  const router = useRouter();
  const { moveToCart } = useRemoveWishlistProduct();

  async function addProductToCart() {



    if (session.status == 'authenticated') {
      setIsLoading(true);
      const data = await addToCartAction(productid);
      setCartData(data)
      data.status == 'success' && toast.success(data.message);
      setIsLoading(false);
    
     

      if (wishlistData?.data.some(product => product._id === productid)) {
        await removeProductInWishlist(productid);
        await getWhishlist();

      }
    } else {
      router.push('/login');

    }


  }
  return (
    <CardFooter className=' gap-2 relative z-40 '>
      <Button disabled={isLoading} onClick={addProductToCart} className=' grow md:grow-0 px-8 ms-auto '>{isLoading ? <Loader2 className='animate-spin' /> : <ShoppingCartIcon />}Add to cart </Button>
      {/* <Button  className='grow md:grow-0 px-8 ms-auto z-40'><ShoppingCartIcon />Add to cart </Button> */}

    </CardFooter>
  )
}
