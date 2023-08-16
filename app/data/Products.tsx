"use client"
import axios from 'axios'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default  function Products() {
  const [Product, setProduct] = useState([])
    const data = async () =>{
      try {
      const getData = await axios.get('api/AdminProducts')
      setProduct(getData.data);
      
      } catch (error:any) {
        console.log(error.message);
        
      }
      
      
    }

    useEffect(() => {
      data();
      
    }, [])
    
    const HandleDelete =  async (id:number) =>{
      const deleteProduct = await axios.delete(`api/AdminProducts/${id}`)
      console.log("delete");
      data()
      

    }
  return (
    
    <>
    <div className="m-5  gap-5 p-5  flex justify-between flex-wrap">
  {Product.map((item:any)=>{
    return(
      <>
      <div key={item.id} className=" m-5 mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
    <Image className="rounded-xl" src={item.imageURL} alt='error' width={300} height={200} />
    <div className="flex justify-between items-center">
      <div>
        <h1 className="mt-5 text-2xl font-semibold">{item.title}</h1>
        <p className="mt-2">${item.discountPrice}</p>
      </div>
      <div className=''>
      <button className="mt-5 text-white text-md font-semibold bg-red-400  p-3 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 " onClick={()=>HandleDelete(item.id)}>Delete</button>
        <button className=" mt-5 text-white text-md font-semibold bg-green-400 p-3  rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">Update Now</button>
      </div>
    </div>
  </div>
      </>
    )
  })}
</div>
    </>

  )
}
