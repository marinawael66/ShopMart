"use server"

import { getUserToken } from "@/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";

export async function removeItemFromCartAction(productid:string) {

     const token = await getUserToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}cart/${productid}`, {
      method: "DELETE",
      headers: {
        token: token + '',
      }
    });
   
    const data: CartResponse = await response.json();
    return data;
} 