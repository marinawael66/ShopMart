
"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const tokenSession = (process.env.NODE_ENV==="production"?"__Secure-next-auth.session-token" : "next-auth.session-token");
 const x =(await cookies()).get(tokenSession)?.value;
    const accessToken= await decode({token:x,secret:process.env.NEXTAUTH_SECRET!})
    return accessToken?.token;
}