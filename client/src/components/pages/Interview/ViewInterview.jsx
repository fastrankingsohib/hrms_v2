import React, { useDebugValue, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";
import AllInterviews from './AllInterviews';


function ViewInterview() {
    const { interviewId } = useParams();
    const [allUsers, setAllUsers] = useState([]);
    const [jobDetails, setJobDetails] = useState();
    const [appliedJobs, setAppliedJobs] = useState([])
    const [candidateDetails, setCandidateDetails] = useState()
    const [interviewDetails, setInterviewDetails] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const [interviewEvents, setInterviewEvents] = useState({
        loading: false,
        success: false,
        error: false,
    })
    // Updated Interview Details
    const [updatedInterviewDetails, setUpdatedInterviewDetails] = useState();

    // useEffect(() => {
    //     console.log(interviewDetails)
    // }, [interviewDetails])

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
                setInterviewDetails(res.data.data[0])
                console.log(res.data.data[0])

                setUpdatedInterviewDetails({
                    attempted: res.data.data[0].attempted,
                    interview_round: res.data.data[0].interview_round,
                    interviewer: res.data.data[0].interviewer,
                    interview_time: res.data.data[0].interview_time,
                    interview_date: res.data.data[0].interview_date,
                    job_id: res.data.data[0].job_id,
                    remarks: res.data.data[0].remarks
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
        
        // console.log(updatedInterviewDetails)
    }

    if (interviewDetails) {
        return (
            <div className='p-4 h-full w-full'>
                <button className='flex gap-3 items-center bg-gray-100 rounded-full p-2 px-4'><IoMdArrowBack /> Back</button>

                {
                    interviewEvents.loading ?
                        <div className='h-[95%] w-full flex items-center justify-center'>Loading Interview...</div>

                        : interviewEvents.success ?
                            <div className="mt-4">
                                <h1 className='font-semibold mb-4'>
                                    <span className='text-2xl'>Interview Details</span>
                                    <button className={`ml-4 p-2 px-5 rounded-full ${isEditable ? "bg-green-600 text-white" : "bg-gray-100"}`} onClick={() => setIsEditable(!isEditable)}>{isEditable ? "Save Details" : "Edit Details"}</button>
                                </h1>
                                <div className='grid grid-cols-5 gap-4'>
                                    <div>
                                        <div className='font-semibold pl-2'>Interview ID</div>
                                        <div className='text-gray-500 p-2'>#{interviewId}</div>
                                    </div>

                                    <div>
                                        <div className='font-semibold pl-2'>Interview Date</div>
                                        <div className='text-gray-500 p-2'>
                                            {
                                                isEditable ? <input type="date" defaultValue={updatedInterviewDetails.interview_date} className={`p-2 ${isEditable ? "bg-gray-100" : "bg-white"}`} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, interview_date: e.target.value }))} /> :
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
                                                isEditable ? <input type="time" defaultValue={interviewDetails.interview_time} className={`p-2 ${isEditable ? "bg-gray-100" : "bg-white"}`} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, interview_time: e.target.value }))} /> :
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
                                            <select defaultValue={interviewDetails.interviewer} className={`${isEditable ? "bg-gray-100 p-2" : "bg-white"}`} disabled={!isEditable} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, interviewer: e.target.value }))}>
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
                                            <select defaultValue={interviewDetails.job_id} className={`${isEditable ? "bg-gray-100 p-2" : "bg-white"}`} disabled={!isEditable} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, job_id: e.target.value }))}>
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
                                            <input type="text" disabled={!isEditable} className={`${isEditable ? "bg-gray-100 p-2" : "bg-white"}`} defaultValue={updatedInterviewDetails.remarks ? interviewDetails.remarks : "No Remarks"} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, remarks: e.target.value }))} />
                                        </div>
                                    </div>


                                    <div>
                                        <div className='font-semibold pl-2'>Intervew Attempt Status</div>
                                        {/* <div className='text-gray-500 flex items-center gap-2'>
                                            <span>
                                                {
                                                    interviewDetails.attempted ? interviewDetails.attempted : <span className='text-orange-500'>Pending</span>
                                                }
                                            </span>
                                        </div> */}
                                        <div className='p-2'>
                                            <select disabled={!isEditable} className={`w-[90%] ${isEditable ? "bg-gray-100 p-2" : "bg-white"}`} defaultValue={updatedInterviewDetails.attempted ? updatedInterviewDetails.attempted : "Pending"} onChange={(e) => setUpdatedInterviewDetails((values) => ({ ...values, attempted: e.target.value }))}>
                                                <option value={"---"} disabled={true}>--- Change Interview Status ---</option>
                                                <option value={"Pending"}>Pending</option>
                                                <option value={"Done"}>Done</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>



                                <div className='text-right'>
                                    <button className='bg-indigo-700 text-white p-2.5 rounded-full px-5 mt-4 ml-2' onClick={hanldeUpdateInterview}>Update Details</button>
                                </div>
                            </div>


                            : <div className=''>Error</div>
                }
            </div>
        )
    }
}

export default ViewInterview;