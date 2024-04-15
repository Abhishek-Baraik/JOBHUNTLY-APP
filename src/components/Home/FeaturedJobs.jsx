import React, { useContext } from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'
import { Context } from '../../main'
const FeaturedJobs = () => {
    const jobs = [
        {   icon:"company-logo-1@2x.png",
            title:"Email marketing",
            company:"Nomad",
            location:"Paris",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae pariatur doloribus quod consequuntur?"
        },
        {
            icon:"company-logo-2.svg",
            title:"Social Media Assistant",
            company:"Netlify",
            location:"Paris",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae pariatur doloribus quod consequuntur?"
        },
        {
            icon:"company-logo-3@2x.png",
            title:"Brand Designer",
            company:"DropBox",
            location:"San Fransisco",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae pariatur doloribus quod consequuntur?"
        },
        {   icon:"company-logo-4@2x.png",
            title:"Brand Designer",
            company:"DropBox",
            location:"San Fransisco",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae pariatur doloribus quod consequuntur?"
        },
        {
            icon:"company-logo-5.svg",
            title:"Interactive Developer",
            company:"Terraform",
            location:"Hamburg",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae pariatur doloribus quod consequuntur?"
        },
        {
            icon:"company-logo-7.svg",
            title:"Social Media Assistant",
            company:"Udacity",
            location:"Hamburg",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae pariatur doloribus quod consequuntur?"
        },
        {
            icon:"company-logo-8.svg",
            title:"HR Manager",
            company:"Packer",
            location:"Switzerland",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae pariatur doloribus quod consequuntur?"
        },
        {
            icon:"company-logo-9@2x.png",
            title:"HR Manager",
            company:"WebFlow",
            location:"Switzerland",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing annon i. Molestiae pariatur doloribus quod consequuntur?"
        },
    ]
    const {isAuthorized,user} = useContext(Context)
  return (
    <section className='relative z-10 bg-white'>
        <h3 className="md:text-[3rem] text-[2.2rem]  font-bold w-full md:ml-4">
        Featured <span className="text-[#22D3EE]">Jobs</span>
      </h3>
      <Link to={"/job/getall"} className='absolute md:top-4 md:right-8 text-lg font-semibold flex gap-2 item-center text-[#4640DE] hover:text-[#2d2d81]'>Show all Jobs <img src="Arrow-left.svg" alt="" /></Link>

      <div className="grid md:grid-cols-4 gap-6 p-4 mt-4 relative">
        {jobs.map((element)=>{
          return (
            <div className="card border-[1px] relative border-zinc-300 p-4 mb-4 flex flex-col md:flex-col md:items-start items-center justify-around md:p-8 rounded-sm">
              <img src={element.icon} alt="" width={50}/>
              <div className="mt-2 mb-2">
                <h4 className="font-semibold text-2xl mb-2">{element.title}</h4>
                <span className='flex gap-2'><h6>{element.company}</h6> <h6 className='flex'> <img src="/location.svg" alt="" /> {element.location}</h6></span>
              </div>
              <div className='text-ellipsis  overflow-hidden whitespace-nowrap h-12 w-[15rem]'>{element.description}</div>
              <div className='border-[1px] border-[#4640DE] p-1 rounded-sm text-[#4640DE] absolute top-4 right-4'>
                Full time
              </div>
              {user && user.role==="Job Seeker" ?( 
              <Button bgColor='white' textColor='text-[#4640DE]' className='border-[1px] border-[#4640DE] md:bottom-2 md:right-2 md:absolute hover:bg-[#4640DE] hover:text-white hover:transition ease-out duration-200 px-3 py-1'>Apply Now</Button>):(<></>)
          }
            </div>
          )
        })}
        </div>
    </section>
  )
}

export default FeaturedJobs
