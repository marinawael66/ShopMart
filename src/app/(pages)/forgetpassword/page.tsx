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



export default function ForgetPassword() {

     const route =useRouter();

    type formFields = z.infer<typeof forgetpasswordSchema>
const forgetpasswordSchema= z.object({
    email: z.email('Invalid email').nonempty('Email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
   
        
})


    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callback-url');



    const forgetForm = useForm<formFields>({
        resolver: zodResolver(forgetpasswordSchema),
        defaultValues: {
            email: "",
            
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: formFields) {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}auth/forgotPasswords`,{
            method:'POST',
            body:JSON.stringify(values),
            headers:{
                "Content-Type":"application/json",
            }

        }
            
        );
        const data= await response.json();
        
        setIsLoading(false);

       if(data.statusMsg== "success"){
        route.push('/resetcode');
       }else{
        toast.error(data.message);
        
       }
    }
    return (
    <div className="flex justify-center items-center min-h-[100vh]">
            <Card className="p-6 w-sm ">
            <Form {...forgetForm}>
                
                    <h1 className="text-4xl font-bold text-center">Send Email</h1>
                <form onSubmit={forgetForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={forgetForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="ali@example.com" type="email" {...field} />
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