"use client"
import Products from '@/app/data/Products';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(false);
  const [Search, setSearch] = useState('');
  const [SearchData, setSearchData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!IsSidebarOpen);
  };


  const GetDataFromBrand = async () =>{
    try {
      
      console.log(Search);
      
      const data = await axios.get(`/api/GetBrand/${Search}`)
      setSearchData(data.data);
      console.log(SearchData);
    
   
    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetDataFromBrand();
  
    

  }, [Search])

  const HandleDelete =  async (id:number) =>{
    const deleteProduct = await axios.delete(`api/AdminProducts/${id}`)
    console.log("delete");
    GetDataFromBrand()
    

  }

  return (
    <div>
      <div className="relative min-h-screen md:flex">
        <div className={`bg-red-400 text-red-100 flex justify-between md:transition duration-200 ease-in-out ${IsSidebarOpen ? '' : 'md:hidden'}`}>
          <Link  href={'/'} className="black p-4 text-red-200 font-bold">
            Admin DashBoard 
          </Link>
          <button className="mobile-button p-4 focus:outline-none focus:bg-red-300" onClick={toggleSidebar}>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
        </div>
        <div
          className={`sidebar bg-red-400 text-red-100 w-64 space-y-6 py-10 px-1 absolute inset-y-0 left-0 transform ${
            IsSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
        >
          <Link href={'/'} className="flex items-center space-x-2 text-red-100">
            {/* Sidebar content */}
          <span className="px-4 text-2xl font-bold text-red-200">Admin Dashboard</span>

          </Link>
          <nav className="">
          <Link href={'/AddProduct'} className="block py-2.5 px-4 text-red-100 rounded transition duration-200 hover:bg-red-300 hover:text-red-100">Add Product</Link>
            <Link href={'/Admin'} className="block py-2.5 px-4 text-red-100 rounded transition duration-200 hover:bg-red-300 hover:text-red-100">Logout</Link>
          </nav>
        </div>
        <div className="">
          <div className='flex justify-center m-5 border-red-200 gap-4'>
  
          <Input placeholder='Search  by Brand' onChange={(e)=>setSearch(e.target.value)} />
          </div>
          {
          Search.length==0?<Products />:
           <>
          <div className="m-5  gap-5 p-5  flex justify-between flex-wrap">
        {SearchData.map((item:any)=>{
          return(
          
            <div key={item.id} className=" m-5 mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
          <Image className="rounded-xl " style={{objectFit: "fill"}} width={200} height={200} priority={true}  src={item.imageURL} alt='error'  />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="mt-5 text-2xl font-semibold">{item.title}</h1>
              <p className="mt-2">${item.discountPrice}</p>
            </div>
            <div className=''>
            <button className="mt-5 text-white text-md font-semibold bg-red-400  p-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={()=>HandleDelete(item.id)}>Delete</button>
            </div>
          </div>
        </div>
          
          )
        })}
      </div>
          </>
    
          }
        </div>
      </div>
    </div>
  );
}
