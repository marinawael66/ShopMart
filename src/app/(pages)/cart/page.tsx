"use client"

import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/components/context/cartContext'
import Loading from "../../loading"
import { formatCurrency } from '../../../Helpers/FormatPrice'
import Link from 'next/link'
import axios from 'axios'
import { CartResponse } from '@/interfaces'
import toast from 'react-hot-toast'
import { Loader2, Trash2 } from 'lucide-react'
import Checkout from '@/components/Checkout/Checkout'
import { useSession } from 'next-auth/react'
import { removeItemFromCartAction } from '@/app/_actions/removeItemFromCart.action'
import { updateItemCountInCart } from '@/app/_actions/updateItemCountInCart.action'
import { clearCartAction } from '../../_actions/clearCart.action'


export default function Cart() {

  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [UpdatedItemId, setUpdatedItemId] = useState<string | null>(null);
  const [IsClearing, setIsClearing] = useState<boolean>(false);

  const session = useSession();


  if(typeof cartData?.data.products[0]?.product == "string"|| cartData==null) {getCart();} 



  async function removeCartitem(productid: string) {

   
     setRemovingId(productid);

    const data = await removeItemFromCartAction(productid);
   
    if (data.status == "success") {
      toast.success("Product Removed Successfully");
      setCartData(data);
      setRemovingId(null);
    }
   



  }
  async function UpdateCartItemCount(productid: string, count: number) {
    if (count == 0) {
      removeCartitem(productid);
    } else {
      setUpdatedItemId(productid);

       const data = await updateItemCountInCart(productid,count);

      if (data.status == "success") {
        toast.success("Product updated Successfully");
        setCartData(data);

      }
      setUpdatedItemId(null);

    }
  }
  async function ClearCart() {
    setIsClearing(true)

    const data = await clearCartAction();
   
    if (data.message == "success") {

      setCartData(null);
      setIsClearing(false);
    }
  }

  useEffect(() => {
  if (!cartData || typeof cartData?.data.products[0]?.product === "string") {
    getCart();
  }
}, [cartData, getCart]);


  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product == "string" ? <Loading /> : !!cartData?.numOfCartItems ?
        <div className="container mx-auto px-4 py-6">

          <h1 className='text-3xl font-bold tracking-tight'> Shopping Cart</h1>
          <p className='text-muted-foreground mt-1'></p>
          <div className="grid lg:grid-cols-3 grid-cols-1 mt-10 gap-5">
            <div className="col-span-2 space-y-4 ">

              {

                cartData?.data.products.map((product) =>
                  <Card key={product._id} className='grid grid-cols-3 '>
                    <div className="col-span-1  ">
                      <Image src={product.product.imageCover} alt={product.product.title} width={120} height={120} className='w-40 h-40 object-cover rounded-4xl ms-10' />
                    </div>

                    <div className="col-span-2 relative pt-5">
                      {/* cartcol */}
                      <CardHeader>
                        <CardTitle>{product.product.title}</CardTitle>
                        <CardDescription>{product.product.brand.name} . {product.product.category.name} </CardDescription>
                        <CardAction>{formatCurrency(product.price)}</CardAction>
                      </CardHeader>
                      <CardContent className='flex gap-3 items-center mt-10 mb-5 z-0'>
                        <Button className='px-2 pb-2 pt-1  bg-gray-200 text-xl font-semibold text-black border-black hover:bg-gray-400 size-6 rounded-md ' onClick={() => UpdateCartItemCount(product.product._id, product.count + 1)}>+</Button>
                        <p className='font-semibold'>{UpdatedItemId === product.product._id ? <Loader2 className='animate-spin' /> : product.count}</p>
                        <Button

                          className='px-2 pb-2 pt-1 bg-gray-200 text-xl font-semibold text-black border-black hover:bg-gray-400 size-6 rounded-md  ' disabled={product.count == 1} onClick={() => UpdateCartItemCount(product.product._id, product.count - 1)}>-</Button>

                      </CardContent>
                      <CardFooter className='absolute bottom-3 end-5'>
                        <Button className='grow-0 cursor-pointer' disabled={removingId == product.product._id} onClick={() => removeCartitem(product.product._id)}>
                          {removingId == product.product._id && <Loader2 className='animate-spin' />}Remove</Button>
                      </CardFooter>
                    </div>





                  </Card>
                )}

            </div>
            {/* ordersummary */}
            <div className="col-span-1  lg:top-18">
              <Card>
                <CardHeader className=''>
                  <CardTitle className='text-lg font-semibold my-3'>Order Summary</CardTitle>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <CardDescription>subtotal ({cartData?.numOfCartItems})</CardDescription>
                      <CardDescription className='font-bold text-black'>{formatCurrency(cartData?.data.totalCartPrice ?? 0)}</CardDescription>
                    </div>
                    <div className="flex justify-between items-center">
                      <CardDescription>shipping</CardDescription>
                      <CardDescription className='font-bold text-green-700'>Free</CardDescription>
                    </div>
                    <hr className="border-gray-300 mt-4 mb-1" />
                  </div>

                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center font-bold ">
                    <div className="">Total</div>
                    <div>{formatCurrency(cartData?.data.totalCartPrice ?? 0)}</div>

                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col grow gap-4 mt-2 mb-3">
                  
                   <Checkout cartId={cartData?.cartId}/>



                    <Button className='py-5 rounded-2xl text-black bg-gray-200 hover:bg-gray-300'>
                      <Link href={'/products'}>Continue Shopping</Link>
                    </Button>

                  </div>
                </CardFooter>
              </Card>
              <Button onClick={ClearCart} variant={'outline'} 
              className=' text-destructive hover:text-destructive border-0 bg-gray-100 hover:bg-gray-200 mt-2 flex ms-auto'>
                {IsClearing?<Loader2 className='animate-spin'/>:<Trash2 />} Clear Cart</Button>
            </div>
          </div>




        </div> :
        <div className='min-h-[60vh] flex justify-center items-center flex-col'>
          <h2 className='text-2xl mb-10'>Your Cart Is Empty</h2>

          <Button className='py-5 '>
            <Link href={"/products"}>Add Ones
            </Link>
          </Button>
        </div>


      }
    </>


  )
}
