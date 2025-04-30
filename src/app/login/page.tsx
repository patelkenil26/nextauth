'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function LoginPage() {

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login Success",response.data)
      router.push("/profile")
    } catch (error: any) {
      console.log("Signup failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 ){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <br />
      <label htmlFor="email">email</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' type="text" value={user.email} id='email' placeholder='email' onChange={(e)=>setUser({...user,email:e.target.value})}/>

      <label htmlFor="password">password</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' type="password" value={user.password} id='password' placeholder='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>

      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ' onClick={onLogin}>{buttonDisabled ? "No Login" : "Login"}</button>
      <Link href={"/signup"}>Signup Page</Link>
    </div>
  )
}

