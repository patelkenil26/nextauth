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
    <div className="flex items-center justify-center flex-col py-2 min-h-screen">
      <h1>Profile </h1>
      <hr />
      <p>Profile page</p>
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${username}`}> {username}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-green-700 font-bold text-white py-2 px-4 rounded"
      >
        Get User
      </button>
    </div>
  );
}
