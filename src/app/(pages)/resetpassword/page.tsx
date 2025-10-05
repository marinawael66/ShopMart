"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from 'next-auth/react'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"



export default function ResetPassword() {

    const route = useRouter();

   
    const ResetPasswordSchema = z.object({
        email: z.email('Invalid email').nonempty('Email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        newPassword: z.string().nonempty("newpassword Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "enter valid password"),

    })

 type formFields = z.infer<typeof ResetPasswordSchema>
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callback-url');



    const ResetForm = useForm<formFields>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: "",
            newPassword: "",

        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: formFields) {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}auth/resetPassword`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            }

        }

        );
        const data = await response.json();
        
        setIsLoading(false);

           if(data?.token){
             
             route.push('/login');
           }else{
            toast.error(data.message);

           }
    }
    return (
        <div className="flex justify-center items-center min-h-[100vh]">
            <Card className="p-6 w-sm ">
                <Form {...ResetForm}>

                    <h1 className="text-4xl font-bold text-center">Reset Password</h1>
                    <form onSubmit={ResetForm.handleSubmit(onSubmit)} className="space-y-8">


                        <FormField
                            control={ResetForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>email:</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={ResetForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New password:</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" disabled={isLoading} className="cursor-pointer w-full">
                            {isLoading && <Loader2 className='animate-spin ' />}  Submit</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}