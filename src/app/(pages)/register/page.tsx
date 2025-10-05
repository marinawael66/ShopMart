
'use client'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import {  useForm } from 'react-hook-form'
import {Form} from '../../../components/ui/form'
import * as z from 'zod'
import{zodResolver} from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Register() {

  const route =useRouter();
  const schemaRegister = z.object({
    name:z.string().nonempty("Name Required").min(2,"min chararacters should be 2").max(15,"max characters used should be 15"),
    email:z.email("email invalid").nonempty("email required "),
    password:z.string().nonempty("password Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,"enter valid password"),
    rePassword:z.string().nonempty("password Required"),
    phone:z.string().nonempty("phone required").regex(/^(\+2)?01[0125][0-9]{8}$/,"enter valid phone number")
  }).refine((obj)=>{
    return obj.password==obj.rePassword
  },{
    path:["rePassword"],
    error:"confirm password doesnt match"
  })

  const registerForm = useForm< z.infer<typeof schemaRegister>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver:zodResolver(schemaRegister)
  })

 async function handleRrgister(values: z.infer<typeof schemaRegister>){

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}auth/signup`,{
      method:"POST",
      body:JSON.stringify(values),
      headers:{
        "Content-Type":"application/json",
      }

    });
    const data = await response.json();
   
    if(data.message == "success"){
      toast.success("Account Created !");
       route.push('/login');
    }else{
      toast.error(data.message);
     
    }

  }
  return (
    <div className="min-h-[60vh]  mt-20 mx-auto w-1/2">
      <h1 className="text-4xl font-bold my-8 text-center ">Register Now </h1>
      <Form {...registerForm}>
        <form className='space-y-4' onSubmit={registerForm.handleSubmit(handleRrgister )}>


      <FormField
          control={registerForm.control}
        name="name"
        render={({field}) => (
          <FormItem>
            <FormLabel >Name:</FormLabel>
            <FormControl>
              <Input type='text' {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
  />
        <FormField
          control={registerForm.control}
        name="email"
        render={({field}) => (
          <FormItem>
            <FormLabel >Email:</FormLabel>
            <FormControl>
              <Input type='email' {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
  />


      <FormField
          control={registerForm.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel >Password:</FormLabel>
            <FormControl>
              <Input type='password' {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
  />

        <FormField
          control={registerForm.control}
        name="rePassword"
        render={({field}) => (
          <FormItem>
            <FormLabel >rePassword:</FormLabel>
            <FormControl>
              <Input type='password' {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
  />


        <FormField
          control={registerForm.control}
        name="phone"
        render={({field}) => (
          <FormItem>
            <FormLabel >phone:</FormLabel>
            <FormControl>
              <Input type='tel' {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
  />
  

          <Button className='w-full'>Register</Button>
        </form>
      </Form>
    </div>
  )
}
