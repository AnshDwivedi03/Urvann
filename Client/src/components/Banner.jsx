import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-5 min-md:pl-14 pt-0 bg-gradient-to-r from-[#028f17] to-[#a9ffd8] max-w-9xl mx-9 md:mx-auto h-78 overflow-hidden'>
      
  <div className='text-white'>
    <h2 className='text-3xl font-medium'>
        Grow Green With Urvann
    </h2>
        <p className='mt-2'>Transform your home into a green paradise with India's most trusted online plants nursery. Urvann offers over 6,000+ varieties of fresh, healthy plants with guaranteed next-day delivery across India. From indoor beauties to outdoor champions, discover quality plants starting at just ₹49 and join 1L+ happy plant parents who trust Urvann for their gardening needs.</p>
        <br/>
        <p className='mt-2'>Experience the joy of gardening with Urvann's expertly curated selection of plants, pots, and gardening accessories. Whether you're a seasoned gardener or just starting out, we have everything you need to create your own green oasis at home.</p>
  </div>
  <img src={assets.banner_img} className='h-full object-cover rounded-2xl'></img>


    </div>
   
  )
}

export default Banner
