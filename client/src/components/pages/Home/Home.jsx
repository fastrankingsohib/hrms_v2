import React, { useEffect } from 'react'
import dashboard_hello from "../../../assets/hooks/dashboard-hello.svg"
import dashboard_hello_video from "../../../assets/hooks/Hello.mp4"
import { json, Navigate, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Home() {
  localStorage.setItem("user", JSON.stringify({}));
  localStorage.setItem("userDetails", JSON.stringify({}));
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  const userDetails = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null
  const location = useNavigate()
  useEffect(() => {
    // if (user === null || userDetails === null) {
    //   location("/login");
    // }
    axios.get("/all-candidates")
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
        if(err.status === 401){
          location('/login')
        }
      })
    console.log(userDetails, user)
  }, [])
  return (
    <div className='h-full w-full flex items-center justify-center'>
      {/* <img src={dashboard_hello} width={"300px"} alt="" /> */}
      <video src={dashboard_hello_video} width={"500px"} autoPlay={true} loop={true} muted={true} controls={false}></video>
    </div>
  )
}

export default Home