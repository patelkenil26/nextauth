"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [username, setUsername] = useState("nothing");
  const [email, setEmail] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me");
    console.log("get user details: ", res.data);
    console.log("get user email: ", res.data.data.email);
    setData(res.data.data._id);
    setEmail(res.data.data.email)
    setUsername(res.data.data.username)
  };
 return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">👤 Profile</h1>
      <hr className="mb-6" />

      <p className="text-gray-600 mb-4">Welcome to your profile page</p>

      <h2 className="text-lg font-medium text-indigo-700">
        {data === "nothing" ? (
          "No Profile Data"
        ) : (
          <Link href={`/profile/${username}`} className="hover:underline">
            {username}
          </Link>
        )}
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button
          onClick={logout}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Get User Details
        </button>
      </div>
    </div>
  </div>
);

}
