import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-40 py-5 border-b border-gray-200'>
        <div>
            <h1 className='text-[26px] font-bold'>logo</h1>
        </div>

        <div className='flex items-center gap-x-10'>
            <ul className='flex gap-x-10'>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
            <button className='bg-blue-600 text-white px-3 py-2 font-semibold rounded-md shadow-lg'>Login/Signup</button>
        </div>
    </div>
  )
}

export default Navbar