import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import Button from "../Button";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.textContent = "Please Wait...";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://jobhuntly-api.onrender.com/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      setTimeout(()=> navigateTo('/job/getall'),1000)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application py-5">
    <div className="container mx-auto flex flex-col items-center justify-center w-full max-w-3xl  bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg shadow-lg">
      <h3 className="text-[#4640DE] text-3xl font-bold mb-1 text-center">Application Form</h3>
      <img
            src="/group.svg"
            alt="sketch"
            className="mx-auto mb-6"
            width={250}
          />
      <form onSubmit={handleApplication} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-3/4">
        <div>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="col-span-full">
          <textarea
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Cover Letter"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="col-span-full">
          <label htmlFor="resume" className="text-lg">Select Resume</label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            id="resume"
            accept=".jpg, .png, .webp"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="col-span-full flex justify-center mb-6">
        <Button
              type="submit"
              bgColor="white"
              textColor="text-[#4640DE]"
              id="submitBtn"
              className=" border-[1px] border-[#4640DE] md:bottom-2 md:right-2 hover:bg-[#4640DE] hover:text-white hover:transition ease-out duration-200 px-3 py-1"
            >
              Submit  Application
            </Button>
        </div>
      </form>
    </div>
  </section>
  
  );
};

export default Application;
