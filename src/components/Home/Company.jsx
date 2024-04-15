import React from 'react'

const Company = () => {
  return (
    <div className='mt-10 relative z-10 bg-white h-[30vh] md:h-[20vh]'>
        <p className='text-[#515B6F] md:ml-6 mb-4 ml-[1rem] text-xl'>
            Companies we helped grow
        </p>
        <div className="companies flex gap-4 mt-6 flex-wrap justify-around items-center md:justify-between md:px-6">
            <img src="vodafone2017logo.svg" alt="" width={120} className='mb-4'/>
            <img src="intel3.svg" alt="" width={120} className='mb-4'/>
            <img src="talkit-1.svg" alt="" width={120}/>
            <img src="amdlogo1.svg" alt="" width={120}/>
        </div>
    </div>
  )
}

export default Company