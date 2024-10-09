import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobOverview from './JobOverview';
import AllApplicants from './AllApplicants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

function JobView() {
    const { jobId } = useParams(); // React Router hook to get jobId from the URL
    const [loading, setLoading] = useState(false);
    const [errorLoaded, setErrorLoaded] = useState(false); // Changed from true
    const [successLoaded, setSuccessLoaded] = useState(false);
    const [selectedTab, setSelectedTab] = useState("overview");
    const Navigate = useNavigate()
    const [popups, setPopups] = useState({
        delete: false,
        editDetails: false
    })

    const [jobDetails, setJobDetails] = useState({
        job_title: "",
        job_type: "",
        job_location: "",
        number_of_opening: "",
        interview_timing: "",
        job_timing: "",
        required_qualification: "",
        skills: "",
        min_offered_salary: "",
        max_offered_salary: "",
        job_shift: "",
        genders: "",
        job_desc: "",
        experience: "",
        min_experience: "",
        max_experience: "",
        job_status: "",
        job_exp_date: "08-25-2024",
        job_scheduled_date: "10-25-2024"
    });

    const handleDelete = (e) => {
        setPopups((values) => ({ ...values, delete: true }));
        e.preventDefault();
        axios.get(`/delete/${jobId}`)
            .then((res) => {
                console.log(res.data)
                Navigate("/jobs")
            })
            .catch((err) => {
                console.log(err)
            })
    }

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
            <div className='h-full w-full overflow-auto relative'>

                {/* Confirm Delete */}
                <div style={{ display: popups.delete ? "flex" : "none" }} className='backdrop-blur-sm h-full w-full absolute flex items-center justify-center'>
                    <div className='w-96 bg-white border p-4 text-center py-10 rounded-3xl relative'>
                        <button className='inline-flex items-center justify-center h-10 w-10 bg-gray-100 rounded-full border absolute -top-4 -right-4'
                            onClick={() => setPopups((values) => ({ ...values, delete: false }))}
                        ><IoMdClose size={"15px"} /></button>
                        <h1 className='text-red-500'>Do You Really <strong>Want to Delete</strong>?</h1>
                        <button className='p-2 px-4 bg-red-500 text-white rounded-xl mt-4' onClick={handleDelete}>Delete Confirm</button>
                    </div>
                </div>

                {/* Edit Details */}



                <h1 className='px-4 h-[2.18em] text-3xl font-semibold border-b pb-0 flex justify-between items-center sticky top-0 bg-white z-30'>
                    {jobDetails.job_title}


                    <div className='flex gap-4'>
                        <button onClick={() => setSelectedTab("overview")}
                            className={`${selectedTab === "overview" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                            Overview
                        </button>

                        <button onClick={() => setSelectedTab("applied candidates")}
                            className={`${selectedTab === "applied candidates" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                            Applied Candidates
                        </button>
                    </div>
                </h1>
                {/* <div className='min-h-[20px] border-b flex items-center px-4 gap-4'>


                    <button onClick={() => setSelectedTab("rejected candidates")}
                        className={`${selectedTab === "rejected candidates" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                        Rejected Candidates
                    </button>

                    <button onClick={() => setSelectedTab("approved candidates")}
                        className={`${selectedTab === "approved candidates" ? "bg-indigo-700 text-white" : "bg-gray-100"} inline-flex items-center justify-center rounded-full border h-10 px-4 min-w-32`}>
                        Approved Candidates
                    </button>
                </div> */}
                {/* Render your JobOverview or other components based on the selectedTab */}



                <div className={`${selectedTab === "overview" ? "block" : "hidden"}`}>
                    <JobOverview jobDetails={jobDetails} />
                    <div className='p-4'>
                        <h1 className='font-semibold flex items-center mb-4'><span className='min-w-fit mr-4 text-2xl text-red-500'>Danger Zone</span> <div className='h-0.5 w-full bg-gray-200'></div></h1>
                        <div className='flex gap-4'>
                            <button className='h-10 px-4 border rounded-xl inline-flex gap-2 items-center'
                                onClick={() => {
                                    setPopups((values) => ({ ...values, editDetails: true }));
                                    Navigate(`/jobs/update/${jobId}`);
                                }}
                            ><MdEdit /> Edit This Job</button>
                            <button className='h-10 px-5 text-red-500  border border-red-500 rounded-xl'>Make it {jobDetails.job_status === "active" || jobDetails.job_status === "Active" ? "Inactive" : "Active"}</button>
                            <button className='h-10 px-5 bg-red-500 text-white rounded-xl'
                                onClick={() => setPopups((values) => ({ ...values, delete: true }))}
                            >Delete This Job</button>
                        </div>
                    </div>
                </div>
                <div className={`h-full ${selectedTab === "applied candidates" ? "block" : "hidden"}`}><AllApplicants jobDetails={jobDetails} /></div>
            </div>
        );
    }

    return null; // Default fallback in case none of the above conditions match
}

export default JobView;