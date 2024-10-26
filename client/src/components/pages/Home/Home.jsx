import React, { useEffect } from 'react'
import dashboard_hello from "../../../assets/hooks/dashboard-hello.svg"
import dashboard_hello_video from "../../../assets/hooks/Hello.mp4"
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    // if(!localStorage.getItem("user")){
    //   navigate("/login")
    // }
    console.log("Calling")
    // window.location.reload();
  })
  return (
    <div className='h-full w-full flex items-center justify-center'>
        {/* <img src={dashboard_hello} width={"300px"} alt="" /> */}
        <video src={dashboard_hello_video} width={"500px"} autoPlay={true} loop={true} muted={true} controls={false}></video>
    </div>
  )
}

export default Home