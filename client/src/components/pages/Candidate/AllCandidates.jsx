import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { MdWorkOutline, MdCall, MdEdit, MdDeleteOutline } from "react-icons/md";

function AllCandidates(props) {
    const location = props.location;
    const [activeButton, setActiveButton] = useState("all");
    const [allCandidates, setAllCandidates] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [dropDown, setDropDown] = useState(false);
    const user = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null
    const [candidateExperience, setCandidateExperience] = useState(0)

    // Handle button click to toggle dropdown
    const handleButtonClick = (e) => {
        setDropDown(!dropDown); // Toggles the dropdown
    };

    useEffect(() => {
        if (props.activeButton === "my candidates") {
            setLoading(true);
            axios.post(`/my-candidates`,
                {
                    "created_by": user !== null ? user.username : null
                }
            )
                .then((res) => {
                    setAllCandidates(res.data.candidates);

                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        else {
            setLoading(true);
            axios.get("/all-candidates")
                .then((res) => {
                    setAllCandidates(res.data.candidates);
                    // if (res.data.candidates.length > 0) {
                    //     let candidate_experience = []
                    //     console.log("Value is Greater then 0");
                    //     res.data.candidates.map((value, index) => {
                    //         let months = 0;
                    //         return (
                    //             value.workExperiences.length > 0 ?
                                
                    //             value.workExperiences.map((workExperience, index) => {
                    //                 months += Number(workExperience.total_tenure_months);
                    //                 console.log(months)
                    //             }) : "No Experience"
                    //         )
                    //     })
                    // }
                    // const experience = res.data.candidates.workExperience
                    // let experienceYears = 0
                    // experience.length > 0 ?
                    //     experience.map((candidateExp, index) => {
                    //         return experienceYears += candidateExp.total_tenure;
                    //     }) : experienceYears = 0
                    // setCandidateExperience(experienceYears)

                    // if (res.data.candidates > 0) {
                    //     // res.data.candidates.map((value, index) => {
                    //     //     console.log("Candidate ----")
                    //     //     console.log(value)
                    //     //     let candidate_id = value.candidate_id
                    //     //     let total_experience = 0;

                    //     //     if (value.workExperiences.length > 0) {
                    //     //         return (
                    //     //             value.workExperiences.map((experience, index) => {
                    //     //                 // console.log(Number(experience.total_tenure))
                    //     //                 return total_experience += Number(experience.total_tenure)
                    //     //             })
                    //     //         )
                    //     //     }

                    //     //     candidate_experience.push({candidateId: candidate_id, experience: total_experience})
                    //     // })
                    //     // setCandidateExperience(candidate_experience)
                    // }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    }, [props.activeButton, props.location]);

    return (
        <div className='h-full overflow-auto'>
            <div className='grid'>
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
                            <div key={index} className={`relative flex p-2 h-20 border-b transition-small ${location.pathname == `/candidates/view/${value.candidate_id}` ? "bg-indigo-100" : "hover:shadow-xl hover:bg-gray-50"}`}>
                                <div className='min-w-12 flex justify-center items-center -mt-6 -ml-2'>
                                    <input type="checkbox" />
                                </div>
                                <div className='w-full'>
                                    <NavLink to={`/candidates/view/${value.candidate_id}`} className={'block mt-[6px] hover:text-indigo-700 hover:underline'}>
                                        {`${value.title} ${value.first_name} ${value.last_name}`}
                                    </NavLink>
                                    <div className='mt-1'>
                                        <span className='inline-flex items-center gap-2 w-40'><MdCall /> {value.contact_number}</span>
                                        <span className='inline-flex items-center gap-2'><MdWorkOutline /> {`${value.experience_years > 0 ? `${value.experience_years} Year` : `${value.experience_years} Years`}`} {value.experience_months > 0 ? `& ${value.experience_months} Months` : ""}</span>
                                    </div>
                                </div>

                                {/* Action Area - Initially hidden, visible on hover */}
                                <span className='absolute inline-flex gap-2 items-center p-2 top-0 right-0 transition-opacity duration-200 opacity-0 hover-parent-hover:opacity-100'>
                                    <span className='w-8 h-8 inline-flex items-center justify-center rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200'>
                                        <MdEdit />
                                    </span>
                                    <span className='w-8 h-8 inline-flex items-center justify-center rounded-lg cursor-pointer bg-red-100 hover:bg-red-500 hover:text-white'>
                                        <MdDeleteOutline />
                                    </span>
                                </span>
                            </div>
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