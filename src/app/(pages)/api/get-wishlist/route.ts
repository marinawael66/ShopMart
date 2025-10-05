import { getUserToken } from "@/Helpers/getUserToken";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
 
    const token = await getUserToken();
    
     const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_API}wishlist`,
        {
          headers: {
            token:token +'',
          },
        }
      );

      return NextResponse.json(response.data);
    
}