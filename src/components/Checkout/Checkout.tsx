import React, { useRef } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import Link from 'next/link'
import { onlineCheckout } from '@/app/_actions/onlineCheckout.action'
import toast from 'react-hot-toast'
import { cashCheckout } from '@/app/_actions/cashCheckout.action'

export default function Checkout({ cartId }: { cartId: string }) {
    const detailsInput = useRef<HTMLInputElement | null>(null);
    const cityInput = useRef<HTMLInputElement | null>(null);
    const phoneInput = useRef<HTMLInputElement | null>(null);

    async function CheckoutSession() {

        const shippingAddress = {
            details: detailsInput.current?.value || '',
            city: cityInput.current?.value || '',
            phone: phoneInput.current?.value || '',
        }

        const data = await onlineCheckout(cartId, shippingAddress);

        console.log("checkout data", data);
        if (data.status == "success") {
            location.href = data.session.url;
        }
    }
    async function CashOrder() {

        const shippingAddress = {
            details: detailsInput.current?.value || '',
            city: cityInput.current?.value || '',
            phone: phoneInput.current?.value || '',
        }



        const data = await cashCheckout(cartId, shippingAddress);

        
        if (data.status == "success") {
            location.href = "/allorders";
        }

        
    }


    return (
        <>



            <Dialog>

                <DialogTrigger asChild>
                    <Button className='py-5 rounded-2xl'>Proceed to Checkout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] ">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const details = formData.get('details') as string;
                        const city = formData.get('city') as string;
                        const phone = formData.get('phone') as string;

                        // CheckoutSession(cartId, details, city, phone);
                    }}>
                        <DialogHeader>
                            <DialogTitle>Add Shipping Address</DialogTitle>
                            <DialogDescription>
                                The order will be delivered to this Address so please Make sure your address is right
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="city">City</Label>
                                <Input ref={cityInput} id="city" required={true} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="details">Details</Label>
                                <Input ref={detailsInput} required={true} id="details" pattern="^(?=.*\d)[a-zA-Z0-9\s,.-]{5,100}$"
                                 title="Address should be 5–100 characters, letters, numbers, spaces, commas, dots or dashes only." />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input ref={phoneInput} id="phone" required={true} pattern="^(\+2)?01[0125][0-9]{8}$" title='Invalid Phone Number' />
                            </div>
                        </div>
                        <DialogFooter className='mt-5'>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className='cursor-pointer' onClick={CashOrder}>Cash</Button>
                            <Button type="submit" className='cursor-pointer' onClick={CheckoutSession} >Visa</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}
