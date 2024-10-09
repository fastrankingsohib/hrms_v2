import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go';
import { Link, NavLink } from 'react-router-dom'

function AllJobPosts() {
    const [allJobs, setAllJobs] = useState([]);
    const [dataLoading, setDataLoading] = useState();
    const [dataSucess, setDataSuccess] = useState();
    const [dataError, setDataError] = useState();

    useEffect(() => {
        axios.get("/display_jobs")
            .then((res) => {
                setAllJobs(res.data.jobs);
                setDataSuccess(true)
                setDataError(false)
                setDataLoading(false)
            })
            .catch((err) => {
                setDataError(true)
                setDataError(false)
                setDataLoading(false)
            })
    })
    return (
        <div>
            {
                allJobs.length > 0 ?
                    allJobs.map((job, jobIndex) => {
                        return (
                            <NavLink to={`/jobs/view/${job.id}`} className={({ isActive }) => `${isActive ? "bg-indigo-50 border-indigo-700" : "hover:bg-gray-50 border-l-transparent"} border-l-4 min-h-20 flex p-2 gap-2`} key={jobIndex}>
                                <div className='w-[10%] flex items-center justify-center'>
                                    <label className="custom-checkbox">
                                        <input type="checkbox" />
                                        <span className="checkbox-custom"></span>
                                    </label>
                                </div>
                                <div className='w-[90%] block'>
                                    <h1 className='flex items-center justify-between'>{job.job_title} <span className={`inline-flex items-center rounded-full text-xs ml-2 ${job.job_status === "active" || job.job_status === "Active" ? "text-green-500" : "text-red-500"}`}><GoDotFill size={"10px"} className='mr-0.5 inline-block -translate-y-[1px]' /> {job.job_status ? job.job_status : "---"}</span></h1>
                                    <div className='flex flex-wrap gap-2 pt-2'>
                                        <span className='p-1 px-2 bg-gray-200 rounded-full text-xs'>{job.job_type}</span>
                                        <span className='p-1 px-2 bg-gray-200 rounded-full text-xs ml-2'>₹{job.min_offered_salary} -₹{job.max_offered_salary}</span>
                                        <span className='p-1 px-2 bg-gray-200 rounded-full text-xs ml-2'>{job.number_of_opening} Seats</span>
                                    </div>
                                </div>
                            </NavLink>

                        )
                    })
                    : "No Jobs Found"
            }
        </div>
    )
}

export default AllJobPosts