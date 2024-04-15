import React, { useContext } from "react";
import HeroSection from "./HeroSection";
import Company from "./Company";
import Categories from "./Categories";
import FeaturedJobs from "./FeaturedJobs";
import { Context } from "../../main";
import {useNavigate} from 'react-router-dom'
const Home = () => {
  
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate()
  
  if (!isAuthorized) {
    navigate("/login")
  }
  return (
    <div className="px-10">
      <HeroSection />
      <Company />
      <Categories />
      <FeaturedJobs />
    </div>
  );
};

export default Home;
