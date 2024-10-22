import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function AppliedJobs(props) {
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        axios.get(`/applicants-applied-jobs/${props.candidateId}`)
            .then((res) => {
                setAppliedJobs(res.data.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='h-full sticky top-0'>
            <div className='grid grid-cols-4 bg-gray-100'>
                <div className='p-4 font-semibold'>Job ID</div>
                <div className='p-4 font-semibold'>Job Title</div>
                <div className='p-4 font-semibold'>Applied Date</div>
                <div className='p-4 font-semibold'>Candidate Status On Job</div>
            </div>
            {
                appliedJobs.length > 0 ?
                    appliedJobs.map((value, index) => {
                        return (
                            <div key={index} className='grid grid-cols-4 hover:bg-gray-50'>
                                <div className='p-4'>#{value.job.id}</div>
                                <div className='p-4'>{value.job.job_title}</div>
                                <div className='p-4'>
                                    {
                                        new Date(value.created_at).toLocaleString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true
                                        })
                                    }
                                </div>

                                <div className='p-4'>{value.job_candidate_status}</div>
                            </div>
                        )
                    }) :
                    <div className='p-4'>No Interviews Found!</div>
            }
        </div>
    )
}

export default AppliedJobs