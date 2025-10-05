
"use server"

import { getUserToken } from "@/Helpers/getUserToken"
import { CartResponse } from "@/interfaces";

export async function clearCartAction() {

    const token = await getUserToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}cart/`, {
      method: "DELETE",
      headers: {
        token: token +'',
      }
    });
    const data: CartResponse = await response.json();
    return data;
}