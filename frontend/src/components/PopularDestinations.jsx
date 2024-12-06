import React, { useState } from 'react'
import { assets } from '../assets/assets'
 
const PopularDestinations = () => {

  

  return (
    <div className='px-40 py-5'>
        <div>
            <h1 className='text-4xl font-semibold'>Popular Destinations</h1>
            <p className=''> We have selected some best locations around the world for you.</p>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 ">
      {assets.map((asset, index) => (
        <div
          key={index}
          className="border rounded-2xl shadow-md overflow-hidden bg-white hover:scale-105 transition ease-in-out duration-300"
        >
          <img
            src={asset.image}
            alt={asset.place}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{asset.place}</h2>
            <p className="text-gray-600 mt-2">{asset.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default PopularDestinations