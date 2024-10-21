import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";

function AllInterviews() {
    const [allUsers, setAllUsers] = useState([])
    let location = useLocation();
    const [allInterviews, setAllInterviews] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    useEffect(() => {
        // All Users Api
        axios.get("/user/all-users")
            .then((res) => {
                setAllUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })

        // All Interviews Api
        axios.get("/all-interviews")
            .then((res) => {
                setAllInterviews(res.data.data);
            })
            .catch((err) => {
                console.log(err)
            })

        // All Jobs Api
        axios.get("/display_jobs")
            .then((res) => {
                setAllJobs(res.data.jobs);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='h-full border-r overflow-auto'>
            <div className='h-16 flex gap-4 p-2 border-b'>
            </div>
            {
                allInterviews.length > 0 ?
                    allInterviews.map((interview, index) => {
                        return (
                            <div key={index} className={`h-20 p-3 border-b transition-small hover:shadow-xl ${location.pathname == `/interviews/view/${interview.id}` ? "bg-indigo-100" : "s"}`}>
                                <h1 className='px-3 flex items-center'>
                                    <span><input type="checkbox" className='h-4 w-4' /></span>
                                    <Link to={`view/${interview.id}`} className='block -mt-1 ml-4 font-semibold hover:underline hover:text-indigo-700'>
                                        <span>
                                            {
                                                allJobs.length > 0 ?
                                                    allJobs.map((job, jobIndex) => {
                                                        if (job.id === interview.job_id) {
                                                            return (
                                                                <span key={jobIndex}>{job.job_title == "" ? "Job Title" : job.job_title}</span>
                                                            )
                                                        }
                                                    }) : "---"
                                            }
                                        </span>
                                        {/* <span className='px-1'>- By {interview.interviewer}</span> */}
                                    </Link>
                                </h1>


                                <div className='ml-[38px] font-light flex items-center'>
                                    <span className='w-full inline-flex items-center gap-2'>
                                        <HiOutlineCalendarDays size={"14px"} />
                                        {
                                            new Date(interview.interview_date).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',  // 'short' for abbreviated month like "Oct"
                                                year: 'numeric'
                                            })
                                        }
                                    </span>

                                    <span className='w-full inline-flex items-center gap-2 ml-4'>
                                        <IoTimeOutline />
                                        {
                                            (() => {
                                                const [hours, minutes] = interview.interview_time.split(':');
                                                const date = new Date();
                                                date.setHours(hours, minutes);

                                                return date.toLocaleString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true
                                                });
                                            })()
                                        }
                                    </span>

                                    <span className='w-full inline-flex items-center gap-2 ml-4'>
                                        <FaUserTie />
                                        {
                                            allUsers.length > 0 ? 
                                            allUsers.map((value, index) => {
                                                if(value.id == interview.interviewer){
                                                    return(
                                                        <div key={index}>{`${value.first_name}`}</div>
                                                    )
                                                }
                                            }) : "o"
                                        }
                                    </span>
                                </div>

                            </div>
                        );
                    }) : <div className='p-4'>No Interviews Found!</div>
            }
        </div>
    )
}

export default AllInterviews;