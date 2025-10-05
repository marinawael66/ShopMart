import React from 'react'
import { LoginForm } from './_componenets/LoginForm/LoginForm'


export default function Login() {
  return (
     <div className="min-h-[60vh] flex justify-center items-center flex-col gap-8">
    <h1 className="text-4xl font-bold">Welcome Back</h1>
          <LoginForm/>
    </div>
  )
}
