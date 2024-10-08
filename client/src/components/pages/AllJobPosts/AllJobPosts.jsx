import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
                            <NavLink to={`/jobs/view/${job.id}`} className={({isActive}) => `${isActive ? "bg-indigo-200 border-indigo-400 border" : "hover:bg-gray-100 border-b"} h-20 flex p-2 gap-2`} key={jobIndex}>
                                <div className='w-[10%] flex items-center justify-center'><input type="checkbox" name="" id="" /></div>
                                <div className='w-[90%] block'>
                                    <h1>{job.job_title}</h1>
                                    <div>
                                        <span className='p-1 px-2 bg-gray-200 rounded-full text-xs'>{job.job_type}</span>
                                        <span className='p-1 px-2 bg-gray-200 rounded-full text-xs ml-2'>{job.job_status ? job.job_status : "---"}</span>
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