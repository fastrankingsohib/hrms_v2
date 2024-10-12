import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GoDotFill } from 'react-icons/go';
import { IoReloadOutline } from "react-icons/io5";
import { NavLink, useLocation } from 'react-router-dom'

function AllJobPosts(props) {
    const [allJobs, setAllJobs] = useState([]);
    const [dataLoading, setDataLoading] = useState(true); // Initialize loading state
    const [dataSuccess, setDataSuccess] = useState(false); // Success state
    const [dataError, setDataError] = useState(false); // Error state
    const [filteredJobs, setFilteredJobs] = useState([]);

    const location = useLocation();

    // Fetch the jobs when activeSelection or URL changes
    useEffect(() => {
        const fetchJobs = () => {
            setDataLoading(true); // Start loading
            setDataError(false); // Reset error before request

            axios.get("/display_jobs")
                .then((res) => {
                    let jobs = [];
                    if (props.activeSelection === "active") {
                        jobs = res.data.jobs.filter(job => job.job_status === "Active");
                    } else if (props.activeSelection === "in-active") {
                        jobs = res.data.jobs.filter(job => job.job_status === "Inactive");
                    } else if (props.activeSelection === "scheduled") {
                        jobs = res.data.jobs.filter(job => job.job_status === "Scheduled");
                    } else {
                        jobs = res.data.jobs;
                    }

                    setFilteredJobs(jobs);
                    setDataSuccess(true); // Data fetched successfully
                    setDataLoading(false); // Stop loading
                })
                .catch((err) => {
                    console.log(err);
                    setDataError(true); // Handle error
                    setDataLoading(false); // Stop loading even on error
                });
        };

        fetchJobs(); // Fetch jobs when activeSelection changes
    }, [props.activeSelection, location]); // Trigger on activeSelection or URL change

    const handleReloadData = () => {
        setDataLoading(true); // Start loading
        setDataError(false); // Reset error before request

        axios.get("/display_jobs")
            .then((res) => {
                let jobs = [];
                if (props.activeSelection === "active") {
                    jobs = res.data.jobs.filter(job => job.job_status === "Active");
                } else if (props.activeSelection === "in-active") {
                    jobs = res.data.jobs.filter(job => job.job_status === "Inactive");
                } else if (props.activeSelection === "scheduled") {
                    jobs = res.data.jobs.filter(job => job.job_status === "Scheduled");
                } else {
                    jobs = res.data.jobs;
                }

                setTimeout(() => {
                    setFilteredJobs(jobs);
                    setDataSuccess(true); // Data fetched successfully
                    setDataLoading(false); // Stop loading
                }, 2000)
            })
            .catch((err) => {
                console.log(err);
                setTimeout(() => {
                    setDataError(true); // Handle error
                    setDataLoading(false); // Stop loading even on error
                }, 2000)
            });
    }

    return (
        <div>
            {
                dataLoading ? (
                    // Loader screen while data is loading
                    <div className="flex justify-center items-center h-[80vh]">
                        <div className="loader"></div>
                        <div className='p-4 h-full w-full flex justify-center items-center text-indigo-700'>
                            <AiOutlineLoading3Quarters className='reload-rounding animate-spin' size={"20px"} />
                        </div>
                    </div>
                ) : dataError ? (
                    // Error screen if the data fetching fails
                    <div className="flex justify-center flex-wrap items-center h-[84.5vh]">
                        <div>
                            <p className='text-red-500 w-full text-center'>Failed to load jobs.</p>
                            <p className='text-white w-full text-center mt-4'>
                                <button className='inline-flex gap-2 items-center bg-indigo-700 rounded-full p-2 px-5' onClick={handleReloadData}><IoReloadOutline /> Refresh</button>
                            </p>
                        </div>
                    </div>
                ) : (
                    // Render job posts if data is successfully fetched
                    filteredJobs.length > 0 ? (
                        filteredJobs.map((job, jobIndex) => {
                            return (
                                <NavLink
                                    to={`/jobs/view/${job.id}`}
                                    className={({ isActive }) => `${isActive ? "bg-indigo-50 border-l-indigo-700" : "hover:bg-gray-50 border-l-transparent"} border-b border-l-4 min-h-20 flex p-2 gap-2`}
                                    key={jobIndex}
                                >
                                    <div className='w-[10%] flex items-center justify-center'>
                                        <label className="custom-checkbox">
                                            <input type="checkbox" />
                                            <span className="checkbox-custom"></span>
                                        </label>
                                    </div>
                                    <div className='w-[90%] block'>
                                        <h1 className='flex items-center justify-between'>
                                            {job.job_title}
                                            <span className={`inline-flex items-center justify-center rounded-full text-xs ml-2  p-1 px-2 w-24
                                                    ${job.job_status === "Active" ? "bg-green-500 text-white" :
                                                    job.job_status === "Scheduled" ? "bg-orange-500 text-white" :
                                                        "bg-red-500 text-white"}`}>
                                                {/* <GoDotFill size={"10px"} className='mr-0.5 inline-block -translate-y-[1px]' />  */}
                                                {job.job_status ? job.job_status : "---"}
                                            </span>
                                        </h1>
                                        <div className='flex flex-wrap gap-2 pt-2'>
                                            <span className='p-1 px-2 bg-gray-200 rounded-full text-xs'>{job.job_type}</span>
                                            <span className='p-1 px-2 bg-gray-200 rounded-full text-xs ml-2'>₹{job.min_offered_salary} -₹{job.max_offered_salary}</span>
                                            <span className='p-1 px-2 bg-gray-200 rounded-full text-xs ml-2'>{job.number_of_opening} Seats</span>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })
                    ) : (
                        <p>No Jobs Found</p>
                    )
                )
            }
        </div>
    );
}

export default AllJobPosts;
