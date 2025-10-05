"use server"

import { getUserToken } from "@/Helpers/getUserToken"
import { WishlistRes } from "@/interfaces";



export async function removeItemFromWishlistAction(productid:string) {
    
    const token = await getUserToken();

     const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}wishlist/${productid}`, {
      method: "DELETE",
      headers: {
        token: token+'',
      }
    });
    const data: WishlistRes = await response.json();
    return data;
}