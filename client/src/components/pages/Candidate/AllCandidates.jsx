import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link, NavLink, useParams } from 'react-router-dom';

function AllCandidates() {
    const [activeButton, setActiveButton] = useState("all");
    const [allCandidates, setAllCandidates] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [dropDown, setDropDown] = useState(false);

    // Handle button click to toggle dropdown
    const handleButtonClick = (e) => {
        setDropDown(!dropDown); // Toggles the dropdown
    };

    useEffect(() => {
        setLoading(true); // Start loading
        axios.get("/all-candidates")
            .then((res) => {
                setAllCandidates(res.data.candidates);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // End loading
            });
    }, []);

    return (
        <div>
            <div className='grid h-full overflow-auto'>
                {/* Check if loading is true, display loading spinner */}
                {loading ? (
                    <div className='flex justify-center items-center h-20'>
                        <AiOutlineLoading3Quarters className="animate-spin" size={24} />
                        <span className="ml-2">Loading Candidates...</span>
                    </div>
                ) : (
                    // If not loading, show candidate list or a message if empty
                    allCandidates.length > 0 ? (
                        allCandidates.map((value, index) => (
                            <NavLink to={`/candidates/view/${value.candidate_id}`} key={index} className={({isActive}) => `${isActive ? "bg-indigo-50 border-indigo-700" : "bg-white border-l-transparent border-b"} p-4 h-20 border-l-4 block w-full`}>
                                <div className='w-full'>
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='text-xl inline-block -mt-1 font-bold'>{`${value.title} ${value.first_name} ${value.last_name}`}</span>
                                        <span><span className='text-gray-400'>Status:</span> <strong className='inline-block w-20 text-right'>{value.status}</strong></span>
                                    </div>
                                    <div className='w-full flex items-center justify-between'>
                                        <span>{`${value.contact_number}`}</span>
                                        <span><span className='text-gray-400'>Experience:</span> <strong className='inline-block w-20 text-right'>{value.work_experience}</strong></span>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <div className='p-4'>No Candidates Found!</div>
                    )
                )}
            </div>
        </div>
    );
}

export default AllCandidates;