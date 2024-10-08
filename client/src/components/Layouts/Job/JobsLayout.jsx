import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';
import AllJobPosts from '../../pages/AllJobPosts/AllJobPosts';

function JobsLayout() {
    const [activeButton, setActiveButton] = useState("active");
    return (
        <div className='w-full flex items-start h-full overflow-auto'>
            <div className='w-1/4 h-full border-r border-b'>
                <div className='border-b flex items-start justify-between gap-2 p-2'>
                    <button className={`h-12 p-2 w-full rounded-xl ${activeButton === "active" ? 'bg-indigo-700 text-white' : 'border-transparent'}`} onClick={() => setActiveButton("active")}>Active</button>
                    <button className={`h-12 p-2 w-full rounded-xl ${activeButton === "in-active" ? 'bg-indigo-700 text-white' : 'border-transparent'}`} onClick={() => setActiveButton("in-active")}>In-Active</button>
                    <button className={`h-12 p-2 w-full rounded-xl ${activeButton === "all" ? 'bg-indigo-700 text-white' : 'border-transparent'}`} onClick={() => setActiveButton("all")}>All</button>
                    <Link to={"/jobs/new-job"} className='h-12 inline-flex items-center justify-center p-2 w-full bg-black text-white text-2xl max-w-12 rounded-xl'>+</Link>
                </div>

                <div className='grid'>
                    <AllJobPosts />
                </div>
            </div>
            <div className='w-3/4 h-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default JobsLayout