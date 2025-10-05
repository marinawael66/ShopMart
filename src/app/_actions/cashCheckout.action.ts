"use server"

import { getUserToken } from "@/Helpers/getUserToken";
import { ShippingAddress } from "@/interfaces";

export async function cashCheckout(cartId:string, shippingAddress:ShippingAddress) {
     const token = await getUserToken();
     const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}orders/${cartId}` , {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token + '',
                "Content-Type": "application/json",

            }
        });
        const data = await response.json();
    return data;
}