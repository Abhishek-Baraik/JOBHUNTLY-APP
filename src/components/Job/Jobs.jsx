import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("https://jobhuntly-api.onrender.com/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if(!isAuthorized){
    navigateTo("/login");
  }

  return (
    <section className="jobs mx-auto w-full">
      <div className="container flex flex-col justify-center items-center">
        <h1 className="text-[#4640DE] text-3xl font-bold">
          ALL AVAILABLE JOBS
        </h1>
        <img src="/group.svg" alt="" className="" />
        <div className=" flex gap-10 flex-wrap mt-10 mb-10 justify-center between">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card border-[1px] relative border-zinc-300 p-4 mb-4 flex flex-col md:flex-col md:items-start items-center justify-around md:p-8 rounded-sm">
                  <img src={element.icon} alt="" width={50} />
                  <div className="mt-2 mb-2">
                    <h4 className="font-semibold text-2xl mb-2 ">
                      {element.title}
                    </h4>
                    <span className="flex gap-2 flex-wrap">
                      <h6>{element.category}</h6>{" "}
                      <h6 className="flex">
                        {" "}
                        <img src="/location.svg" alt="location" width={20} />{" "}
                        {element.country}
                      </h6>
                    </span>
                  </div>
                  <div className="text-ellipsis  overflow-hidden whitespace-nowrap h-12 w-[15rem]">
                    {element.description}
                  </div>
                  <div className="border-[1px] border-[#4640DE] p-1 rounded-sm text-[#4640DE] absolute top-2 right-2">
                    Full time
                  </div>
                 
                    <Link to={`/jobs/${element._id}`} className="border-[1px] text-[#4640DE] bg-white border-[#4640DE] md:bottom-2 md:right-2 md:absolute hover:bg-[#4640DE] hover:text-white hover:transition ease-out duration-200 px-3 py-1">Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
