'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast ,{Toaster } from "react-hot-toast";

export default function age() {
  const router =useRouter();
  const [username, setusername] = useState("");
  const [email,setEmail] = useState("");

  const AdminCheck = () =>{
    if(username.length == 0 || email.length == 0){
     return toast.error("All field required")
    }
    if (username !== "Admin" || email !== "password") {
      return toast.error("Wrong credentials");
    }
    toast.success("WELCOME");
    router.push('/')
    


  }
  return (
    <div className="bg-purple-400 flex justify-center items-center h-screen">
      <div className="h-60 rounded-xl bg-purple-300 top-5 left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Admin Dashborad</h1>
        </div>
        <div className="space-y-4">
          <input onChange={(e)=>setusername(e.target.value)} type="text" placeholder="Username" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
          <input onChange={(e)=>setEmail(e.target.value)}  type="password" placeholder="Password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
        </div>
        <div className="text-center mt-6">
          <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl" onClick={AdminCheck}>Login </button>
          <Toaster toastOptions={{
    success: {
      style: {
        background: 'green',
        color:'white'
      },
    },
    error: {
      style: {
        background: 'red',
        color:'whitesmoke',
        fontWeight:'bold'
      },
    },
  }}/>
        </div>
      </div>
      <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
}
