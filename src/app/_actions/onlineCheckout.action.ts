"use server"

import { getUserToken } from "@/Helpers/getUserToken";
import { ShippingAddress } from "@/interfaces";

export async function onlineCheckout(cartId: string, shippingAddress: ShippingAddress) {
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL;
    const token = await getUserToken();
    


    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}orders/checkout-session/${cartId}?url=${baseUrl}`, {
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