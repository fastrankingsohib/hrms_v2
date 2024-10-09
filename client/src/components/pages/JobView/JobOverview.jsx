import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Icons
import { IoTimeOutline } from "react-icons/io5";
import { GoDotFill } from 'react-icons/go';
import { FaFilePdf } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function JobOverview(props) {
    const [jobDetails, setJobDetails] = useState(props.jobDetails || {}); // Initialize from props or empty object
    const { jobId } = useParams(); // Get jobId from the URL parameters
    const [loading, setLoading] = useState(false);
    const [errorLoaded, setErrorLoaded] = useState(false); // Start with no errors
    const [successLoaded, setSuccessLoaded] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`/id_based_jobs/${jobId}`)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setJobDetails(res.data.job);
                    setSuccessLoaded(true);
                    setLoading(false);
                    setErrorLoaded(false);
                }
            })
            .catch((err) => {
                setErrorLoaded(true);
                setLoading(false);
                setSuccessLoaded(false);
            });
    }, [jobId]);


    if (loading) {
        // return <div className='p-4 pt-80 w-full flex justify-center items-center text-indigo-700'><AiOutlineLoading3Quarters className='reload-rounding' size={"30px"} /></div>;
    }

    if (errorLoaded) {
        return <div className='p-4'>Error loading job details.</div>;
    }

    return (
        <div className='grid gap-4 p-4'>
            <div>
                <span className='text-gray-400 w-60 inline-block'>Job Position</span>
                <span>{jobDetails.job_title}</span>
            </div>
            <div>
                <span className='text-gray-400 w-60 inline-block'>Openings</span>
                <span>{jobDetails.number_of_opening} Seats</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Type</span>
                <span>{jobDetails.job_type}</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Genders</span>
                <span>{jobDetails.genders}</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Required Qualifications</span>
                <span>{jobDetails.required_qualification}</span>
            </div>
            {jobDetails.experience === "Experienced Only" ? (
                <div className='grid gap-4'>
                    <div className='text-gray-400'>
                        <span className='text-gray-400 min-w-60 inline-block '>Experience Level</span>
                        <span className='text-black'>{jobDetails.min_experience} - {jobDetails.max_experience} years</span>
                    </div>
                </div>
            ) : (
                <div className='grid gap-4'>
                    <div className='text-gray-400'>
                        <span className='text-gray-400  min-w-60 inline-block '>Experience Level</span>
                        <span className='text-black'>{jobDetails.experience}</span>
                    </div>
                </div>
            )}
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Shift</span>
                <span>{jobDetails.job_shift}</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Location</span>
                <span>{jobDetails.job_location}</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Timing</span>
                <span>{jobDetails.job_timing}</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Salary Budget</span>
                <span>₹{jobDetails.min_offered_salary} - ₹{jobDetails.max_offered_salary}</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Status</span>
                <span className={`inline-flex gap-1 items-center justify-center p-1 px-3 rounded-full text-white capitalize ${jobDetails.job_status === "Active" ? "bg-green-500" : "bg-red-500"}`}>
                    <GoDotFill className={`${jobDetails.job_status === "Active" ? "text-green-200" : "text-red-200"}`} /> {jobDetails.job_status}
                </span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Description</span>
                <span>{jobDetails.job_desc}</span>
            </div>
            <div className="flex">
                <span className='text-gray-400 min-w-60 inline-block'>Job Details (PDF)</span>
                <span className='min-w-80 bg-gray-50 border border-indigo-200 rounded-2xl inline-flex justify-between items-center p-5'>
                    <div className='flex'>
                        <FaFilePdf className='text-indigo-700 mr-2' size={"40px"} />
                        <h1>
                            <div>Job Description</div>
                            <div className='text-sm'>Size: 908kb</div>
                        </h1>
                    </div>
                    <button className='ml-10 inline-flex items-center justify-center rounded-full hover:bg-gray-100 hover:border active:bg-gray-200'>
                        <MdDownload />
                    </button>
                </span>
            </div>
        </div>
    );
}

export default JobOverview;