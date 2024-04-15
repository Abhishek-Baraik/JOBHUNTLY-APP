import React from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <section className='bg-[#202430] p-6 md:p-16'>
      <div className='md:flex md:justify-around md:gap-10'>
      <div className='flex flex-col gap-4 md:w-[25vw]'>
        <div className="flex  gap-4 items-centerv md:mt-4">
          <Link to={"/"}><img alt="logo" src="/frame-3.svg" /></Link>
          <h3 className="text-2xl font-bold text-white">JobHuntly</h3>
          </div>
          <p className='text-[#6a7489]'>Great platform for the job seeker that passionate about startups. Find your dream job easier.</p>
        </div>
      <div className='grid grid-cols-2 text-[#657086] justify-center mt-4 gap-10 md:w-[15vw] cursor-pointer'>
        <ul className='flex justify-start flex-col items-start gap-4'>
          <li className='text-white font-bold'>About</li>
          <li>Companies</li>
          <li>Pricing</li>
          <li>Terms</li>
          <li>Privacy Policy </li>
        </ul>
        <ul className='flex justify-center flex-col items-start gap-4'>
          <li className='text-white font-bold'>Resources</li>
          <li>Help Docs</li>
          <li>Guide</li>
          <li>Updates</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className='text-[#657086] mt-4 md:w-[25vw]'>
        <h3 className='text-xl text-white mb-4'>Get Job Notifications</h3>
        <p>The latest job news, articles,sent to your inbox weekly.</p>
        <div className='flex flex-col md:flex-row w-full gap-2 mt-4'>
          <input type="email" placeholder='email' className='h-[6vh] rounded-sm'/>
          <Button className='w-[30vw]' bgColor='bg-[#4640DE]'>Subscribe</Button>
        </div>
      </div>
      </div>
      <div className='border-[1px] border-zinc-700 mt-3 md:mt-6'></div>
      <div className='text-center mt-6 md:flex items-center justify-between px-12'>
        <h4 className='text-[#657086]'>2024 @JobHuntly. All Rights Reserved.</h4>
        <div className='flex justify-evenly md:mt-0 mt-5 md:items-center md:justify-center md:gap-5 hover:cursor-pointer'>
          <img src="facebook.svg" alt="" />
          <img src="twitter.svg" alt="" />
          <img src="instagram.svg" alt="" />
          <img src="linkedin.svg" alt="" />
          <img src="dribbble.svg" alt="" />
        </div>
      </div>
    </section>
  )
}

export default Footer