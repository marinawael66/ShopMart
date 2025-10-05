"use server"

import { getUserToken } from "@/Helpers/getUserToken";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addToCartAction(productid :string) {

   const token = await getUserToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}cart`,
            {
                method: "POST",
                body: JSON.stringify({ productId: productid }),
                headers: {
                    token:token + '',
                    "Content-Type": "application/json",
                    
                }
            }
        );
        const data = await response.json();
        return data;
    
}