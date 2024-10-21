import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoLinkExternal } from "react-icons/go";


function ViewInterview() {
    const { interviewId } = useParams();
    const [allInterviews, setAllInterviews] = useState([]);
    const [interviewEvents, setInterviewEvents] = useState({
        loading: false,
        success: false,
        error: false,
    })

    useEffect(() => {
        setInterviewEvents({ loading: true, success: false, error: false });
        axios.get("/all-interviews")
            .then((res) => {
                setInterviewEvents({ loading: false, success: true, error: false });
                console.log(res.data.data)
                setAllInterviews(res.data.data)
            })
            .catch((err) => {
                setInterviewEvents({ loading: false, success: false, error: true });
                console.log(err);
            })
    }, [interviewId])


    // attempted
    // :
    // null
    // candidate_id
    // :
    // 182
    // created_at
    // :
    // "2024-10-18T16:27:10.286Z"
    // id
    // :
    // 53
    // interview_date
    // :
    // "2024-10-24"
    // interview_round
    // :
    // "1"
    // interview_time
    // :
    // "21:59"
    // interviewer
    // :
    // "36"
    // job_id
    // :
    // 105
    // remarks
    // :
    // null
    // updated_at
    // :
    // "2024-10-18T16:27:10.286Z"
    return (
        <div className='p-4 h-full w-full'>
            <button className='flex gap-3 items-center bg-gray-100 rounded-full p-2 px-4'><IoMdArrowBack /> Back</button>

            {
                interviewEvents.loading ?
                    <div className='h-[95%] w-full flex items-center justify-center'>
                        Loading Interview...</div>

                    : interviewEvents.success ?
                        <div className="mt-4">
                            <h1 className='text-2xl font-semibold mb-4'>Interview Details</h1>
                            <div className='grid grid-cols-5'>
                                <div>
                                    <div className='font-semibold'>Interview ID</div>
                                    <div className='text-gray-500'>#{interviewId}</div>
                                </div>

                                <div>
                                    <div className='font-semibold'>Interview Date</div>
                                    <div className='text-gray-500'>#{9999}</div>
                                </div>
                                
                                <div>
                                    <div className='font-semibold'>Interview Time</div>
                                    <div className='text-gray-500'>#{9999}</div>
                                </div>

                                <div>
                                    <div className='font-semibold'>Interviewer</div>
                                    <div className='text-gray-500 flex items-center gap-2'>
                                        <span>Kunal</span>
                                        <Link to={''} className='hover:text-blue-700'><GoLinkExternal /></Link>
                                    </div>
                                </div>

                                <div>
                                    <div className='font-semibold'>Job Title</div>
                                    <div className='text-gray-500'>#{9999}</div>
                                </div>
                            </div>
                        </div>


                        : <div className=''>Error</div>
            }
        </div>
    )
}

export default ViewInterview;