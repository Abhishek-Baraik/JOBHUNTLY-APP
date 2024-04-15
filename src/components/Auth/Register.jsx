import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import Button from "../Button";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://jobhuntly-api.onrender.com/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }


  return (
    <>
      <section className=" flex flex-col items-center mt-10 mb-10">
        <div className="container flex flex-col items-center justify-center w-full mx-auto max-w-3xl p-6 bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-lg shadow-lg">
          <div className="header flex flex-col items-center">
            <img src="/frame-3.svg" alt="logo" width={50}/>
            <h3 className="text-2xl font-extrabold mt-2">JobHuntLy</h3>
          </div>
          <form className="w-1/2 flex flex-col gap-8 mt-4">
            <div className="inputTag w-full flex flex-col">
              <label className="text-[#4640DE] text-xl font-semibold mb-2">Register As</label>
              <div>
                <select value={role} className="w-full h-10 shadow-md" onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
              </div>
            </div>
            <div className="text-[#4640DE]">
              <label className="text-[#4640DE] text-xl font-semibold">Name</label>
              <div className="flex items-center justify-center gap-3 mt-2">
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full h-10 placeholder:text-[#4540de91] placeholder:p-2 shadow-md "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="inputTag">
              <label className="text-[#4640DE] text-xl font-semibold">Email Address</label>
              <div>
                <input
                  type="email"
                  className="w-full h-10 placeholder:text-[#4540de91] placeholder:p-2 shadow-md mt-2"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="inputTag">
              <label className="text-[#4640DE] text-xl font-semibold">Phone Number</label>
              <div>
                <input
                  type="number"
                  className="w-full h-10 placeholder:text-[#4540de91] placeholder:p-2 shadow-md mt-2"

                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="inputTag">
              <label className="text-[#4640DE] text-xl font-semibold">Password</label>
              <div>
                <input
                  type="password"
                  className="w-full h-10 placeholder:text-[#4540de91] placeholder:p-2 shadow-md mt-2"

                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center mb-10">
            <Button bgColor="bg-[#4640DE]" className="px-4 py-2 md:w-1/3" type="submit" onClick={handleRegister}>
              Register
            </Button>
            <h4>Already have an Account? <Link to={"/login"} className="text-[#4640DE]">Login Now</Link></h4>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
