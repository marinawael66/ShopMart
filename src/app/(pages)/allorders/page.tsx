
"use client"
import { CartContext } from '@/components/context/cartContext'
import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Order } from '@/interfaces';
import Image from 'next/image';
import { formatCurrency } from '@/Helpers/FormatPrice';

export default function AllOrders() {
    const [orders, setOrders] = useState<Order[]>([]);

    async function getOrders() {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/orders/user/" + localStorage.getItem("userId"));
        const data: Order[] = await response.json();
      
        setOrders(data);

    }

    useEffect(() => {

        getOrders();
    }, []);
    return (
        <div className=".container mx-auto flex space-y-5 flex-col">
             <h1 className='text-3xl font-bold tracking-tight'> Your Orders</h1>
            {
                orders.map((order) =>
                    <Card className='' key={order._id}>
                        <CardHeader>
                            <CardTitle className='text-lg font-bold'>Order <span>{order.id}</span></CardTitle>
                            {order.cartItems.map((item)=>
                            <div className='flex items-center gap-5 ' key={item._id}>
                                <Image src={item.product.imageCover} alt={item.product.title} width={50} height={50} className=''/> 
                                <CardDescription>
                                    <div className="content">
                                    <p className='text-black'>{item.product.title}</p>
                                    <p> count:<span className='mx-3'>{item.count}</span></p>
                                    <p>price:<span className='mx-3'>{formatCurrency(item.price)}</span></p>
                                </div>
                                    </CardDescription> 
                               
                            </div>
                            )}
                            
                            
                        </CardHeader>
                        <CardContent>
                            <div className='flex gap-6 text-black'><span>Status:</span>{order.isDelivered?<span className='text-green-600 font-semibold'>Delivered</span> : <span className='text-red-600 font-semibold'>UnDelivered</span>}</div>
                            <p>created at: <span className='mx-3'>{order.createdAt}</span></p>
                            <p>payment method: <span className='mx-3'>{order.paymentMethodType}</span></p>
                            
                        </CardContent>
                        
                    </Card>)
            }


        </div>
    )
}
