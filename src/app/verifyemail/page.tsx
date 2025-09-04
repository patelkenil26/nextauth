"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
    // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(()=>{
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || " ")

    // const {query} = Router
    // const urlTokentwo = query.token

  },[])

  useEffect(()=>{
    if(token.length > 0){
        verifyUserEmail()
    }
  },[token])
return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Verify Email</h1>
      
      <h2 className="p-3 bg-green-100 text-green-700 rounded-lg mb-6">
        {token ? `Token: ${token}` : "No Token Found"}
      </h2>

      {verified && (
        <div className="space-y-3">
          <h2 className="text-green-600 font-semibold">✅ Email Verified Successfully</h2>
          <Link href="/login" className="text-indigo-600 hover:underline">Go to Login</Link>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600 font-semibold">
          ❌ Error verifying email
        </div>
      )}
    </div>
  </div>
);

}
