import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyCandidates() {
    const [myCandidates, setMyCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.get("/all-candidates")
            .then((response) => {
                setSuccess(true);
                setLoading(false);
                setError(false);
                setMyCandidates(response.data.candidates);
                setTimeout(() => {
                    console.log(response.data.candidates)
                }, 2000)

                // setTimeout(() => {
                //     setSuccess(false)
                // }, 3000)
            })
            .catch((err) => {
                setSuccess(true);
                setLoading(false);
                setError(true);
                setTimeout(() => {
                    setError(false)
                }, 3000)
            })
    }, [])

    const handleDelete = (candidate, candidateId) => {
        let confirmDelete = window.confirm(`Do You Want to Delete ${candidate}`);
        axios.get(`delete-candidate/${candidateId}`)
            .then((res) => {})
            .catch((err) => console.log(err))
    }

    const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    // if (myCandidates.length < 1) {
    //     return (
    //         <div className='p-5'>
    //             {
    //                 skeleton.map((value, index) => {
    //                     return (
    //                         <div className='grid grid-cols-6' key={index}>
    //                             <div className='p-2'><span className='inline-block h-8 w-full bg-gray-100 rounded-full skeleton-line-animate'></span></div>
    //                             <div className='p-2'><span className='inline-block h-8 w-full bg-gray-100 rounded-full skeleton-line-animate'></span></div>
    //                             <div className='p-2'><span className='inline-block h-8 w-full bg-gray-100 rounded-full skeleton-line-animate'></span></div>
    //                             <div className='p-2'><span className='inline-block h-8 w-full bg-gray-100 rounded-full skeleton-line-animate'></span></div>
    //                             <div className='p-2'><span className='inline-block h-8 w-full bg-gray-100 rounded-full skeleton-line-animate'></span></div>
    //                             <div className='p-2'><span className='inline-block h-8 w-full bg-gray-100 rounded-full skeleton-line-animate'></span></div>
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </div>
    //     )
    // }
    return (
        <div>
            <div className='grid grid-cols-6'>
                <div className='p-2 border-r border-b text-white'>
                    Action
                </div>
                <div className='p-3 border-r border-b'>Name</div>
                <div className='p-3 border-r border-b'>{0}</div>
                <div className='p-3 border-r border-b'>{0}</div>
                <div className='p-3 border-r border-b'>{0}</div>
                <div className='p-3 border-r border-b'>{0}</div>
            </div>
            {
                myCandidates.map((value, index) => {
                    return (
                        <div className='grid grid-cols-6' key={index}>
                            <div className='p-2 border-r border-b text-white'>
                                <button className='w-2/4 h-full bg-[green] opacity-80 hover:opacity-100'>View</button>
                                <button className='w-2/4 h-full bg-[red] opacity-80 hover:opacity-100'
                                    onClick={() => {
                                        handleDelete(value.first_name, value.candidate_id)
                                    }}
                                >Delete</button>
                            </div>
                            <div className='p-3 border-r border-b'>{`${value.title} ${value.first_name} ${value.middle_name} ${value.last_name}`}</div>
                            <div className='p-3 border-r border-b'>{0}</div>
                            <div className='p-3 border-r border-b'>{0}</div>
                            <div className='p-3 border-r border-b'>{0}</div>
                            <div className='p-3 border-r border-b'>{0}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyCandidates