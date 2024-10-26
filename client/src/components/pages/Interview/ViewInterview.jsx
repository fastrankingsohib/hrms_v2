import React, { useDebugValue, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";
import AllInterviews from './AllInterviews';
import { FiExternalLink } from "react-icons/fi";



function ViewInterview() {
    const { interviewId } = useParams();
    const [allUsers, setAllUsers] = useState([]);
    const [jobDetails, setJobDetails] = useState();
    const [appliedJobs, setAppliedJobs] = useState([])
    const [candidateDetails, setCandidateDetails] = useState()
    const [interviewDetails, setInterviewDetails] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const navigate = useNavigate()
    const [interviewEvents, setInterviewEvents] = useState({
        loading: false,
        success: false,
        error: false,
    })
    const [changeStatus, setChangeStatus] = useState({
        toggled: false,
        remarks: "",
        candidate_id: interviewDetails.candidate_id,
        job_candidate_status: "",
        job_id: interviewDetails.job_id,
        attempted: false,
        remarks: interviewDetails.remarks,
        loading: false,
        success: false,
        error: false
    })
    // Updated Interview Details
    const [updatedInterviewDetails, setUpdatedInterviewDetails] = useState();

    // useEffect(() => {
    //     console.log(interviewDetails)
    // }, [interviewDetails])
    const [appliedCandidate, setAppliedCandidate] = useState()

    useEffect(() => {
        setInterviewEvents({ loading: true, success: false, error: false });

        // All Users
        axios.get("/user/all-users")
            .then((res) => {
                setAllUsers(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })


        axios.get(`/interview-by-id/${interviewId}`)
            .then((res) => {
                setInterviewEvents({ loading: false, success: true, error: false });
                setInterviewDetails(res.data.data[0]);

                setUpdatedInterviewDetails({
                    attempted: false,
                    interview_round: res.data.data[0].interview_round,
                    interviewer: res.data.data[0].interviewer,
                    interview_time: res.data.data[0].interview_time,
                    interview_date: res.data.data[0].interview_date,
                    job_id: res.data.data[0].job_id,
                    remarks: res.data.data[0].remarks
                })

                setChangeStatus({
                    toggled: false,
                    job_candidate_status: res.data.data[0].job_candidate_status,
                    remarks: res.data.data[0].remarks,
                    candidate_id: res.data.data[0].candidate_id,
                    job_id: res.data.data[0].job_id,
                    attempted: res.data.data[0].attempted,
                })

                // Job Details
                const jobId = res.data.data[0].job_id
                axios.get(`/id_based_jobs/${jobId}`)
                    .then((res) => {
                        setJobDetails(res.data.job)
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                // Candidate Details
                axios.get(`/candidate-info/${res.data.data[0].candidate_id}`)
                    .then((res) => {
                        setCandidateDetails(res.data.candidate);
                        setAppliedJobs(res.data.candidate.candidate_applied_jobs);
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            })
            .catch((err) => {
                setInterviewEvents({ loading: false, success: false, error: true });
                console.log(err);
            });
    }, [interviewId])

    const hanldeUpdateInterview = () => {
        axios.post(`/update-interview/${interviewId}`, updatedInterviewDetails)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hanldeUpdateStatus = () => {
        setChangeStatus((values) => ({ ...values, success: false, loading: true, error: false, attempted: true }))
        axios.post(`/update-candidate-interview-status/${interviewId}`, changeStatus)
            .then((res) => {
                setChangeStatus((values) => ({ ...values, success: true, loading: false, error: false, toggled: false }))
                setTimeout(() => {
                    setChangeStatus((values) => ({ ...values, success: false, loading: false, error: false }))
                }, 2000);



                // Fecthing Interview Again
                axios.get(`/interview-by-id/${interviewId}`)
                    .then((res) => {
                        setInterviewEvents({ loading: false, success: true, error: false });
                        setInterviewDetails(res.data.data[0]);

                        setUpdatedInterviewDetails({
                            attempted: false,
                            interview_round: res.data.data[0].interview_round,
                            interviewer: res.data.data[0].interviewer,
                            interview_time: res.data.data[0].interview_time,
                            interview_date: res.data.data[0].interview_date,
                            job_id: res.data.data[0].job_id,
                            remarks: res.data.data[0].remarks
                        })

                        setChangeStatus({
                            toggled: false,
                            job_candidate_status: res.data.data[0].job_candidate_status,
                            remarks: res.data.data[0].remarks,
                            candidate_id: res.data.data[0].candidate_id,
                            job_id: res.data.data[0].job_id,
                            attempted: res.data.data[0].attempted,
                        })

                        // Job Details
                        const jobId = res.data.data[0].job_id
                        axios.get(`/id_based_jobs/${jobId}`)
                            .then((res) => {
                                setJobDetails(res.data.job)
                            })
                            .catch((err) => {
                                console.log(err);
                            })

                        // Candidate Details
                        axios.get(`/candidate-info/${res.data.data[0].candidate_id}`)
                            .then((res) => {
                                setCandidateDetails(res.data.candidate);
                                setAppliedJobs(res.data.candidate.candidate_applied_jobs);
                            })
                            .catch((err) => {
                                console.log(err)
                            })

                    })
                    .catch((err) => {
                        setInterviewEvents({ loading: false, success: false, error: true });
                        console.log(err);
                    });
            })
            .catch((err) => {
                setChangeStatus((values) => ({ ...values, success: false, loading: false, error: true }))
                setTimeout(() => {
                    setChangeStatus((values) => ({ ...values, success: false, loading: false, error: false }))
                }, 2000)
                console.log(err);
            })
        console.log(changeStatus)
    }


    // Interview Module
    let loggedInUser = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null
    let userModules = loggedInUser ? loggedInUser.modulesTouser : []
    const [candidateModule, setCandidateModule] = useState({
        assigned: false,
        create: false,
        read: false,
        update: false,
        delete: false
    })

    useEffect(() => {
        if (userModules.length > 0) {
            userModules.map((value, index) => {
                // console.log(value)
                if (value.modules.module_name === "Interviews") {
                    setCandidateModule({
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

    if (interviewDetails) {
        return (
            <div className='p-8 h-full w-full'>
                <div className='flex items-center gap-8'>
                    <button className='flex gap-3 items-center bg-gray-100 rounded-full p-2 px-4' onClick={() => navigate(-1)}><IoMdArrowBack /> Back</button>
                    <span className='text-2xl mr-4 font-bold'>Interview Details</span>
                </div>

                {
                    interviewEvents.loading ?
                        <div className='h-[95%] w-full flex items-center justify-center'>Loading Interview...</div>

                        : interviewEvents.success ?
                            <div className="mt-4 p-4 bg-gray-50 border rounded-xl">
                                <h1 className='mb-4 flex justify-between items-center'>
                                    <div>
                                        <span className='mr-4'><span className='font-semibold ml-2 text-indigo-700'>Interview Scheduled For:</span> <Link title='View Complete Candidate Profile' to={`/candidates/view/${interviewDetails.candidate_id}`} className='hover:text-indigo-700 hover:underline inline-flex items-center gap-2 ml-2'>{candidateDetails ? `${candidateDetails.title} ${candidateDetails.first_name} ${candidateDetails.middle_name} ${candidateDetails.last_name}` : ""} <FiExternalLink /></Link></span>
                                    </div>
                                    <button className={`ml-4 p-2 px-5 rounded-full border ${candidateModule.update ? "inline-block" : "hidden"} ${isEditable ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`} onClick={() => setIsEditable(!isEditable)}>{isEditable ? "Disable Edit" : "Enable to Edit Interview Details"}</button>
                                </h1>
                                <hr />
                                <div className='grid grid-cols-5 gap-4 mt-10'>
                                    <div>
                                        <div className='font-semibold pl-2'>Interview ID</div>
                                        <div className='text-gray-500 p-2'>#{interviewId}</div>
                                    </div>

                                    <div>
                                        <div className='font-semibold pl-2'>Interview Date</div>
                                        <div className='text-gray-500 p-2'>
                                            {
                                                isEditable ? <input type="date" defaultValue={updatedInterviewDetails.interview_date} className={`p-2 ${isEditable ? "bg-gray-100" : "bg-transparent"}`} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, interview_date: e.target.value }))} /> :
                                                    new Date(updatedInterviewDetails.interview_date).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })
                                            }
                                            {/* <input type='text' disabled={!isEditable} className={`p-2 ${isEditable ? "bg-gray-100" : "bg-white"}`} defaultValue={jobDetails ? jobDetails.job_title : ""} /> */}
                                        </div>
                                    </div>


                                    <div>
                                        <div className='font-semibold pl-2'>Interview Time</div>
                                        <div className='text-gray-500 p-2'>
                                            {
                                                isEditable ? <input type="time" defaultValue={interviewDetails.interview_time} className={`p-2 ${isEditable ? "bg-gray-100" : "bg-transparent"}`} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, interview_time: e.target.value }))} /> :
                                                    (() => {
                                                        const [hours, minutes] = updatedInterviewDetails.interview_time.split(':'); // Split the time string into hours and minutes
                                                        const date = new Date(); // Create a new date object
                                                        date.setHours(hours, minutes); // Set the hours and minutes

                                                        return date.toLocaleTimeString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true // Use 12-hour format with AM/PM
                                                        });
                                                    })()
                                            }
                                        </div>
                                    </div>


                                    <div>
                                        <div className='font-semibold pl-2'>Interviewer</div>
                                        <div className='text-gray-500 flex items-center gap-2 p-2'>
                                            <select defaultValue={interviewDetails.interviewer} className={`${isEditable ? "bg-gray-100 p-2" : "bg-transparent"}`} disabled={!isEditable} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, interviewer: e.target.value }))}>
                                                <option value="---" disabled={true}>--- Change Interviewer ---</option>
                                                {
                                                    allUsers.length > 0 ?
                                                        allUsers.map((value, index) => {
                                                            return (
                                                                <option key={index} value={value.id}>{`${value.title} ${value.first_name} ${value.middle_name} ${value.last_name}`}</option>
                                                            )
                                                        }) : <option>No Users Found!</option>
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='font-semibold pl-2'>Job Title</div>
                                        <div className='text-gray-500 w-[90%] flex items-center gap-2 p-2'>
                                            <select defaultValue={interviewDetails.job_id} className={`${isEditable ? "bg-gray-100 p-2" : "bg-transparent"}`} disabled={!isEditable} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, job_id: e.target.value }))}>
                                                <option value="---" disabled={true}>--- Change Job Title ---</option>
                                                {
                                                    appliedJobs.length > 0 ?
                                                        appliedJobs.map((value, index) => {
                                                            if (value.job.job_title !== "") {
                                                                return (
                                                                    <option key={index} value={value.job_id}>{value.job.job_title}</option>
                                                                )
                                                            }
                                                        }) : <option>No Applied Jobs Found!</option>
                                                }
                                            </select>
                                        </div>
                                    </div>


                                    <div>
                                        <div className='font-semibold pl-2'>Interview Round</div>
                                        <div className='text-gray-500 flex items-center gap-2'>
                                            <span className='p-2'>Round: {interviewDetails.interview_round}</span>
                                            {/* <input type='text' disabled={!isEditable} className={`p-2 ${isEditable ? "bg-gray-100" : "bg-white"}`} defaultValue={jobDetails ? jobDetails.job_title : ""} /> */}
                                        </div>
                                    </div>


                                    <div>
                                        <div className='font-semibold pl-2'>Interview Created At</div>
                                        <div className='text-gray-500 flex items-center gap-2'>
                                            <span className='p-2'>
                                                {
                                                    (() => {
                                                        const date = new Date(interviewDetails.created_at);
                                                        const formattedDate = date.toLocaleDateString('en-US', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        });

                                                        const formattedTime = date.toLocaleTimeString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true
                                                        });

                                                        return `${formattedDate} at ${formattedTime}`;
                                                    })()
                                                }
                                            </span>
                                        </div>
                                    </div>


                                    <div>
                                        <div className='font-semibold pl-2'>Last Updated</div>
                                        <div className='text-gray-500 flex items-center gap-2'>
                                            <span className='p-2'>
                                                {
                                                    (() => {
                                                        const date = new Date(interviewDetails.updated_at);
                                                        const formattedDate = date.toLocaleDateString('en-US', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        });

                                                        const formattedTime = date.toLocaleTimeString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: true
                                                        });

                                                        return `${formattedDate} at ${formattedTime}`;
                                                    })()
                                                }
                                            </span>
                                        </div>
                                    </div>



                                    <div>
                                        <div className='font-semibold pl-2'>Remarks</div>
                                        <div className='text-gray-500 flex items-center gap-2 p-2'>
                                            <input type="text" disabled={true} className={`p-2 bg-transparent`} defaultValue={updatedInterviewDetails.remarks ? interviewDetails.remarks : "No Remarks"} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, remarks: e.target.value }))} />
                                        </div>
                                    </div>


                                    <div>
                                        <div className='font-semibold pl-2'>Intervew Attempt Status</div>
                                        <div className='text-gray-500 flex items-center gap-2'>
                                            <span className='p-2'>
                                                {/* {
                                                    interviewDetails.attempted ? interviewDetails.attempted : <span className='text-orange-500'>{interviewDetails}</span>
                                                } */}

                                                {interviewDetails.attempted ? `${interviewDetails.attempted}` : "Not Attempted"}
                                            </span>
                                        </div>
                                        {/* <div className='p-2'>
                                            <select disabled={!isEditable} className={`w-[90%] ${isEditable ? "bg-gray-100 p-2" : "bg-white"}`} defaultValue={updatedInterviewDetails.attempted ? updatedInterviewDetails.attempted : "Pending"} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, attempted: e.target.value }))}>
                                                <option value={"---"} disabled={true}>--- Change Interview Status ---</option>
                                                <option value={"Pending"}>Pending</option>
                                                <option value={"Selected"}>Selected</option>
                                            </select>
                                        </div> */}
                                    </div>

                                </div>



                                <div className='text-right'>
                                    <div className={`${changeStatus.toggled ? "fixed" : "hidden"} top-0 left-0 h-full w-full backdrop-blur-sm z-40 flex items-center justify-center`}>
                                        <div className='text-left min-h-60 w-96 p-10 bg-white border shadow-xl'>
                                            <h1 className='text-xl font-semibold'>Update Interview Status</h1>

                                            <label className='mt-4 inline-block'>Select Attempt Status</label>
                                            <select
                                                className='w-full border p-2.5 rounded-md'
                                                defaultValue={""}
                                                onChange={(e) => {
                                                    const value = e.target.value === "true"; // Convert string "true" or "false" to boolean
                                                    setChangeStatus((values) => ({ ...values, attempted: value }));
                                                }}
                                            >
                                                <option value="" disabled={true}>--- Select Attempted Status ---</option>
                                                <option value={true}>Attempted</option>
                                                <option value={false}>Not Attempted</option>
                                            </select>


                                            <label className='mt-4 inline-block'>Select Updated Status</label>
                                            <select className='w-full border p-2.5 rounded-md' defaultValue={""} onChange={(e) => setChangeStatus((values) => ({ ...values, job_candidate_status: e.target.value }))}>
                                                <option value="" disabled={true}>--- Select Updated Status ---</option>
                                                <option value="Selected">Selected</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>

                                            <label className='mt-4 inline-block'>HR Remarks</label>
                                            <textarea className='block w-full p-2.5 min-h-40 rounded-md border' onChange={(e) => setChangeStatus((values) => ({ ...values, remarks: e.target.value }))} placeholder='Remarks'></textarea>


                                            <div className='flex gap-4 mt-4'>
                                                <button className='p-2.5 bg-gray-100 rounded-md w-full' onClick={() => setChangeStatus((values) => ({ ...values, toggled: false }))}>Cancel</button>
                                                <button className='p-2.5 bg-indigo-700 text-white rounded-md min-w-[60%]' onClick={hanldeUpdateStatus}>{changeStatus.loading ? "Updating..." : changeStatus.success ? "Updated" : changeStatus.error ? "Error! Try Again" : "Update Interview"}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <button className={`bg-black text-white p-2.5 rounded-full px-5 mt-4 ${candidateModule.update ? "inline-block" : "hidden"}`} onClick={() => setChangeStatus((values) => ({ ...values, toggled: true }))}>Change Interview Status</button>
                                    <button className={`bg-indigo-700 text-white p-2.5 rounded-full px-5 mt-4 ml-4 ${candidateModule.update ? "inline-block" : "hidden"}`} onClick={hanldeUpdateInterview}>Update Details</button>
                                </div>
                            </div>


                            : <div className=''>Error</div>
                }
            </div>
        )
    }
}

export default ViewInterview;