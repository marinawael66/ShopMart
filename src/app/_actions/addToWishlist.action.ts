"use server"
import { getUserToken } from "@/Helpers/getUserToken";
export async function addToWishlistAction(productid:string) {
    const token = await getUserToken();
   


     const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}wishlist`,
            {
                method: "POST",
                body: JSON.stringify({ productId: productid }),
                headers: {
                    token: token+'',
                    "Content-Type": "application/json",

                }
            }
        );
        const data = await response.json();
    return data;
}