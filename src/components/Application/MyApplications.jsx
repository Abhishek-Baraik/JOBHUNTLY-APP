import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";
import Button from "../Button";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { user, isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("https://jobhuntly-api.onrender.com/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("https://jobhuntly-api.onrender.com/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const deleteApplication = async (id) => {
    try {
      await axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplications) =>
            prevApplications.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <section className="my_applications page flex justify-center">
        {user && user.role === "Job Seeker" ? (
          <div className="container mx-auto flex flex-col items-center justify-center w-full md:max-w-[80vw]  bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg shadow-lg">
            <h3 className="text-[#4640DE] text-3xl font-bold mb-1 text-center">
              My Applications
            </h3>
            <img
              src="/group.svg"
              alt="sketch"
              className="mx-auto mb-6"
              width={250}
            />
            {applications.length <= 0 ? (
              <h3 style={{ textAlign: "center" }}>No Applications Found!</h3>
            ) : (
              applications.map((element) => {
                return (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                );
              })
            )}
          </div>
        ) : (
          <div className="container mx-auto flex flex-col items-center justify-center w-full md:max-w-[80vw]  bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg shadow-lg">
            <h3 className="text-[#4640DE] text-3xl font-bold mb-1 text-center">Applications from Job Seekers</h3>
            <img
              src="/group.svg"
              alt="sketch"
              className="mx-auto mb-6"
              width={250}
            />
            {applications.length <= 0 ? (
              <h3 style={{ textAlign: "center" }} className="text-[#4640DE] text-3xl font-bold mb-1 text-center">No Applications Found!</h3>
            ) : (
              applications.map((element) => {
                return (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                  />
                );
              })
            )}
          </div>
        )}
        <div>
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
          
        )}
        </div>
      </section>
    </>
  );
};

export default MyApplications;

const EmployerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-around md:bg-white rounded-lg shadow-md md:p-6 w-full md:w-[90%] mb-10">
      <div className="job_seeker_card p-4 w-full md:w-2/3">
          <div className="grid grid-cols-2 grid-rows-2 w-full">
          <p className="flex justify-start items-center text-sm">
            <span className="md:w-16">Name : </span>
            {element.name}
          </p>
          <p className="md:mt-4 flex justify-start items-center text-sm">
            <span className="md:w-16">Email : </span>
            {element.email}
          </p>
          <p className="flex justify-start items-center text-sm">
            <span className="md:w-16">Phone : </span>
            {element.phone}
          </p>
          <p className=" flex justify-start items-center text-sm">
            <span className="mr-2 w-3/4 md:w-16">Address :</span>
            {element.address}
          </p>
          </div>
          <div className="grid grid-cols-2 mt-10">
          <p className="text-sm">
            <span>CoverLetter : </span>
            {element.coverLetter}
          </p>
        <div className="resume flex justify-center items-center">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
            width={100}
          />
        </div>
        </div>
      </div>
        </div>
    </>
  );
};
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
    <div className="flex flex-col md:flex-row gap-2 items-center justify-around md:bg-white rounded-lg shadow-md md:p-6 w-full md:w-[90%] mb-10">
      <div className="job_seeker_card p-4 w-full md:w-2/3">
          <div className="grid grid-cols-2 grid-rows-2 w-full">
          <p className="flex justify-start items-center text-sm">
            <span className="md:w-16">Name : </span>
            {element.name}
          </p>
          <p className="md:mt-4 flex justify-start items-center text-sm">
            <span className="md:w-16">Email : </span>
            {element.email}
          </p>
          <p className="flex justify-start items-center text-sm">
            <span className="md:w-16">Phone : </span>
            {element.phone}
          </p>
          <p className=" flex justify-start items-center text-sm">
            <span className="mr-2 w-3/4 md:w-16">Address :</span>
            {element.address}
          </p>
          </div>
          <div className="grid grid-cols-2 mt-10">
          <p className="text-sm">
            <span>CoverLetter : </span>
            {element.coverLetter}
          </p>
        <div className="resume flex justify-center items-center">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
            width={100}
          />
        </div>
        </div>
      </div>
        <div className="btn_area mb-10">
          <Button bgColor="bg-red-500" className="px-4 py-1 rounded-lg" onClick={() => deleteApplication(element._id)}>
            <img src="/delete.svg" alt=" delete application" width={25} />
          </Button>
        </div>
        </div>
    </>
  );
};
