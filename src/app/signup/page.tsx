"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {loading ? "Processing..." : "Create an Account"}
      </h1>

      <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="text"
        value={user.username}
        id="username"
        placeholder="Enter your username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

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
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:underline">Login</Link>
      </p>
    </div>
  </div>
);

}
