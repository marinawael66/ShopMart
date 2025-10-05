
"use client"
import { removeItemFromWishlistAction } from '@/app/_actions/removeFromWishlist.action';
import { WishlistRes } from '@/interfaces';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react';
import toast from 'react-hot-toast';

export const WhishlistContext = createContext<{
  wishlistData: WishlistRes | null;
  setwishlistData: (value: WishlistRes | null) => void;
  Wishloading: boolean;
  setWishloading: (value: boolean) => void;
  removingItem:string | null;
  setRemovingItem:(value:string)=>void;
  removeProductInWishlist:(value:string)=>Promise<void>;
  getWhishlist: () => Promise<void>;
}>({
  wishlistData: null,
  setwishlistData: () => { },
  Wishloading: false,
  setWishloading: () => { },
  removingItem:null,
  setRemovingItem:()=>{},
  removeProductInWishlist:async()=>{},
  getWhishlist: async () => { },
});



export default function WishlistContextProvider({ children }: { children: ReactNode }) {


  const [wishlistData, setwishlistData] = useState<WishlistRes | null>(null);
  const [Wishloading, setWishloading] = useState<boolean>(true);
   const [removingItem, setRemovingItem] = useState<string | null>(null);
  const session = useSession();


  async function getWhishlist() {



    const response = await fetch("/api/get-wishlist");

    const data:WishlistRes = await response.json();

    

    setwishlistData(data);
    setWishloading(false);





  }
   async function removeProductInWishlist(productid:string) {
    setRemovingItem(productid);
    
    const data = await removeItemFromWishlistAction(productid);
    
    if (data.status == "success") {
      
      setwishlistData(data);
      setRemovingItem(null);
    }

    
}

  useEffect(() => {
    if (session.status == 'authenticated') {
      getWhishlist();
    }
  }, [session.status])


  return <WhishlistContext.Provider value={{ wishlistData, setwishlistData, Wishloading, setWishloading, getWhishlist,removingItem,
  setRemovingItem,
  removeProductInWishlist }}>
    {children}
  </WhishlistContext.Provider>

}
