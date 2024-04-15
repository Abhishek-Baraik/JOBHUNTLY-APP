import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Button from "../Button";
import moment from "moment";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`https://jobhuntly-api.onrender.com/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const iconDisplay = () => {
    if (job.category === "Design") {
      return "/design.svg";
    } 
    else if (job.category === "Sales") {
      return "/sales.svg";
    }
    else if (job.category === "Marketing") {
      return "/marketing.svg";
    }
    else if (job.category === "Finance") {
      return "/finance.svg";
    }
    else if (job.category === "Technology") {
      return "/technology.svg";
    }
    else if (job.category === "Engineering") {
      return "/engineering.svg";
    }
    else if (job.category === "Business") {
      return "/business.svg";
    }
    else if (job.category === "Human Resource") {
      return "/human-resources.svg";
    }
  };

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const timeString = `${job.jobPostedOn}`;
  const postedDate = moment(timeString);

  const timeAgo = postedDate.fromNow();

  return (
    <section className="flex flex-col items-center mt-10 mb-10 ">
      <div className="container flex flex-col items-center justify-center w-full mx-auto max-w-3xl p-6 bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg shadow-lg">
        <h2 className="text-[#4640DE] text-3xl font-bold">Job Details</h2>
        <img src="/group.svg" alt="sketch" width={200} />
        <div className="banner flex flex-col justify-start mt-5 ">
          <p className="text-2xl font-medium">
            <img src={iconDisplay()} alt="" className="mb-2" width={50}/>
            <span className="text-3xl font-bold">{job.title}</span>
          </p>
          <p className="text-2xl font-medium flex mt-2 gap-2">
            <img src="/category.svg" alt="" width={25}/>
            <span className="text-lg font-normal">{job.category}</span>
          </p>
          <div className="flex items-center justify-start mt-10 gap-10">
            <div className="flex">
              <img
                src="/country.svg"
                alt="location"
                width={25}
                className="mr-2"
              />
              <p className="text-2xl font-medium">
                <span className="text-xl font-normal">{job.country}</span>
              </p>
              <img src="/dot.svg" alt="" width={25} />
              <p className="text-2xl font-medium">
                <span className="text-xl font-normal">{job.city}</span>
              </p>
            </div>
            <p className="text-2xl font-medium flex gap-2">
              <img src="/location.svg" alt="" width={25} />
              <span className="text-xl font-normal">{job.location}</span>
            </p>
          </div>
          <p className="text-2xl font-medium flex gap-2 mt-2">
            <img src="/time.svg" alt="" width={25} />
            <span className="text-xl font-normal">{timeAgo}</span>
          </p>
          <p className="text-2xl">
            {job.fixedSalary ? (
              <div className="flex gap-2 mt-2">
                <img src="/dollar1.svg" alt="" width={25} />
                <span className="text-xl font-normal">{job.fixedSalary}</span>
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                <img src="/dollar1.svg" alt="" width={25} />

                <span className="text-xl font-normal">
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              </div>
            )}
            <p className="text-2xl font-medium flex gap-2 mt-4">
              <img src="/description.svg" alt="" width={25} className="min-w-[25px]" />
              <span className="text-base font-normal">{job.description}</span>
            </p>
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link
              to={`/application/${job._id}`}
              className="border-[1px] border-[#4640DE] mt-10 md:bottom-2 md:right-2 hover:bg-[#4640DE] hover:text-white hover:transition ease-out duration-200 px-3 py-1 text-[#4640DE] bg-white text-center"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
