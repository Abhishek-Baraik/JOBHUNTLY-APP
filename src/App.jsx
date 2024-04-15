import React,{useEffect,useContext} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Context} from './main'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import Navbar from './components/Home/Navbar'
import Footer from './components/Home/Footer'
import PostJob from './components/Job/PostJob'
import MyJobs from './components/Job/MyJobs'
import MyApplications from './components/Application/MyApplications'
import Application from './components/Application/Application'
import NotFound from './components/NotFound/NotFound'
import Categories from './components/Home/Categories'
import FeaturedJobs from './components/Home/FeaturedJobs'
import axios from 'axios'
import { Toaster } from 'react-hot-toast' 

const App = () => {
  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context);
  
  useEffect(() => {
    const fetchUser = async() =>{
      try {
        const response = await axios.get("https://jobhuntly-api.onrender.com/api/v1/user/getuser",{withCredentials:true})

        setUser(response.data.user)
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
    };
    fetchUser()
  }, [isAuthorized])


  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/featured' element={<FeaturedJobs/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/job/getall' element={<Jobs/>}/>
        <Route path='/job/post' element={<PostJob/>}/>
        <Route path='/job/me' element={<MyJobs/>}/>
        <Route path='/jobs/:id' element={<JobDetails/>}/>
        <Route path='/application/:id' element={<Application/>}/>
        <Route path='/applications/me' element={<MyApplications/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </BrowserRouter>
    </>
  )
}

export default App
