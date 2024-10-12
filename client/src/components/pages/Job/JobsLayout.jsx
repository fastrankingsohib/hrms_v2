import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AllJobPosts from './AllJobPosts';
import { IoIosArrowUp } from "react-icons/io";

function JobsLayout() {
    const [activeButton, setActiveButton] = useState("all");
    const [dropDown, setDropDown] = useState(false);
    const location = useLocation();

    // Handle button click to toggle dropdown
    const handleButtonClick = (e) => {
        // e.stopPropagation();
        setDropDown(!dropDown); // Toggles the dropdown
    };

    useEffect(() => {
        // setActiveButton("all")
    }, [location])

    return (
        <div className='w-full flex items-start h-full overflow-hidden'>
            <div className='w-1/4 h-full border-r border-b select-none'>
                <div className='border-b flex items-start justify-between bg-white gap-2 p-2 sticky top-0 z-30'>
                    <div
                        onClick={handleButtonClick} // Trigger toggle on button click
                        className='capitalize flex justify-between w-full px-6 h-12 items-center bg-indigo-50 rounded-xl border border-indigo-200 cursor-pointer'
                    >
                        {activeButton} <span className={`${dropDown ? '' : 'rotate-180'}`}><IoIosArrowUp /></span>
                    </div>

                    {/* Dropdown menu */}
                    <div onClick={handleButtonClick} style={{ display: dropDown ? "block" : "none" }} className='absolute top-20 -translate-y-2 left-2 bg-white border p-4 pt-2 rounded-lg w-[97%] shadow-xl text-left flex flex-wrap'>
                        <div className={`mt-2 p-2.5 px-6 w-full rounded-xl ${activeButton === "all" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`} 
                            onClick={() => setActiveButton("all")}>
                            All
                        </div>
                        <div className={`mt-2 p-2.5 px-6 w-full rounded-xl ${activeButton === "active" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`} 
                            onClick={() => setActiveButton("active")}>
                            Active
                        </div>
                        <div className={`mt-2 p-2.5 px-6 w-full rounded-xl ${activeButton === "in-active" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`} 
                            onClick={() => setActiveButton("in-active")}>
                            In-Active
                        </div>
                        <div className={`mt-2 p-2.5 px-6 w-full rounded-xl ${activeButton === "scheduled" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`} 
                            onClick={() => setActiveButton("scheduled")}>
                            Scheduled
                        </div>
                    </div>

                    <Link to={"/jobs/new-job"} className='h-12 inline-flex items-center justify-center p-2 w-full bg-indigo-700 text-white text-2xl max-w-12 rounded-xl'>+</Link>
                </div>

                <div className='grid h-full overflow-auto pb-20'>
                    <AllJobPosts activeSelection={activeButton} linkLocation={location} />
                </div>
            </div>
            <div className='w-3/4 h-full'>
                <Outlet />
            </div>
        </div>
    );
}

export default JobsLayout;