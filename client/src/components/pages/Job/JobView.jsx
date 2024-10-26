import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobOverview from './JobOverview';
import AllApplicants from '../Job/AllApplicants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

function JobView() {
    const { jobId } = useParams(); // React Router hook to get jobId from the URL
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false); // Loading state for delete operation
    const [errorLoaded, setErrorLoaded] = useState(false);
    const [successLoaded, setSuccessLoaded] = useState(false);
    const [selectedTab, setSelectedTab] = useState("overview");
    const Navigate = useNavigate();
    const [popups, setPopups] = useState({
        delete: false,
        editDetails: false
    });

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
        setDeleteLoading(true); // Start loading animation for delete
        e.preventDefault();

        axios.get(`/delete/${jobId}`)
            .then(() => {
                setDeleteLoading(false); // Stop loading when delete is done
                Navigate("/jobs"); // Navigate to the jobs list
            })
            .catch((err) => {
                console.log(err);
                setDeleteLoading(false); // Stop loading even on error
            });
    };

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



    // Jobs Module
    let loggedInUser = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null
    let userModules = loggedInUser ? loggedInUser.modulesTouser : []
    const [jobsModule, setJobsModule] = useState({
        assigned: false,
        create: false,
        read: false,
        update: false,
        delete: false
    })

    useEffect(() => {
        if (userModules.length > 0) {
            userModules.map((value, index) => {
                if (value.modules.module_name === "Jobs") {
                    setJobsModule({
                        assigned: true,
                        create: value.c,
                        read: value.r,
                        update: value.u,
                        delete: value.d
                    });
                }
            })
        }
    }, [])




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
                <div style={{ display: popups.delete ? "flex" : "none" }} className='backdrop-blur-sm bg-indigo-700 bg-opacity-5 h-full z-50 w-full fixed top-0 left-0 flex items-center justify-center'>
                    <div className='w-96 bg-white border p-4 text-center py-10 rounded-3xl relative'>
                        <h1 className='text-indigo-700 text-xl'>Do You Really <strong className='text-xl'>Want to Delete</strong>?</h1>
                        {deleteLoading ? (
                            // Loading spinner while the job is being deleted
                            <div className='p-4 h-full w-full flex justify-center items-center text-indigo-700'>
                                <AiOutlineLoading3Quarters className='reload-rounding animate-spin' size={"30px"} />
                            </div>
                        ) : (
                            <>
                                <button className='p-2 px-4 bg-gray-50 border rounded-xl mt-4 mr-4' onClick={() => setPopups((values) => ({ ...values, delete: false }))}>Cancel Delete</button>
                                <button className='p-2 px-4 bg-indigo-700 text-white rounded-xl mt-4' onClick={handleDelete}>Delete Confirm</button>
                            </>
                        )}
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

                <div className={`${selectedTab === "overview" ? "block" : "hidden"}`}>
                    <JobOverview jobDetails={jobDetails} />
                    <div className={`p-16 pt-14 bg-gray-50 border-t mt-40 h-full ${jobsModule.delete || jobsModule.update ? "block" : "hidden"}`}>
                        <h1 className='font-semibold flex items-center mb-4'>
                            <span className={`min-w-fit mr-4 text-2xl text-red-500 ${jobsModule.delete || jobsModule.update ? "block" : "hidden"}`}>Danger Zone</span>
                        </h1>
                        <div className='flex gap-4'>
                            <button className={`h-10 px-4 border border-indigo-700 text-indigo-700 rounded-xl gap-2 items-center ${jobsModule.update ? "inline-flex" : "hidden"}`}
                                onClick={() => {
                                    setPopups((values) => ({ ...values, editDetails: true }));
                                    Navigate(`/jobs/update/${jobId}`);
                                }}
                            ><MdEdit /> Edit This Job</button>
                            <button className={`h-10 px-5 bg-red-500 text-white rounded-xl ${jobsModule.delete ? "block" : "hidden"}`}
                                onClick={() => setPopups((values) => ({ ...values, delete: true }))}>
                                Delete This Job
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`h-full ${selectedTab === "applied candidates" ? "block" : "hidden"}`}><AllApplicants jobDetails={jobDetails} jobId={jobId} /></div>
            </div>
        );
    }

    return null;
}

export default JobView;