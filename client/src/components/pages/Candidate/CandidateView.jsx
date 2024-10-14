import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom'
import { FaCartFlatbed, FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { MdDelete, MdEdit } from 'react-icons/md';
import useCandidateUpdate from '../../../helpers/useCanidateUpdate';

function CandidateView() {
    const { candidate_id } = useParams();
    const [candidate, setCandidate] = useState()
    const [candidateLoading, setCandidateLoading] = useState(false);
    const [candidateSuccess, setCandidateSuccess] = useState(false);
    const [candidateError, setCandidateError] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Overview");
    const [alerts, setAlerts] = useState({
        delete: false,
    });
    const [editDetails, setEditDetails] = useState({
        personalDetails: false,
        professionalDetails: false,
        legalDetails: false
    });
    useEffect(() => {
        setCandidateLoading(true);
        axios.get(`/candidate-info/${candidate_id}`)
            .then((res) => {
                if (res.data.success) {
                    setCandidateSuccess(true);
                    setCandidateLoading(false);
                    setCandidateError(false);
                    setCandidate(res.data.candidate);
                    console.log(res.data.candidate)
                }
            })
            .catch((err) => {
                setCandidateError(false);
                setCandidateSuccess(false);
                setCandidateLoading(false);
            })
    }, [candidate_id]);

    // Candidate Education -------------------------------------------------------------------------------------------------------
    // Candidate Education -------------------------------------------------------------------------------------------------------
    const [educationList, setEducationList] = useState(
        candidate ? candidate.qualifications : []
    );
    const [isEducationEditing, setIsEducationEditing] = useState(false);

    const handleEducationInputChange = (index, field, value) => {
        const updatedEducation = [...educationList];
        updatedEducation[index][field] = value;
        setEducationList(updatedEducation);
    };

    const addEducation = () => {
        setEducationList([...educationList, { id_updated: Date.now(), college_university: '', course: '', year_of_passing: '', percentage_cgpa: '' }]);
    };

    const removeEducation = (id) => {
        setEducationList(educationList.filter((education) => education.id !== id));
    };


    // State to store the list of experience entries, fetched from the candidate's work experiences if available
    const [experienceList, setExperienceList] = useState(
        candidate && candidate.workExperiences ? candidate.workExperiences.map((exp, index) => ({
            id_updated: index + 1,  // Assign unique ids if not already present
            organisation_name: exp.organization || '', // Match the actual field names
            last_designation: exp.designation || '',
            total_tenure: exp.tenure || '',
            last_drawn_salary: exp.salary || '',
        })) : []
    );

    // State to control whether the experience section is in edit mode
    const [isExperienceEditing, setIsExperienceEditing] = useState(false);

    // Function to handle input changes in the experience fields
    const handleExperienceInputChange = (index, field, value) => {
        const updatedExperienceList = [...experienceList];
        updatedExperienceList[index][field] = value;  // Update the specific field in the selected experience entry
        setExperienceList(updatedExperienceList);
    };

    // Function to add a new experience entry
    const addExperience = () => {
        setExperienceList([
            ...experienceList,
            {
                id_updated: experienceList.length + 1, // Ensure each new entry has a unique id
                organisation_name: '',
                last_designation: '',
                total_tenure: '',
                last_drawn_salary: '',
            },
        ]);
    };

    // Function to remove an experience entry by its id_updated
    const removeExperience = (id_updated) => {
        const updatedExperienceList = experienceList.filter(
            (experience) => experience.id_updated !== id_updated
        );
        setExperienceList(updatedExperienceList);
    };



    // Canidate Hook/Helper ----------
    const { deleteEvents, updateCanidate } = useCandidateUpdate();
    const handleUpadateCandidate = () => {
        updateCanidate(candidate_id, educationList, experienceList, candidate);
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
            <div className='p-4'>
                Canidate Loaded Failed
            </div>
        )
    }

    // Final Rendering -----------------------------------------------------------------------------------------------------------
    // Final Rendering -----------------------------------------------------------------------------------------------------------
    if (candidateSuccess) {
        return (
            <div className='h-full overflow-auto'>
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

                    <div className='flex gap-4 items-center w-[40%]'>
                        <button className={`p-2.5 rounded-lg w-40 ${selectedFilter == "Overview" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Overview")}>Overview</button>
                        <button className={`p-2.5 rounded-lg w-40 ${selectedFilter == "Applied Jobs" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Applied Jobs")}>Applied Jobs</button>
                        <button className={`p-2.5 rounded-lg w-40 ${selectedFilter == "Interviews" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Interviews")}>Interviews</button>
                    </div>
                </div>



                <div className='h-full'>
                    <div className='flex justify-between items-center text-sm sticky top-[99px] bg-indigo-50 p-4'>
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
                            <h1 className='flex justify-between font-semibold text-indigo-700'>
                                <span className='text-xl'>Personal Details</span>
                                <button className='inline-flex gap-2 items-center'><MdEdit /> Edit Personal Details</button>
                            </h1>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Title</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.title} onChange={(e) => setCandidate((values) => ({ ...values, title: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>First Name</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.first_name} onChange={(e) => setCandidate((values) => ({ ...values, first_name: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Middle Name</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.middle_name} onChange={(e) => setCandidate((values) => ({ ...values, middle_name: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Last Name</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.last_name} onChange={(e) => setCandidate((values) => ({ ...values, last_name: e.target.value }))} /></div>
                                <hr />
                                <hr />
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Contact Number</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.contact_number} onChange={(e) => setCandidate((values) => ({ ...values, contact_number: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Alt. Contact Number</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.alt_contact_number} onChange={(e) => setCandidate((values) => ({ ...values, alt_contact_number: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Email Address</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.email_address} onChange={(e) => setCandidate((values) => ({ ...values, email_address: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Alt. Email Address</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.alt_email_address} onChange={(e) => setCandidate((values) => ({ ...values, alt_email_address: e.target.value }))} /></div>
                                <hr />
                                <hr />
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 1</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.address_line1} onChange={(e) => setCandidate((values) => ({ ...values, address_line1: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 2</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.address_line2} onChange={(e) => setCandidate((values) => ({ ...values, address_line2: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>POST Code</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.pin_code} onChange={(e) => setCandidate((values) => ({ ...values, pin_code: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>City</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.city} onChange={(e) => setCandidate((values) => ({ ...values, city: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>State</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.state} onChange={(e) => setCandidate((values) => ({ ...values, state: e.target.value }))} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Country</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.country} onChange={(e) => setCandidate((values) => ({ ...values, country: e.target.value }))} /></div>
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

                        <div className='grid gap-2 p-6 bg-white w-full border'>
                            <h1 className='flex justify-between font-semibold text-indigo-700 mb-2'>
                                <span className='text-xl'>Legal Details</span>
                                <button className='inline-flex gap-2 items-center'><MdEdit /> Edit Legal Details</button>
                            </h1>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Aadhaar No.</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={"N/A"} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>PAN No.</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={"N/A"} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Driving Licence</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={"N/A"} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Last Name</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={"N/A"} /></div>
                            </div>
                        </div>

                        <div className='pb-32 flex justify-end'><button className='p-2.5 rounded-lg px-4 bg-indigo-700 text-white'
                            onClick={handleUpadateCandidate}
                        >Update Details</button></div>

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
                            <div className={`${alerts.delete ? "flex" : "hidden"} fixed top-0 left-0 z-40 items-center justify-center h-full w-full backdrop-blur-lg bg-indigo-700 bg-opacity-10`}>
                                <div className='w-96 min-h-32 p-10 text-center bg-white border rounded-xl'>
                                    <h1 className='text-xl font-semibold text-red-500'>Do You Want To Delete The User</h1>
                                    <button className='bg-gray-100 rounded-lg p-2.5 px-5 mt-4 mr-4'
                                        onClick={() => setAlerts((values) => ({ ...values, delete: false }))}
                                    >No, Cancel</button>
                                    <button className='bg-red-500 text-white rounded-lg p-2.5 px-5 mt-4'>Yes, Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateView