"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { HeartIcon, Loader2, ShoppingCartIcon, User2Icon, UserIcon } from "lucide-react"
import { CartContext } from "../context/cartContext";

import { Badge } from "../ui/badge"
import { useContext, useEffect } from "react"
import { WhishlistContext } from "../context/wishlistContext"
import { signOut, useSession } from "next-auth/react"



export default function Navbar() {

    const session = useSession();
    

    const { cartData, isLoading } = useContext(CartContext)
    const { wishlistData, Wishloading } = useContext(WhishlistContext)
    useEffect(() => {
     
    }, []);

    return (
        <nav className='py-2 bg-gray-50 shadow text-2xl font-semibold sticky top-0 z-50'>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h1><Link href='/'>ShopMart</Link></h1>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/products">products</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/categories">categories</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/brands">brands</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>



                    <div className="flex items-center gap-1">


                        {session.status == 'authenticated' && <div className="flex items-center">
                            <div className="  relative p-3">

                                {
                                    isLoading ? <Loader2 className="animate-spin absolute top-1/6 end-0" /> : <>
                                        <Link href={"/cart"}>
                                            <ShoppingCartIcon />
                                            <Badge className="h-4 min-w-4 rounded-full px-0.5 pb-1 pt-0.5 absolute top-0 end-0">

                                                <span className="text-white">{cartData?.numOfCartItems}</span>
                                                {/* {cartData?cartData.numOfCartItems :0} */}
                                            </Badge>
                                        </Link>

                                    </>
                                }

                            </div>
                            <div className="  relative p-3 ">

                                {
                                    Wishloading ? <Loader2 className="animate-spin absolute top-1/6 end-0" /> : <>
                                        <Link href={"/wishlist"}>
                                            <HeartIcon />
                                            <Badge className="h-4 min-w-4 rounded-full px-0.5 pb-1 pt-0.5 absolute top-0 end-0">

                                                <span className="text-white">{wishlistData?.count}</span>
                                                {/* {cartData?cartData.numOfCartItems :0} */}
                                            </Badge>
                                        </Link>

                                    </>
                                }

                            </div>
                        </div>
                        }
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-0"><UserIcon className="border-2 border-black   rounded-full  relative z-60" /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {session.status == 'authenticated' ? <>
                                    <Link href='/profile'>
                                        <DropdownMenuItem>profile</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={()=>signOut({
                                        callbackUrl:"/"
                                    })}>logout</DropdownMenuItem>

                                </> : <>
                                    <Link href='/login'>
                                        <DropdownMenuItem>login</DropdownMenuItem>
                                    </Link>
                                    <Link href='/register'>
                                        <DropdownMenuItem>register</DropdownMenuItem>
                                    </Link>

                                </>}





                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </div>
        </nav>
    )
}
