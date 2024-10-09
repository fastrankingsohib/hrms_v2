import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AllJobPosts from '../../pages/AllJobPosts/AllJobPosts';
import { IoIosArrowUp } from "react-icons/io";

function JobsLayout() {
    const [activeButton, setActiveButton] = useState("active");
    const [dropDown, setDropDown] = useState(false);

    // Handle button click to toggle dropdown
    const handleButtonClick = (e) => {
        // e.stopPropagation();
        setDropDown(!dropDown); // Toggles the dropdown
    };

    return (
        <div className='w-full flex items-start h-full overflow-auto'>
            <div className='w-1/4 h-full border-r border-b select-none'>
                <div className='border-b flex items-start justify-between bg-white gap-2 p-2 sticky top-0 z-30'>
                    <div
                        onClick={handleButtonClick} // Trigger toggle on button click
                        className='capitalize flex justify-between w-full px-6 h-12 items-center bg-indigo-50 rounded-xl border border-indigo-200 cursor-pointer'
                    >
                        {activeButton} <span className={`${dropDown ? '' : 'rotate-180'}`}><IoIosArrowUp /></span>
                    </div>

                    {/* Dropdown menu */}
                    <div onClick={handleButtonClick} style={{ display: dropDown ? "block" : "none" }} className='absolute top-20 -translate-y-2 left-2 bg-white border p-4 rounded-lg w-3/4 shadow-xl text-left'>
                        <div className={`cursor-pointer  p-2.5 px-6 w-full rounded-xl ${activeButton === "active" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`} 
                            onClick={() => setActiveButton("active")}>
                            Active
                        </div>
                        <div className={`mt-4 cursor-pointer p-2.5 px-6 w-full rounded-xl ${activeButton === "in-active" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`} 
                            onClick={() => setActiveButton("in-active")}>
                            In-Active
                        </div>
                        <div className={`mt-4 cursor-pointer p-2.5 px-6 w-full rounded-xl ${activeButton === "all" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`} 
                            onClick={() => setActiveButton("all")}>
                            All
                        </div>
                    </div>

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
    );
}

export default JobsLayout;