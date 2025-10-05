"use server"

import { getUserToken } from "@/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";

export async function updateItemCountInCart(productid:string , count:number) {

    const token= await getUserToken();
     const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}cart/${productid}`, {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token: token + '',
          "Content-Type": "application/json",

        }
      });
      const data: CartResponse = await response.json();
    return data;
}