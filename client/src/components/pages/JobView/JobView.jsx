import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobOverview from './JobOverview';
import AllApplicants from './AllApplicants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function JobView() {
    const { jobId } = useParams(); // React Router hook to get jobId from the URL
    const [loading, setLoading] = useState(false);
    const [errorLoaded, setErrorLoaded] = useState(false); // Changed from true
    const [successLoaded, setSuccessLoaded] = useState(false);
    const [jobDetails, setJobDetails] = useState({});
    const [selectedTab, setSelectedTab] = useState("overview");

    useEffect(() => {
        if (jobId) {
            setLoading(true); // Start loading when jobId changes

            axios.get(`/id_based_jobs/${jobId}`)
                .then((res) => {
                    if (res.data.success) {
                        setSelectedTab("overview");
                        setJobDetails(res.data.job); // Update job details on success
                        setSuccessLoaded(true); 
                        setErrorLoaded(false); // Set error to false since it succeeded
                    }
                })
                .catch(() => {
                    setErrorLoaded(true); // Handle error if the request fails
                    setSuccessLoaded(false);
                })
                .finally(() => {
                    setLoading(false); // End loading in either case
                });
        }
    }, [jobId]); // Only runs when jobId changes

    if (loading) {
        return <div className='p-4 h-full w-full bg-gray-50 flex justify-center items-center text-indigo-700'><AiOutlineLoading3Quarters className='reload-rounding' size={"30px"} /></div>;
    }

    if (errorLoaded) {
        return <div>Error loading the job details. Please try again.</div>; // Handle errors
    }

    if (successLoaded) {
        return (
            <div>
                <h1 className='p-4 text-2xl font-semibold pb-0'>{jobDetails.job_title}</h1>
                <div className='h-[4.1em] border-b flex items-center px-4 gap-4'>
                    <button onClick={() => setSelectedTab("overview")}
                        className={`${selectedTab === "overview" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                        Overview
                    </button>

                    <button onClick={() => setSelectedTab("applied candidates")}
                        className={`${selectedTab === "applied candidates" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                        Applied Candidates
                    </button>

                    {/* <button onClick={() => setSelectedTab("rejected candidates")}
                        className={`${selectedTab === "rejected candidates" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                        Rejected Candidates
                    </button>

                    <button onClick={() => setSelectedTab("approved candidates")}
                        className={`${selectedTab === "approved candidates" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                        Approved Candidates
                    </button> */}
                </div>
                {/* Render your JobOverview or other components based on the selectedTab */}



                <div className={`${selectedTab === "overview" ? "block" : "hidden"}`}><JobOverview jobDetails={jobDetails} /></div>
                <div className={`h-full ${selectedTab === "applied candidates" ? "block" : "hidden"}`}><AllApplicants jobDetails={jobDetails} /></div>
            </div>
        );
    }

    return null; // Default fallback in case none of the above conditions match
}

export default JobView;
