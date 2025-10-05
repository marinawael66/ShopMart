
"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import CartContextProvider from '../context/cartContext'
import WishlistContextProvider from '../context/wishlistContext'
import Navbar from '../Navbar/Navbar'
import { Toaster } from 'react-hot-toast'

export default function Provider({children}:{children:ReactNode}) {
  return (
          <SessionProvider>
          <CartContextProvider>
          <WishlistContextProvider>
          <Navbar />

          <div className="container mx-auto py-5">
            <Toaster />
            {children}
          </div>
          </WishlistContextProvider>
        </CartContextProvider>
        </SessionProvider>
  )
}
