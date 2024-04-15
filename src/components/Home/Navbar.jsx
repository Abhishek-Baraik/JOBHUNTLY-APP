import Button from "../Button";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
 
const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://jobhuntly-api.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  const isMobile = windowWidth < 768;
  return (
    <nav className="flex md:px-16 md:py-4 py-2 px-4">
      {isAuthorized ? (
        <div className="container flex items-center md:justify-between justify-between w-full">
          <div className="flex justify-center gap-4 items-center">
            <Link to={"/"}>
              <img alt="logo" src="/frame-3.svg" />
            </Link>
            <h3 className="text-2xl font-extrabold">JobHuntly</h3>
          </div>
          {isMobile ? (
            <div className="mt-3 scale-150">
              <img src="/icon.svg" alt="" />
            </div>
          ) : (
            <ul
              className={
                !show
                  ? " text-nowrap font-semibold text-lg text-[#757379] md:flex md:gap-6 md:items-center"
                  : ""
              }
            >
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to={"/job/getall"} onClick={() => setShow(false)}>
                  ALL JOBS
                </Link>
              </li>
              <li>
                <Link to={"/applications/me"} onClick={() => setShow(false)}>
                  {user && user.role === "Employer"
                    ? "APPLICANT'S APPLICATIONS"
                    : "MY APPLICATIONS"}
                </Link>
              </li>
              {user && user.role === "Employer" ? (
                <>
                  <li>
                    <Link to={"/job/post"} onClick={() => setShow(false)}>
                      POST NEW JOB
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/me"} onClick={() => setShow(false)}>
                      VIEW YOUR JOBS
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              <Button
                bgColor="bg-[#4640DE]"
                className="shadow-lg mr-4 hover:shadow-2xl px-4 py-2 font-semibold hover:bg-[#2d2d81]"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </ul>
          )}
        </div>
      ) : (
        <div className="container flex items-center md:justify-between justify-between w-full">
          <div className="flex justify-center gap-4 items-center">
            <Link to={"/"}>
              <img alt="logo" src="/frame-3.svg" />
            </Link>
            <h3 className="md:text-2xl text-lg font-extrabold">JobHuntly</h3>
          </div>
            <div>
              <Link
                bgColor="bg-[#4640DE]"
                className="shadow-lg rounded-md mr-4 hover:shadow-2xl px-4 py-2 font-semibold"
                to={"/register"}
              >
                Sign Up
              </Link>
              <Link
                bgColor="bg-[#4640DE]"
                className="shadow-lg bg-[#4640DE] hover:bg-[#2d2d81] text-white rounded-md mr-4 hover:shadow-2xl px-4 py-2 font-semibold"
                to={"/login"}
              >
                Login
              </Link>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
