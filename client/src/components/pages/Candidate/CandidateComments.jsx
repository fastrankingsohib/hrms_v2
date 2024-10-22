import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CandidateComments(props) {
    const [allComments, setAllComments] = useState([]);
    useEffect(() => {
        axios.get((`/display-comments/${props.candidateId}`))
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [allComments])
    return (
        <div>
            <div className='p-4'>
                <h1 className='text-xl font-semibold'>Candidate Comments & History</h1>
                <div className='mt-4'>
                    <textarea id="add-new-comment" placeholder='Hey Recruiter, Write Your Comment For The Candidate...' className='mt-2 p-4 border bg-gray-100 rounded-lg w-full h-40'></textarea>
                    <div className='text-right'>
                        <button className='p-2.5 px-5 bg-indigo-700 text-white rounded-lg mt-2'>Post Comment</button>
                    </div>
                </div>

                <br />
                <hr />
                <br />
                <div className=''>
                    <h1 className='text-xl font-semibold'>Candidate History</h1>
                </div>
            </div>
        </div>
    )
}

export default CandidateComments