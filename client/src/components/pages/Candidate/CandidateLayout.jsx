import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import AllJobPosts from '../Job/AllJobPosts';
import { IoIosArrowUp } from "react-icons/io";
import axios from 'axios';
import { isAction } from '@reduxjs/toolkit';
import AllCandidates from './AllCandidates';

function CandidateLayout() {
    const [activeButton, setActiveButton] = useState("my candidates");
    const [userType, setUserType] = useState("Manager");
    const [allCandidate, setAllCandidates] = useState([]);
    const [dropDown, setDropDown] = useState(false);
    const location = useLocation();
    const user = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null

    // Handle button click to toggle dropdown
    const handleButtonClick = (e) => {
        // e.stopPropagation();
        setDropDown(!dropDown); // Toggles the dropdown
    };

    useEffect(() => {
        axios.get("/all-candidates")
            .then((res) => {
                setAllCandidates(res.data.candidates);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [modulePermitted, setModulePermitted] = useState(false)

    useEffect(() => {
        // setActiveButton("all")
        if (user.role === "Manager" || user.role === "Master Admin" || user.role === "Admin") {
            // setActiveButton("All candidates")
            setModulePermitted(true)
            setUserType(user.role)
        }
        else {
            setActiveButton("my candidates")
            setModulePermitted(false)
        }
    }, [activeButton])



    // Validation & Authorising Create Job Feature
    const [candidateModule, setCandidateModule] = useState({
        assigned: false,
        create: false,
        read: false,
        update: false,
        delete: false
    })

    useEffect(() => {
        if (user) {
            user.modulesTouser.map((value, index) => {
                if (value.modules.module_name === "Candidates") {
                    setCandidateModule({
                        assigned: true,
                        create: value.c,
                        read: value.r,
                        update: value.u,
                        delete: value.d
                    })
                }
            })
        }

        console.log(candidateModule)
    }, [])

    return (
        <div className='h-full flex overflow-hidden'>
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
                        <div className={`mt-2 p-2.5 px-6 w-full rounded-xl ${activeButton === "my candidates" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`}
                            onClick={() => setActiveButton("my candidates")}>
                            My Candidates
                        </div>
                        <div className={`${modulePermitted ? "block" : "hidden"}  mt-2 p-2.5 px-6 w-full rounded-xl ${activeButton === "all candidates" ? 'bg-indigo-700 text-white' : 'border-transparent hover:bg-indigo-50'}`}
                            onClick={() => setActiveButton("all candidates")}>
                            All Candidates
                        </div>
                    </div>

                    <NavLink to={"/candidates/new-candidate"} className={({ isActive }) => { return `${isActive ? "bg-indigo-400" : "bg-indigo-700"} ${candidateModule.create ? "inline-block" : "hidden"} h-12 inline-flex items-center justify-center p-2 w-full text-white text-2xl max-w-12 rounded-xl` }}>+</NavLink>
                </div>


                <div className='h-full overflow-auto pb-20'><AllCandidates location={location} activeButton={activeButton} userRole={userType} /></div>

            </div>
            <div className='w-3/4'><Outlet /></div>
        </div>
    )
}

export default CandidateLayout