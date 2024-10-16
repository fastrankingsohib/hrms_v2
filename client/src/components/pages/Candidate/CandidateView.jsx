import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react'
import { AiFillCodepenCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaList, FaListUl, FaUser } from 'react-icons/fa';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { FaCartFlatbed, FaCircleCheck, FaCircleDot, FaRegCircleCheck } from "react-icons/fa6";
import { MdAccessTime, MdDelete, MdEdit, MdOutlineCancel, MdOutlineDone, MdOutlinePendingActions } from 'react-icons/md';
import { RiListCheck3, RiUserSharedFill } from "react-icons/ri";
import { VscVmRunning } from "react-icons/vsc";
import useCandidateUpdate from '../../../helpers/useCanidateUpdate';
import useUpdateUser from '../../../helpers/useUpadateUser';
import { IoIosTimer } from 'react-icons/io';

function CandidateView() {
    const navigate = useNavigate()
    const { candidate_id } = useParams();
    const [candidate, setCandidate] = useState();
    const [candidateLoading, setCandidateLoading] = useState(false);
    const [candidateSuccess, setCandidateSuccess] = useState(false);
    const [candidateError, setCandidateError] = useState(false);
    const [isPersonalDetailsEditing, setIsPersonalDetailsEditing] = useState(false);
    const [alerts, setAlerts] = useState({
        delete: false,
    });
    const [editDetails, setEditDetails] = useState({
        personalDetails: false,
        professionalDetails: false,
        legalDetails: false,
    });

    // States for selected filter and editing modes
    const [selectedFilter, setSelectedFilter] = useState("Overview");
    const [isEducationEditing, setIsEducationEditing] = useState(false);
    const [isExperienceEditing, setIsExperienceEditing] = useState(false);

    // States for education and experience lists
    const [educationList, setEducationList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);

    // Fetch candidate data
    useEffect(() => {
        setCandidateLoading(true);
        axios.get(`/candidate-info/${candidate_id}`)
            .then((res) => {
                if (res.data.success) {
                    const candidateData = res.data.candidate;
                    setCandidateSuccess(true);
                    setCandidateLoading(false);
                    setCandidateError(false);
                    setCandidate(candidateData);

                    // Populate education and experience lists after data is fetched
                    setEducationList(candidateData.qualifications || []);
                    setExperienceList(candidateData.workExperiences.map((exp, index) => ({
                        id_updated: index + 1,
                        organisation_name: exp.organisation_name || '',
                        last_designation: exp.last_designation || '',
                        total_tenure: exp.total_tenure || '',
                        last_drawn_salary: exp.last_drawn_salary || '',
                    })) || []);
                }
            })
            .catch((err) => {
                setCandidateError(true);
                setCandidateSuccess(false);
                setCandidateLoading(false);
            });
    }, [candidate_id]);

    // Handle Education Input Change
    const handleEducationInputChange = (index, field, value) => {
        const updatedEducation = [...educationList];
        updatedEducation[index][field] = value;
        setEducationList(updatedEducation);
    };

    // Add New Education
    const addEducation = () => {
        setEducationList([...educationList, { id_updated: Date.now(), college_university: '', course: '', year_of_passing: '', percentage_cgpa: '' }]);
    };

    // Remove Education
    const removeEducation = (id_updated) => {
        setEducationList(educationList.filter((education) => education.id_updated !== id_updated));
    };

    // Handle Experience Input Change
    const handleExperienceInputChange = (index, field, value) => {
        const updatedExperienceList = [...experienceList];
        updatedExperienceList[index][field] = value;
        setExperienceList(updatedExperienceList);
    };

    // Add New Experience
    const addExperience = () => {
        setExperienceList([
            ...experienceList,
            {
                id_updated: Date.now(),
                organisation_name: '',
                last_designation: '',
                total_tenure: '',
                last_drawn_salary: '',
            },
        ]);
    };

    // Remove Experience
    const removeExperience = (id_updated) => {
        const updatedExperienceList = experienceList.filter((experience) => experience.id_updated !== id_updated);
        setExperienceList(updatedExperienceList);
    };

    // Update Candidate Data (Saving Changes)
    const { updateEvents, updateCandidate } = useCandidateUpdate();
    const handleUpdateCandidate = () => {
        updateCandidate(candidate_id, educationList, experienceList, candidate);
    };

    const [deleteEvents, setDeleteEvents] = useState({
        loading: false,
        error: false,
        success: false
    })

    const handleDelete = () => {
        setDeleteEvents({ loading: true, error: false, success: false })
        axios.get(`/delete-candidate/${candidate_id}`)
            .then((res) => {
                setDeleteEvents({ loading: false, error: false, success: true })
                setAlerts({ delete: false });
                console.log(res);

                setCandidateLoading(true);
                axios.get(`/candidate-info/${candidate_id}`)
                    .then((res) => {
                        if (res.data.success) {
                            const candidateData = res.data.candidate;
                            setCandidateSuccess(true);
                            setCandidateLoading(false);
                            setCandidateError(false);
                            setCandidate(candidateData);

                            // Populate education and experience lists after data is fetched
                            setEducationList(candidateData.qualifications || []);
                            setExperienceList(candidateData.workExperiences.map((exp, index) => ({
                                id_updated: index + 1,
                                organisation_name: exp.organisation_name || '',
                                last_designation: exp.last_designation || '',
                                total_tenure: exp.total_tenure || '',
                                last_drawn_salary: exp.last_drawn_salary || '',
                            })) || []);
                        }
                    })
                    .catch((err) => {
                        setCandidateError(true);
                        setCandidateSuccess(false);
                        setCandidateLoading(false);
                    });
            })
            .catch((err) => {
                // console.log(err)
                setDeleteEvents({ loading: false, error: true, success: false })
            })

        setTimeout(() => {
            setDeleteEvents({ loading: false, error: false, success: false })
        }, 3000)
    }


    const [nextRoundSelection, setNextRoundSelection] = useState({
        checked: false,
        value: ""
    })
    const [newInterviewDetails, setNewInterviewDetails] = useState({
        date: "",
        time: "",
        interviewer: "",
        loading: false,
        success: false,
        error: false
    })
    const scheduleInterview = () => {
        setNewInterviewDetails((values) => ({ ...values, loading: true, success: false, error: false }))
        axios.post("/schedule-interview",
            {
                "job_id": 101,
                "candidate_id": Number(candidate_id),
                "interview_date": `${newInterviewDetails.date}`,
                "interview_time": `${newInterviewDetails.time}`,
                "interviewer": `${newInterviewDetails.interviewer}`,
                "interview_round": "1"
            }
        )
            .then((res) => {
                setNewInterviewDetails((values) => ({ ...values, loading: false, success: true, error: false }))
                setTimeout(() => {
                    setNextRoundSelection((values) => ({ ...values, checked: false }))
                }, 3000)
                // console.log(res)
            })
            .catch((err) => {
                setNewInterviewDetails((values) => ({ ...values, loading: false, success: false, error: true }))
                console.log(err);
            })
    }


    // Component Loading -------------------------------------------------------------------------------------------------------
    // Component Loading -------------------------------------------------------------------------------------------------------
    if (candidateLoading) {
        return (
            <div className='p-4 h-full w-full flex items-center justify-center bg-gray-100'>
                <div className='flex justify-center items-center h-20'>
                    <AiOutlineLoading3Quarters className="reload-rounding" size={24} />
                    <span className="ml-2">Loading Candidate Details ...</span>
                </div>
            </div>
        );
    }
    // Data Error Rendering -----------------------------------------------------------------------------------------------------------
    // Data Error Rendering -----------------------------------------------------------------------------------------------------------
    if (candidateError) {
        return (
            <div className='p-4 h-full flex justify-center items-center text-red-500'>
                <h1>Candidate <strong>Deleted</strong> or <strong>Not Existed!</strong> <span className='ml-2'><Link to={'/candidates'} className='text-indigo-700 underline'>All Jobs</Link></span></h1>
            </div>
        )
    }

    // Final Rendering -----------------------------------------------------------------------------------------------------------
    // Final Rendering -----------------------------------------------------------------------------------------------------------
    if (candidateSuccess) {
        return (
            <div className='h-full'>
                <div className={`h-full overflow-auto`}>
                    <span className={`inline-block fixed z-40 top-56 tranition-basic p-3 ${updateEvents.success ? "right-10" : "-right-[100%]"} bg-green-600 text-white`}>Data Updated Successfully</span>
                    <div className='flex items-center justify-between sticky top-0 bg-white border-b'>
                        <div className='min-w-80'>
                            <div className='flex items-center p-4'>
                                <div className='inline-flex items-center justify-center h-20 w-20 bg-gray-100 rounded-full mr-4'><FaUser size={"20px"} className='text-gray-400' /></div>
                                <div>
                                    <div className='text-xl font-bold'>{`${candidate.title} ${candidate.first_name} ${candidate.last_name}`}</div>
                                    <div>Experience: {candidate.work_experience}</div>
                                    <div className={`${candidate.status === "Active" ? "text-green-500" : candidate.status === "Inactive" ? "bg-orange-500" : "text-red-500"}`}>{`${candidate.status}`}</div>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-4 items-center pr-8'>
                            <button className={`p-2.5 rounded-lg w-40 ${selectedFilter == "Overview" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Overview")}>Overview</button>
                            <button className={`p-2.5 rounded-lg w-40 ${selectedFilter == "Applied Jobs" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Applied Jobs")}>Applied Jobs</button>
                            <button className={`p-2.5 rounded-lg w-40 ${selectedFilter == "Interviews" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Interviews")}>Interviews</button>
                            <div className={` p-2.5 relative`}>
                                <button className={`text-center block rounded-lg w-40 p-2.5 h-full border ${nextRoundSelection.checked ? "bg-indigo-700 text-white" : "bg-gray-100"}`}
                                    onClick={() => {
                                        setNextRoundSelection((values) => ({ ...values, checked: !nextRoundSelection.checked }));
                                        if (!nextRoundSelection.checked) {
                                            setNextRoundSelection((values) => ({ ...values, value: "" }))
                                        }
                                    }}>Next Action</button>
                                <div className={`absolute z-10 top-[65px] right-0 bg-white text-black border shadow-2xl w-60 grid gap-4 p-4 ${nextRoundSelection.checked ? "block" : "hidden"}`}>
                                    <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "FollowUp" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`} onClick={() => setNextRoundSelection((values) => ({ ...values, value: "FollowUp" }))}><FaListUl size={"12px"} /> Follow Up</button>
                                    <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Shortlist" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`} onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Shortlist" }))}><RiListCheck3 size={"16px"} /> Shortlist</button>
                                    <button className='relative'>
                                        <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Schedule" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`} onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Schedule" }))}><MdAccessTime size={"16px"} /> Schedule Interview</button>
                                        <div className={`text-left absolute -top-[125px] -left-[170%] p-4 bg-white border shadow-2xl w-80 cursor-default ${nextRoundSelection.value === "Schedule" ? "block" : "hidden"}`}>
                                            <h1 className='text-xl font-semibold mb-4 text-center'>Schedule Interview</h1>
                                            <div className='grid'>
                                                <label className='text-left block w-full mb-2' htmlFor="">Select Interview Date</label>
                                                <input className='text-left block bg-gray-100 border p-2 mb-2 w-full' onChange={(e) => setNewInterviewDetails((values) => ({ ...values, date: e.target.value }))} type="date" />
                                                <label className='text-left block mb-2 w-full' htmlFor="">Select Interview Time</label>
                                                <input className='text-left block border bg-gray-100 p-2 mb-2 w-full' onChange={(e) => setNewInterviewDetails((values) => ({ ...values, time: e.target.value }))} type="time" />
                                                <label className='text-left block mb-2 w-full' htmlFor="">Interviewer Name</label>
                                                <input className='text-left block border bg-gray-100 p-2 w-full' onChange={(e) => setNewInterviewDetails((values) => ({ ...values, interviewer: e.target.value }))} type="text" placeholder='Eg. Mr. Akram' />
                                                <button className={`p-2.5  border rounded-lg bg-indigo-700 text-white mt-8 ${newInterviewDetails.loading ? "bg-opacity-60 cursor-not-allowed" : ""}`} onClick={scheduleInterview}
                                                    disabled={newInterviewDetails.loading}
                                                >
                                                    {
                                                        newInterviewDetails.loading ? "Scheduling..." : newInterviewDetails.success ? "Scheduled New Interview" : "Schedule Interview"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </button>
                                    <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Offered" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`} onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Offered" }))}><MdOutlineDone size={"16px"} />Offered</button>
                                    <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "OnBoard" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`} onClick={() => setNextRoundSelection((values) => ({ ...values, value: "OnBoard" }))}><RiUserSharedFill size={"14px"} />On Board</button>
                                    <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Training" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`} onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Training" }))}><VscVmRunning size={"16px"} />Training</button>
                                    <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Live" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`} onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Live" }))}><FaCircleDot size={"12px"} />Live</button>
                                    {/* <button className='p-2.5 border bg-gray-100 rounded-lg' onClick={() => setNextRoundSelection({checked: false, value: ""})}>Reset Actions</button> */}
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={`max-h-full ${selectedFilter === "Overview" ? "block" : "hidden"}`}>
                        <div className='flex justify-between items-center text-sm sticky -z-10 top-[99px] bg-indigo-50 p-4'>
                            <div className='w-full min-w-fit flex items-center gap-2 pr-3'><FaCircleCheck size={"13px"} /> <span className='text-sm'>Job Applied</span></div>
                            <div className='w-full h-0.5 bg-black'></div>
                            <div className='w-full min-w-fit flex items-center gap-2 px-3'><FaCircleCheck size={"13px"} /> <span className='text-sm'>Resume Shortlisted</span></div>
                            <div className='w-full h-0.5 bg-black'></div>
                            <div className='w-full min-w-fit flex items-center gap-2 px-3'><FaCircleCheck size={"13px"} /> <span className='text-sm'>Interview Scheduled</span></div>
                            <div className='w-full h-0.5 bg-black'></div>
                            <div className='w-full min-w-fit flex items-center gap-2 px-3'><FaCircleCheck size={"13px"} /> <span className='text-sm'>Offered</span></div>
                            <div className='w-full h-0.5 bg-black'></div>
                            <div className='w-full min-w-fit flex items-center gap-2 px-3'><FaCircleCheck size={"13px"} /> <span className='text-sm'>Training</span></div>
                            <div className='w-full h-0.5 bg-black'></div>
                            <div className='w-full min-w-fit flex items-center gap-2 px-3'><FaCircleCheck size={"13px"} /> <span className='text-sm'>Jonining</span></div>
                            <div className='w-full h-0.5 bg-black'></div>
                            <div className='w-full min-w-fit flex items-center gap-2 pl-3'><FaCircleCheck size={"13px"} /> <span className='text-sm'>Permanent</span></div>
                        </div>

                        <div className='grid gap-4 p-4 bg-gray-50'>
                            <div className='grid gap-2 p-6 bg-white w-full border'>
                                <h1 className='flex justify-between font-semibold text-indigo-700 pb-4'>
                                    <span className='text-xl'>Personal Details</span>
                                    <button onClick={() => setIsPersonalDetailsEditing(!isPersonalDetailsEditing)}>{isPersonalDetailsEditing ? <span className='inline-flex gap-2 items-center p-2 px-5 bg-green-50 text-green-600'><MdOutlineDone /> Done</span> : <span className='inline-flex gap-2 items-center p-2 px-5'><MdEdit /> Edit Personal Details</span>}</button>
                                </h1>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Title</span>
                                        {/* <input type="text" className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.title} onChange={(e) => setCandidate((values) => ({ ...values, title: e.target.value }))} /> */}
                                        <select className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                            onChange={(e) => setCandidate((values) => ({ ...values, title: e.target.value }))}
                                            disabled={!isPersonalDetailsEditing}
                                            defaultValue={candidate.title ? candidate.title : "---"}>
                                            <option value="---" disabled={true}>--- Selecte Title ---</option>
                                            <option value="Mr">Mr</option>
                                            <option value="Ms">Ms</option>
                                        </select>
                                    </div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>First Name</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.first_name} onChange={(e) => setCandidate((values) => ({ ...values, first_name: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Middle Name</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.middle_name} onChange={(e) => setCandidate((values) => ({ ...values, middle_name: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Last Name</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.last_name} onChange={(e) => setCandidate((values) => ({ ...values, last_name: e.target.value }))} /></div>
                                    <hr />
                                    <hr />
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Contact Number</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.contact_number} onChange={(e) => setCandidate((values) => ({ ...values, contact_number: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Alt. Contact Number</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.alt_contact_number} onChange={(e) => setCandidate((values) => ({ ...values, alt_contact_number: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Email Address</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.email_address} onChange={(e) => setCandidate((values) => ({ ...values, email_address: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Alt. Email Address</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.alt_email_address} onChange={(e) => setCandidate((values) => ({ ...values, alt_email_address: e.target.value }))} /></div>
                                    <hr />
                                    <hr />
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 1</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.address_line1} onChange={(e) => setCandidate((values) => ({ ...values, address_line1: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 2</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.address_line2} onChange={(e) => setCandidate((values) => ({ ...values, address_line2: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>POST Code</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.pin_code} onChange={(e) => setCandidate((values) => ({ ...values, pin_code: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>City</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.city} onChange={(e) => setCandidate((values) => ({ ...values, city: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>State</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.state} onChange={(e) => setCandidate((values) => ({ ...values, state: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Country</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.country} onChange={(e) => setCandidate((values) => ({ ...values, country: e.target.value }))} /></div>
                                </div>
                            </div>

                            <div className='grid gap-2 p-6 bg-white w-full border'>
                                <h1 className='flex justify-between font-semibold text-indigo-700 mb-2'>
                                    <span className='text-xl'>Professional Details</span>
                                </h1>

                                {/* Experience And Qualifications Records Editing */}
                                {/* Experience And Qualifications Records Editing */}

                                <div className='grid gap-4'>
                                    {/* Render each experience entry in edit/view mode */}
                                    {experienceList.length > 0 ?
                                        experienceList.map((experience, index) => (
                                            <div key={index} className='p-4 border mt-4 flex justify-between items-center'>
                                                {isExperienceEditing ? (
                                                    <>
                                                        <input
                                                            type='text'
                                                            value={experience.organisation_name}
                                                            onChange={(e) => handleExperienceInputChange(index, 'organisation_name', e.target.value)}
                                                            placeholder='Organisation Name'
                                                            className='border p-2 px-4 mr-2'
                                                        />
                                                        <input
                                                            type='text'
                                                            value={experience.last_designation}
                                                            onChange={(e) => handleExperienceInputChange(index, 'last_designation', e.target.value)}
                                                            placeholder='Last Designation'
                                                            className='border p-2 px-4 mr-2'
                                                        />
                                                        <input
                                                            type='text'
                                                            value={experience.total_tenure}
                                                            onChange={(e) => handleExperienceInputChange(index, 'total_tenure', e.target.value)}
                                                            placeholder='Total Tenure'
                                                            className='border p-2 px-4 mr-2'
                                                        />
                                                        <input
                                                            type='text'
                                                            value={experience.last_drawn_salary}
                                                            onChange={(e) => handleExperienceInputChange(index, 'last_drawn_salary', e.target.value)}
                                                            placeholder='Last Drawn Salary'
                                                            className='border p-2 px-4 mr-2'
                                                        />
                                                        <button onClick={() => removeExperience(experience.id_updated)} className='text-red-500'>
                                                            <MdDelete />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span>
                                                        {experience.organisation_name} - {experience.last_designation} ({experience.total_tenure}) - Last Drawn Salary: {experience.last_drawn_salary}
                                                    </span>
                                                )}
                                            </div>
                                        )) : ""}

                                    <div>
                                        {isExperienceEditing && (
                                            <button onClick={addExperience} className='mt-4 bg-indigo-700 text-white p-2 px-4 mr-4'>
                                                + Add More Experience
                                            </button>
                                        )}

                                        <button
                                            onClick={() => setIsExperienceEditing(!isExperienceEditing)}
                                            className='mt-4 bg-indigo-700 text-white p-2 px-4'
                                        >
                                            {isExperienceEditing ? 'Save Experience' : 'Edit Experience'}
                                        </button>
                                    </div>
                                </div>


                                {/* Educations And Qualifications Records Editing */}
                                {/* Educations And Qualifications Records Editing */}
                                <div>
                                    <h1 className='text-lg font-semibold mt-4'>
                                        Education
                                    </h1>

                                    <div className='grid gap-4'>
                                        {educationList.length > 0 ?
                                            educationList.map((education, index) => (
                                                <div key={index} className='p-4 border mt-4 flex justify-between items-center'>
                                                    {isEducationEditing ? (
                                                        <>
                                                            <input
                                                                type='text'
                                                                defaultValue={education.college_university}
                                                                onChange={(e) => handleEducationInputChange(index, 'college_university', e.target.value)}
                                                                placeholder='Institution'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                type='text'
                                                                defaultValue={education.course}
                                                                onChange={(e) => handleEducationInputChange(index, 'course', e.target.value)}
                                                                placeholder='Degree'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                type='number'
                                                                defaultValue={education.year_of_passing}
                                                                onChange={(e) => handleEducationInputChange(index, 'year', e.target.value)}
                                                                placeholder='Year'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                type='text'
                                                                defaultValue={education.percentage_cgpa}
                                                                onChange={(e) => handleEducationInputChange(index, 'percentage_cgpa', e.target.value)}
                                                                placeholder='Grade'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <button onClick={() => removeEducation(education.id)} className='text-red-500'>
                                                                <MdDelete />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span>{education.college_university} - {education.course} ({education.year_of_passing}) - Grade: {education.percentage_cgpa}</span>
                                                    )}
                                                </div>
                                            )) : ""}
                                    </div>

                                    {isEducationEditing && (
                                        <button onClick={addEducation} className='mt-4 bg-indigo-700 text-white p-2 px-4 mr-4'>
                                            + Add More Education
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setIsEducationEditing(!isEducationEditing)}
                                        className='mt-4 bg-indigo-700 text-white p-2 px-4'
                                    >
                                        {isEducationEditing ? 'Save Education' : 'Edit Education'}
                                    </button>
                                </div>
                            </div>

                            {/* <div className='grid gap-2 p-6 bg-white w-full border'>
                            <h1 className='flex justify-between font-semibold text-indigo-700 mb-2'>
                                <span className='text-xl'>Legal Details</span>
                                <button className='inline-flex gap-2 items-center'><MdEdit /> Edit Legal Details</button>
                            </h1>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Aadhaar No.</span> <input type="text" className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={"N/A"} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>PAN No.</span> <input type="text" className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={"N/A"} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Driving Licence</span> <input type="text" className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={"N/A"} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Last Name</span> <input type="text" className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={"N/A"} /></div>
                            </div>
                        </div> */}

                            <div className='pb-32 flex justify-end'><button className={`p-2.5 rounded-lg px-4 bg-indigo-700 text-white ${updateEvents.loading ? 'bg-opacity-80 cursor-not-allowed' : ''}`}
                                onClick={handleUpdateCandidate}
                                disabled={updateEvents.loading}
                            >
                                {updateEvents.loading ? <span className='inline-flex gap-2 items-center justify-center h-4'><AiOutlineLoading3Quarters size={"10px"} className='reload-rounding' /> Updating ...</span> : "Update Candidate"}
                            </button></div>

                            <div className='grid gap-2 p-6 bg-white w-full border mb-4'>
                                <h1 className='flex justify-between font-semibold mb-2'>
                                    <span className='text-xl text-red-500'>Danger Zone</span>
                                    {/* <button className='inline-flex gap-2 items-center'><MdEdit /> Edit Legal Details</button> */}
                                </h1>
                                <div className='flex gap-4'>
                                    <button className='text-white bg-red-500 rounded-lg p-2.5 px-5'
                                        onClick={() => setAlerts((values) => ({ ...values, delete: true }))}
                                    >Delete This User</button>
                                </div>

                                {/* Delete Alert */}
                                <div className={`${alerts.delete ? "flex" : "hidden"} fixed top-0 left-0 z-40 items-center justify-center h-full w-full backdrop-blur-sm bg-black bg-opacity-10`}>
                                    <div className='w-96 min-h-32 p-10 text-center bg-white border rounded-xl'>
                                        <h1 className='text-xl font-semibold text-red-500'>Do You Want To Delete The User</h1>
                                        <div className='flex flex-wrap items-center justify-center gap-2 mt-4'>
                                            <button className='bg-gray-100 rounded-lg p-2.5 px-5 mt-4 mr-4'
                                                onClick={() => setAlerts((values) => ({ ...values, delete: false }))}
                                            >Cancel</button>
                                            <button className={`bg-red-500 text-white rounded-lg p-2.5 px-5 mt-4 ${deleteEvents.loading ? "bg-opacity-50 cursor-not-allowed" : ""}`} onClick={handleDelete} disabled={deleteEvents.loading}>{deleteEvents.loading ? "Deleting..." : "Delete"}</button>
                                            <div className={`text-red-500 ${deleteEvents.error ? "opacity-100" : "hidden"}`}>Error: Cann't Delete the Candidate</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    {/* Applied Jobs */}
                    <div className={`h-full ${selectedFilter === "Applied Jobs" ? "block" : "hidden"}`}>
                        <div className=''></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateView