import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CandidateInterviews(props) {
    const [allInterview, setAllInterviews] = useState([]);
    useEffect(() => {
        axios.get(`/candidate-interview/${props.candidateId}`)
            .then((res) => {
                setAllInterviews(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [props.candidateId])
    return (
        <div className='h-full sticky top-0'>
            <div className='grid grid-cols-6 bg-gray-100'>
                <div className='p-4 font-semibold'>Interview ID</div>
                <div className='p-4 font-semibold'>Interview Date</div>
                <div className='p-4 font-semibold'>Interview Time</div>
                <div className='p-4 font-semibold'>Interviewer</div>
                <div className='p-4 font-semibold'>Interview Round</div>
                <div className='p-4 font-semibold'>Remarks</div>
            </div>
            {
                allInterview.length > 0 ?
                    allInterview.map((value, index) => {
                        return (
                            <div className='grid grid-cols-6 hover:bg-gray-50'>
                                <div className='p-4'>#{value.id}</div>
                                <div className='p-4'>{value.interview_date}</div>
                                <div className='p-4'>{value.interview_time}</div>
                                <div className='p-4'>{value.interviewer}</div>
                                <div className='p-4'>{value.remarks}</div>
                            </div>
                        )
                    }) :
                    <div className='p-4'>No Interviews Found!</div>
            }
        </div>
    )
}

export default CandidateInterviews