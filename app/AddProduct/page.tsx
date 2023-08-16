"use client"

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
export default function page():React.JSX.Element {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!IsSidebarOpen);
  };
  const [InputValue, setInputValue] = useState({
    title: '',
    content: '',
    imageURL: '',
    price: '',
    discountPrice: '',
    Brand: '',
    Category:'',
  });

  const handleInputChange = (fieldName:any, value:any) => {
    setInputValue((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const { title, content, imageURL, price, discountPrice, Brand,Category } = InputValue;
    try {
      const data = await axios.post('api/AdminProducts', {
        title,
        content,
        imageURL,
        price,
        discountPrice,
        Brand,
        Category
      });

      console.log(data);
      toast.success('Product Added');
    } catch (error) {
      // Handle error
    }
  };
  return (
    <div>
      <div className="relative min-h-screen md:flex">
        <div className={`bg-red-400 text-red-100 flex justify-between md:transition duration-200 ease-in-out ${IsSidebarOpen ? '' : 'md:hidden'}`}>
          <Link href={''} className="black p-4 text-red-200 font-bold">
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
          className={`sidebar bg-red-400 text-red-100 w-64 space-y-6 py-10 px-1 absolute inset-y-0 left-0 transform ${IsSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
        >
          <Link href={'/'} className="flex items-center space-x-2 text-red-100">
            {/* Sidebar content */}
            <span className="px-4 text-2xl font-bold text-red-200">Admin Dashboard</span>

          </Link>
          <nav className="">
            <Link href={'/addProduct'} className="block py-2.5 px-4 text-red-100 rounded transition duration-200 hover:bg-red-300 hover:text-red-100">Add Product</Link>

            <Link href={'/Admin'} className="block py-2.5 px-4 text-red-100 rounded transition duration-200 hover:bg-red-300 hover:text-red-100">Logout</Link>
          </nav>
        </div>
        <div className="flex justify-center items-center w-screen h-screen">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Input
              placeholder="Title"
              className="m-2"
              value={InputValue.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <Input
              placeholder="Content"
              className="m-2"
              value={InputValue.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
            />
            <Input
              placeholder="imageURL"
              className="m-2"
              value={InputValue.imageURL}
              onChange={(e) => handleInputChange('imageURL', e.target.value)}
            />
            <Input
              placeholder="price"
              className="m-2"
              value={InputValue.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
            <Input
              placeholder="discountPrice"
              className="m-2"
              value={InputValue.discountPrice}
              onChange={(e) => handleInputChange('discountPrice', e.target.value)}
            />
            <Input
              placeholder="Brand"
              className="m-2"
              value={InputValue.Brand}
              onChange={(e) => handleInputChange('Brand', e.target.value)}
            />
         <Input
              placeholder="Category"
              className="m-2"
              value={InputValue.Category}
              onChange={(e) => handleInputChange('Category', e.target.value)}
            />
            <Button size={'lg'} className="m-2" variant={'destructive'} type="submit">
              Add product
            </Button>
            <Toaster/>
          </form>
        </div>
      </div>
    </div>
  );
}
