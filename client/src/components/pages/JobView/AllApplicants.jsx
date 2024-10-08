import React, { useState } from 'react'

function AllApplicants(props) {
    const [jobDetails, setJobDetails] = useState(props.jobDetails);
    const [selectedTab, setSelectedTab] = useState("all")
    const [allCandidates, setAllCandidates] = useState([
        { id: 1, status: 'Pending', appliedDate: '2024-10-01', name: 'John Doe', experience: '2 years', phone: '123-456-7890', email: 'john@example.com' },
        { id: 2, status: 'Shortlisted', appliedDate: '2024-10-02', name: 'Jane Smith', experience: '5 years', phone: '987-654-3210', email: 'jane@example.com' },
        { id: 3, status: 'Rejected', appliedDate: '2024-10-03', name: 'Alex Brown', experience: '1 year', phone: '555-123-4567', email: 'alex@example.com' },
        // Add more candidates as needed
    ]);

    return (
        <div className='p-4'>
            <div className='grid grid-cols-3 gap-4'>
                <button
                    onClick={() => setSelectedTab("all")}
                    className={`${selectedTab === "all" ? 'bg-indigo-700 text-white' : 'bg-gray-100'} text-xl inline-block h-28 px-5 rounded-xl border`}>
                    <div className='text-xl'>All Applicants</div>
                    <div className='text-3xl'>20</div>
                </button>

                <button
                    onClick={() => setSelectedTab("selected")}
                    className={`${selectedTab === "selected" ? 'bg-indigo-700 text-white' : 'bg-gray-100'} inline-block h-28 px-5 rounded-xl border`}>
                    <div className='text-xl'>Approved Applicants</div>
                    <div className='text-3xl'>10</div>
                </button>

                <button
                    onClick={() => setSelectedTab("rejected")}
                    className={`${selectedTab === "rejected" ? 'bg-indigo-700 text-white' : 'bg-gray-100'} text-xl inline-block h-28 px-5 rounded-xl border`}>
                    <div className='text-xl'>Rejected Applicants</div>
                    <div className='text-3xl'>10</div>
                </button>
            </div>



            <div className='mt-10'>
                <div>
                    {/* Header */}
                    <div className='grid grid-cols-7 font-semibold'>
                        <div className='border p-2.5 border-r-0'>Candidate ID</div>
                        <div className='border p-2.5 border-r-0'>Status</div>
                        <div className='border p-2.5 border-r-0'>Applied Date</div>
                        <div className='border p-2.5 border-r-0'>Candidate Name</div>
                        <div className='border p-2.5 border-r-0'>Work Experience</div>
                        <div className='border p-2.5 border-r-0'>Phone Number</div>
                        <div className='border p-2.5'>Email ID</div>
                    </div>

                    {/* Data Rows */}
                    <div className='grid grid-cols-7'>
                        {allCandidates.map(candidate => (
                            <React.Fragment key={candidate.id}>
                                <div className='border p-2.5 border-r-0 border-t-0'>{candidate.id}</div>
                                <div className='border p-2.5 border-r-0 border-t-0'>{candidate.status}</div>
                                <div className='border p-2.5 border-r-0 border-t-0'>{candidate.appliedDate}</div>
                                <div className='border p-2.5 border-r-0 border-t-0'>{candidate.name}</div>
                                <div className='border p-2.5 border-r-0 border-t-0'>{candidate.experience}</div>
                                <div className='border p-2.5 border-r-0 border-t-0'>{candidate.phone}</div>
                                <div className='border p-2.5'>{candidate.email}</div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AllApplicants