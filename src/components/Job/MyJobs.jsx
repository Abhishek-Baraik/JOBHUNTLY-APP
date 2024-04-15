import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://jobhuntly-api.onrender.com/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`https://jobhuntly-api.onrender.com/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container mx-auto max-w-[90vw] p-6 bg-gray-200 bg-opacity-30 rounded-lg shadow-lg">
          <h1 className="text-[#4640DE] text-3xl font-bold mb-6 text-center">
            Your Posted Jobs
          </h1>
          <img
            src="/group.svg"
            alt="sketch"
            className="mx-auto mb-6"
            width={250}
          />

          {myJobs.length > 0 ? (
            <div className="banner grid grid-cols-1 gap-6 max-w-full">
              {myJobs.map((element) => (
                <div
                  className="card bg-white rounded-lg shadow-md p-6"
                  key={element._id}
                >
                  <div className="short_fields">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <span className="text-xl font-medium mr-2">Title:</span>
                        <input
                          className="text-xl font-semibold"
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.title}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-xl font-medium mr-2">
                          Category:
                        </span>
                        <select
                          className="h-10"
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "category",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                        >
                          <option value="">Select Category</option>
                          <option value="Design">Design</option>
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Business">Business</option>
                          <option value="Human Resource">Human Resource</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <span className="text-xl font-medium mr-2">
                          Country:
                        </span>
                        <input
                          className="text-xl font-semibold w-3/4 md:w-max"
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.country}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "country",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-xl font-medium mr-2">City:</span>
                        <input
                          className="text-xl font-semibold"
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.city}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "city",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <span className="text-xl font-medium mr-2">
                          Salary:
                        </span>
                        {element.fixedSalary ? (
                          <input
                            className="text-xl font-semibold"
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.fixedSalary}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "fixedSalary",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap w-3/4 gap-6 overflow-hidden">
                            <input
                              className="text-xl font-semibold w-1/2"
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryFrom}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryFrom",
                                  e.target.value
                                )
                              }
                            />
                            <p>To</p>
                            <input
                              className="text-xl font-semibold w-1/2"
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryTo}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryTo",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="long_field grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <span className="text-xl font-medium mr-2">
                        Description:
                      </span>
                      <textarea
                        rows={5}
                        cols={56}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl font-medium mr-2">
                        Location:
                      </span>
                      <textarea
                        rows={5}
                        cols={40}
                        value={element.location}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "location",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-xl font-medium">Expired:</span>
                    <select
                      className="bg-blue-100"
                      value={element.expired}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "expired",
                          e.target.value
                        )
                      }
                      disabled={editingMode !== element._id}
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>
                  <div className="button_wrapper mt-4 flex justify-between">
                    {editingMode === element._id ? (
                      <div className="flex gap-6">
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="px-6 py-2 bg-[#4640DE] text-white rounded-lg"
                      >
                        <img src="/edit.svg" alt="edit button" width={25} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      <img src="/delete.svg" alt="delete" width={25} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">
              You've not posted any jobs or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
