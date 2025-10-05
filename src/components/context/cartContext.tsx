
"use client"
import { CartResponse } from "@/interfaces";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<
  {
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean, setIsLoading: (value: boolean) => void,
    getCart: () => void,

  }>({
    cartData: null,
    setCartData: () => { },
    isLoading: false, setIsLoading: () => { },
    getCart: () => Promise<void>,


  });
export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const session = useSession();
  async function getCart() {

    



    const response = await fetch("/api/get-cart");

    const data: CartResponse = await response.json();
  

    

    setCartData(data);
    setIsLoading(false);

    if (typeof window !== "undefined") {
      if (cartData?.data.cartOwner) {
       
        localStorage.setItem("userId", cartData.data.cartOwner);
      }
    }
  }


 

  useEffect(() => {
    if (session.status == "authenticated") {
      getCart();
    }


  }, [session.status])

  return <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart, }}>
    {children}
  </CartContext.Provider>

}
