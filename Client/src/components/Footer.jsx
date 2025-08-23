import React from 'react'
import { assets } from '../assets/assets'

const Fotter = () => {
  return (
    <div>

        <div className='text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    <img src={assets.logo}alt="logo" className=' h-8 md:h-9' />
                    <p className='max-w-80 mt-6'>
                      Urvann is your one-stop online nursery for plants, planters, gardening accessories, and tools. Order fresh plants and get free home delivery on the next day!


                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                      <a href=""><img src={assets.facebook_logo} className='w-5 h-5'></img></a>
                      <a href=""><img src={assets.instagram_logo} className='w-5 h-5'></img></a>
                      <a href=""><img src={assets.twitter_logo} className='w-5 h-5'></img></a>
                      <a href=""><img src={assets.gmail_logo} className='w-5 h-5'></img></a>
                       
                        
                    </div>
                </div>

                <div>
                    <p className='text-base text-gray-800'>Quick Links</p>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>
                <div>
                    <p className='text-base text-gray-800'>Resources</p>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms Of Services</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>
                <div>
                    <p className='text-base text-gray-800'>Contact</p>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li>201310 Greater Nodia </li>
                        <li>+91 6537829193</li>
                        <li>demo@gmail.com</li>
                       
                    </ul>
                </div>



            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a><span> |</span> </li>
                    <li><a href="#">Terms</a><span> |</span></li>
                    <li><a href="#">Cookies</a><span> |</span></li>
                </ul>
            </div>
        </div>
 



    </div>
  )
}

export default Fotter
