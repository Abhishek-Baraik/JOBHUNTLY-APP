import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../main";
import Button from "../Button";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "https://jobhuntly-api.onrender.com/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => navigateTo("/"), 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <section className="flex flex-col items-center mt-10 mb-10 ">
        <div className="container flex flex-col items-center justify-center w-full mx-auto max-w-5xl p-6 bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg shadow-lg">
          <h3 className="text-[#4640DE] text-3xl font-bold">POST NEW JOB</h3>
          <img src="/group.svg" alt="" className="" />
          <form onSubmit={handleJobPost} className="w-full flex flex-col gap-5">
            <div className="wrapper w-full flex gap-10">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
                className="w-full h-10"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10"
              >
                <option value="">Select Category</option>
                <option value="Design">Design</option>
                <option value="Sales">
                Sales
                </option>
                <option value="Marketing">
                Marketing
                </option>
                <option value="Technology">
                  Technology
                </option>
                <option value="Finance">Finance</option>
                <option value="Engineering">
                  Engineering
                </option>
                <option value="Business">Business</option>
                <option value="Human Resource">
                  Human Resource
                </option>
              </select>
            </div>
            <div className="wrapper flex gap-9">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                className="w-1/2 h-10"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-1/2 h-10"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full h-12"
            />
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p className="text-red-500 mt-2">Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                    className="w-full h-10 mt-2"
                  />
                ) : (
                  <div className="ranged_salary flex gap-8">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                      className="w-1/2 h-10"
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                      className="w-1/2 h-10"
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
              className="w-full"
            />
            <Button
              type="submit"
              bgColor="white"
              textColor="text-[#4640DE]"
              className="border-[1px] border-[#4640DE] md:bottom-2 md:right-2 hover:bg-[#4640DE] hover:text-white hover:transition ease-out duration-200 px-3 py-1"
            >
              Create Job
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default PostJob;
