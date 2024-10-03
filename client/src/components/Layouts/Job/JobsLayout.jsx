import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

function JobsLayout() {
    const [activeButton, setActiveButton] = useState("active");
    return (
        <div className='w-full flex items-start h-full overflow-auto'>
            <div className='w-1/4 h-full border-r border-b'>
                <div className='border-b flex items-start justify-between gap-2 p-2'>
                    <button className={`h-12 p-2 w-full ${activeButton === "active" ? 'bg-indigo-900 text-white' : 'border-transparent'}`} onClick={() => setActiveButton("active")}>Active</button>
                    <button className={`h-12 p-2 w-full ${activeButton === "in-active" ? 'bg-indigo-900 text-white' : 'border-transparent'}`} onClick={() => setActiveButton("in-active")}>In-Active</button>
                    <button className={`h-12 p-2 w-full ${activeButton === "all" ? 'bg-indigo-900 text-white' : 'border-transparent'}`} onClick={() => setActiveButton("all")}>All</button>
                    <Link to={"/jobs/new-job"} className='h-12 inline-flex items-center justify-center p-2 w-full bg-black text-white'>Post Job</Link>
                </div>


                <div className='grid'>
                    <div className='h-20 border-b flex p-2 gap-2'>
                        <div className='w-[10%] flex items-center justify-center'><input type="checkbox" name="" id="" /></div>
                        <Link to={'/jobs'} className='w-[90%] block hover:bg-gray-100'></Link>
                    </div>
                </div>
            </div>
            <div className='w-3/4 h-full'><Outlet /></div>
        </div>
    )
}

export default JobsLayout