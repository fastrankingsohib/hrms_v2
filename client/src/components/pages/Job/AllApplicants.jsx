import { combineSlices } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6';
import { PiVaultDuotone } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';

function AllApplicants(props) {
    const location = useLocation()
    const [jobDetails, setJobDetails] = useState(props.jobDetails);
    const [selectedTab, setSelectedTab] = useState("all")
    let user = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null;

    const [appliedApplicants, setAppliedApplicants] = useState([]);
    const [shortlistedApplicants, setShortlistedApplicants] = useState([])

    useEffect(() => {
        // console.log("shortlistedApplicants")
        // console.log(shortlistedApplicants)
    }, [shortlistedApplicants])
    const [rejectedApplicants, setRejectedApplicants] = useState([])
    useEffect(() => {
        axios.get(`/job_applicants/${props.jobId}/${user.id}`)
            .then((response) => {
                setAppliedApplicants(response.data.data);
                let shortlisted = [];
                let rejected = [];

                response.data.data.map((value, key) => {
                    if (value.candidate.status === "Shortlisted" || value.candidate.status === "Offered") {
                        shortlisted.push(value);
                        console.log(value.candidate.status)
                    }

                    else if (value.candidate.status === "Rejected") {
                        rejected.push(value)
                    }
                })
                console.log(shortlisted)
                setShortlistedApplicants(shortlisted)
                setRejectedApplicants(rejected)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [location]);

    return (
        <div className='p-4 h-full bg-white'>
            <div className='grid grid-cols-3 gap-4'>
                <button
                    onClick={() => setSelectedTab("all")}
                    className={`${selectedTab === "all" ? 'bg-indigo-700 text-white' : 'bg-gray-100'} text-xl inline-block h-28 px-5 rounded-xl border`}>
                    <div className='text-xl'>All Applicants</div>
                    <div className='text-3xl'>{appliedApplicants.length}</div>
                </button>

                <button
                    onClick={() => setSelectedTab("selected")}
                    className={`${selectedTab === "selected" ? 'bg-indigo-700 text-white' : 'bg-gray-100'} inline-block h-28 px-5 rounded-xl border`}>
                    <div className='text-xl'>Shortlisted Applicants</div>
                    <div className='text-3xl'>{shortlistedApplicants.length}</div>
                </button>

                <button
                    onClick={() => setSelectedTab("rejected")}
                    className={`${selectedTab === "rejected" ? 'bg-indigo-700 text-white' : 'bg-gray-100'} text-xl inline-block h-28 px-5 rounded-xl border`}>
                    <div className='text-xl'>Rejected Applicants</div>
                    <div className='text-3xl'>{rejectedApplicants.length}</div>
                </button>
            </div>



            <div className='mt-4'>
                <div>
                    {/* Header */}
                    <div className='grid grid-cols-7 font-semibold'>
                        <div className='p-2.5'>Profile</div>
                        <div className='p-2.5'>Candidate Name</div>
                        <div className='p-2.5'>Status</div>
                        <div className='p-2.5'>Applied Date</div>
                        <div className='p-2.5'>Work Experience</div>
                        <div className='p-2.5'>Phone Number</div>
                        <div className='p-2.5'>Email ID</div>
                    </div>

                    {
                        selectedTab === "all" ?
                            appliedApplicants.map((candidate, index) => (
                                <button key={index} className='w-full text-left grid grid-cols-7 hover:bg-gray-100 rounded-xl items-center'>
                                    <div className='p-2.5'><span className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-400'><FaUserLarge size={'13px'} /></span> <span className='ml-2'>#{candidate.id}</span></div>
                                    {/* <div className='p-2.5'>{candidate.id}</div> */}
                                    <div className='p-2.5'>{`${candidate.candidate.title} ${candidate.candidate.first_name} ${candidate.candidate.middle_name} ${candidate.candidate.last_name}`}</div>
                                    {/* <div className={`p-2.5`}><span className={`p-1 px-3 inline-flex items-center justify-center text-sm rounded-full border ${candidate.status === "Pending" ? "text-orange-400 border-orange-300 bg-orange-50" : candidate.job_status === "Rejected" ? "text-red-500 border-red-300 bg-red-50" : "text-green-500 border-green-300 bg-green-50"} capitalize`}>{candidate.status}</span></div> */}
                                    <div className={`p-2.5`}><span>{candidate.candidate.status}</span></div>
                                    <div className='p-2.5'>
                                        {new Date(candidate.candidate.created_at).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }).replace(/ (\d+)/, ', $1')}
                                    </div>
                                    <div className='p-2.5'>{candidate.candidate.work_experience}</div>
                                    <div className='p-2.5'>{candidate.candidate.contact_number}</div>
                                    <div className='p-2.5'>{candidate.candidate.email_address}</div>
                                </button>
                            ))
                            : selectedTab === "selected" ?
                                shortlistedApplicants.length > 0 ?
                                    shortlistedApplicants.map((candidate, index) => (
                                        <button key={index} className='w-full text-left grid grid-cols-7 hover:bg-gray-100 rounded-xl items-center'>
                                            <div className='p-2.5'><span className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-400'><FaUserLarge size={'13px'} /></span> <span className='ml-2'>#{candidate.id}</span></div>
                                            {/* <div className='p-2.5'>{candidate.id}</div> */}
                                            <div className='p-2.5'>{`${candidate.candidate.title} ${candidate.candidate.first_name} ${candidate.candidate.middle_name} ${candidate.candidate.last_name}`}</div>
                                            {/* <div className={`p-2.5`}><span className={`p-1 px-3 inline-flex items-center justify-center text-sm rounded-full border ${candidate.status === "Pending" ? "text-orange-400 border-orange-300 bg-orange-50" : candidate.job_status === "Rejected" ? "text-red-500 border-red-300 bg-red-50" : "text-green-500 border-green-300 bg-green-50"} capitalize`}>{candidate.job_status}</span></div> */}
                                            <div className={`p-2.5`}><span>{candidate.candidate.status}</span></div>
                                            <div className='p-2.5'>
                                                {new Date(candidate.candidate.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                }).replace(/ (\d+)/, ', $1')}
                                            </div>
                                            <div className='p-2.5'>{candidate.candidate.work_experience}</div>
                                            <div className='p-2.5'>{candidate.candidate.contact_number}</div>
                                            <div className='p-2.5'>{candidate.candidate.email_address}</div>
                                        </button>
                                    )) : <div className='p-2.5 text-gray-500 h-96 w-full flex items-center justify-center'>No Shortlisted Applicants</div>
                                : rejectedApplicants.length > 0 ?
                                    rejectedApplicants.map(candidate => (
                                        <button to={''} className='w-full text-left grid grid-cols-7 hover:bg-gray-100 rounded-xl items-center'>
                                            <div className='p-2.5'><span className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-400'><FaUserLarge size={'13px'} /></span> <span className='ml-2'>#{candidate.id}</span></div>
                                            {/* <div className='p-2.5'>{candidate.id}</div> */}
                                            <div className='p-2.5'>{`${candidate.candidate.title} ${candidate.candidate.first_name} ${candidate.candidate.middle_name} ${candidate.candidate.last_name}`}</div>
                                            {/* <div className={`p-2.5`}><span className={`p-1 px-3 inline-flex items-center justify-center text-sm rounded-full border ${candidate.status === "Pending" ? "text-orange-400 border-orange-300 bg-orange-50" : candidate.job_status === "Rejected" ? "text-red-500 border-red-300 bg-red-50" : "text-green-500 border-green-300 bg-green-50"} capitalize`}>{candidate.job_status}</span></div> */}
                                            <div className={`p-2.5`}><span>{candidate.candidate.status}</span></div>
                                            <div className='p-2.5'>
                                                {new Date(candidate.candidate.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                }).replace(/ (\d+)/, ', $1')}
                                            </div>
                                            <div className='p-2.5'>{candidate.candidate.work_experience}</div>
                                            <div className='p-2.5'>{candidate.candidate.contact_number}</div>
                                            <div className='p-2.5'>{candidate.candidate.email_address}</div>
                                        </button>
                                    )) : <div className='p-2.5 text-gray-500 h-96 w-full flex items-center justify-center'>No Rejected Applicants</div>
                    }
                </div>

            </div>
        </div>
    )
}

export default AllApplicants