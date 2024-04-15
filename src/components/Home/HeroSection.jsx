import React,{useState,useEffect} from "react";
import Button from '../Button'
const HeroSection = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    const isMobile = windowWidth < 768;
  return (
    <section className=" flex">
      <div className="left md:p-6 md:w-[50vw]">
        <div className="flex flex-col gap-10 md:w-1/2">
          <h1 className="text-6xl font-bold leading-tight text-[#25324b]">
            Discover <br /> more than{" "}
            <span className="text-cyan-400">
              <br />
              5000+ Jobs
            </span>
          </h1>
        </div>
        <img src="group.svg" alt="" className="mt-4"/>
        <div className="md:w-3/4">
          <p className="text-[#515B6F] self-stretch relative text-lg leading-[160%] mt-10">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
        </div>
        <div className="search-box mt-6 flex flex-col items-center shadow-md p-4 md:w-full md:flex md:gap-4 md:items-center md:justify-center md:flex-row" >
            <div className="flex items-center justify-center gap-3 w-full">
            <img src="/search.svg" alt="" width={25}/>
          <input
            type="text"
            placeholder="tob title or keyword"
            className="shadow-md w-full h-[5vh] md:h-[5vh] mb-5 mt-5 rounded-sm p-4"
          />
          </div>
          <Button className="w-full md:w-[30%] px-4 py-2 hover:bg-[#2d2d81]" bgColor="bg-[#4640DE]" >Search</Button>
        </div>
      </div>
      {isMobile ? (
        // Render NOthing
        <></>
      ) : (
        // Render Image
        <div className="right flex items-center justify-center">
        <img src="job-seeker.webp" alt="" width={500}/>
      </div>
      )}
    </section>
  );
};

export default HeroSection;
