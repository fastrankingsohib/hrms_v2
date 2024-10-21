import React from 'react'
import dashboard_hello from "../../../assets/hooks/dashboard-hello.svg"
import dashboard_hello_video from "../../../assets/hooks/Hello.mp4"

function Home() {
  return (
    <div className='h-full w-full flex items-center justify-center'>
        {/* <img src={dashboard_hello} width={"300px"} alt="" /> */}
        <video src={dashboard_hello_video} width={"500px"} autoPlay={true} loop={true} muted={true} controls={false}></video>
    </div>
  )
}

export default Home