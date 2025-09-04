"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {loading ? "Processing..." : "Login to Your Account"}
      </h1>

      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="text"
        value={user.email}
        id="email"
        placeholder="Enter your email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="password"
        value={user.password}
        id="password"
        placeholder="Enter your password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        onClick={onLogin}
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>

      <p className="text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-indigo-600 hover:underline">Signup</Link>
      </p>
    </div>
  </div>
);

}
