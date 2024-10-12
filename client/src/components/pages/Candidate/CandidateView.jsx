import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { useParams } from 'react-router-dom'
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { MdDelete, MdEdit } from 'react-icons/md';

function CandidateView() {
    const { candidate_id } = useParams();
    const [candidate, setCandidate] = useState()
    const [candidateLoading, setCandidateLoading] = useState(false);
    const [candidateSuccess, setCandidateSuccess] = useState(false);
    const [candidateError, setCandidateError] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Overview");
    const [candidateUpdate, setCanidateUpdate] = useState(
        {
            "state": "",
            "pin_code": "",
            "country": "",
            "contact_number": "",
            "alt_contact_number": "",
            "email_address": "",
            "alt_email_address": "",
            "date_of_birth": "",
            "job_title": "",
            "department": "",
            "work_experience": "",
            "hobbies": "",
            "interests": "",
            "skills": "",
            "recruiter_comments": "",
            "communication_skills": "",
            "other1": "",
            "other2": "",
            "other3": "",
            "status": "",
            "qualifications": [
                {
                    "course": "B.Sc. in Computer Science",
                    "college_university": "XYZ University",
                    "year_of_passing": "2011",
                    "percentage_cgpa": "8.5"
                },
                {
                    "course": "M.Sc. in Software Engineering",
                    "college_university": "ABC Institute",
                    "year_of_passing": "2014",
                    "percentage_cgpa": "9.0"
                }
            ],
            "experiences": [
                {
                    "organisation_name": "Tech Corp",
                    "total_tenure": "3 years",
                    "last_designation": "Senior Developer",
                    "last_drawn_salary": "$80,000"
                },
                {
                    "organisation_name": "Code Masters",
                    "total_tenure": "2 years",
                    "last_designation": "Software Engineer",
                    "last_drawn_salary": "$70,000"
                }
            ],
            "jobs": [35, 40, 43],
            "created_by": "recruiter@example.com"
        }
    )
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
                console.log(res.data)
                if (res.data.success) {
                    setCandidateSuccess(true)
                    setCandidateLoading(false);
                    setCandidateError(false)
                    setCandidate(res.data.candidate);
                }
            })
            .catch((err) => {
                setCandidateError(false);
                setCandidateSuccess(false);
                setCandidateLoading(false);
            })
    }, [candidate_id]);





    // Hanldling Experience ------------------------------------------------------------------------------------------------------
    // Hanldling Experience ------------------------------------------------------------------------------------------------------
    const [experienceList, setExperienceList] = useState([
        { id: 1, company: "Company A", role: "Developer", tenure: 2, salary: 30000 },
        { id: 2, company: "Company B", role: "Senior Developer", tenure: 3, salary: 38000 }
    ]);

    // State to manage the edit mode
    const [isExperienceEditing, setIsExperienceEditing] = useState(false);

    // Handle input change for editing experience
    const handleInputChange = (index, field, value) => {
        const newExperienceList = [...experienceList];
        newExperienceList[index][field] = value;
        setExperienceList(newExperienceList);
    };

    // Handle add new experience entry
    const addExperience = () => {
        setExperienceList([...experienceList, { id: Date.now(), company: '', role: '', years: 0 }]);
    };

    // Handle remove experience entry
    const removeExperience = (id) => {
        setExperienceList(experienceList.filter(experience => experience.id !== id));
    };


    // Candidate Education -------------------------------------------------------------------------------------------------------
    // Candidate Education -------------------------------------------------------------------------------------------------------
    const [educationList, setEducationList] = useState([
        { id: 1, institution: 'ABC University', degree: 'B.Sc.', year: 2020, grade: 'A' }
    ]);
    const [isEducationEditing, setIsEducationEditing] = useState(false);

    const handleEducationInputChange = (index, field, value) => {
        const updatedEducation = [...educationList];
        updatedEducation[index][field] = value;
        setEducationList(updatedEducation);
    };

    const addEducation = () => {
        setEducationList([...educationList, { id: Date.now(), institution: '', degree: '', year: '', grade: '' }]);
    };

    const removeEducation = (id) => {
        setEducationList(educationList.filter((education) => education.id !== id));
    };

    // Component Rendering -------------------------------------------------------------------------------------------------------
    // Component Rendering -------------------------------------------------------------------------------------------------------
    if (candidateLoading) {
        return (
            <div className='p-4 h-full w-full flex items-center justify-center bg-gray-100'>
                <div className='flex justify-center items-center h-20'>
                    <AiOutlineLoading3Quarters className="reload-rounding" size={24} />
                    <span className="ml-2">Loading Candidate Details ...</span>
                </div>
            </div>
        )
    }
    if (candidateError) {
        return (
            <div className='p-4'>
                Canidate Loaded Failed
            </div>
        )
    }
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
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Title</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.title} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>First Name</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.first_name} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Middle Name</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.middle_name} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Last Name</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.last_name} /></div>
                                <hr />
                                <hr />
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Contact Number</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.contact_number} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Alt. Contact Number</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.alt_contact_number} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Email Address</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.email_address} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Alt. Email Address</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.alt_email_address} /></div>
                                <hr />
                                <hr />
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 1</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.address_line1} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 2</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.address_line2} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>POST Code</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.pin_code} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>City</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.city} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>State</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.state} /></div>
                                <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Country</span> <input type="text" className='text-black border-l-2 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-indigo-50 border-indigo-700' defaultValue={candidate.country} /></div>
                            </div>
                        </div>

                        <div className='grid gap-2 p-6 bg-white w-full border'>
                            <h1 className='flex justify-between font-semibold text-indigo-700 mb-2'>
                                <span className='text-xl'>Professional Details</span>
                                {/* <button className='inline-flex gap-2 items-center' onClick={() => setIsExperienceEditing(!isExperienceEditing)}>
                                    <MdEdit /> {isExperienceEditing ? 'Save' : 'Edit'} Professional Details
                                </button> */}
                            </h1>

                            <div>
                                <h1 className='text-lg font-semibold'>
                                    Experience
                                </h1>

                                <div className='grid gap-4'>
                                    {experienceList.map((experience, index) => (
                                        <div key={experience.id} className='p-4 border mt-4 flex justify-between items-center'>
                                            {isExperienceEditing ? (
                                                <>
                                                    <input
                                                        type='text'
                                                        value={experience.company}
                                                        onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                                                        placeholder='Company Name'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <input
                                                        type='text'
                                                        value={experience.role}
                                                        onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                                                        placeholder='Role'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <input
                                                        type='number'
                                                        value={experience.tenure}
                                                        onChange={(e) => handleInputChange(index, 'tenure', e.target.value)}
                                                        placeholder='Years'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <input
                                                        type='text'
                                                        value={experience.salary}
                                                        onChange={(e) => handleInputChange(index, 'salary', e.target.value)}
                                                        placeholder='Salary'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <button onClick={() => removeExperience(experience.id)} className='text-red-500'>
                                                        <MdDelete />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{experience.company} - {experience.role} ({experience.years} years)</span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

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





                            {/* Educations And Qualifications Records Editing */}
                            {/* Educations And Qualifications Records Editing */}
                            <div>
                                <h1 className='text-lg font-semibold mt-4'>
                                    Education
                                </h1>

                                <div className='grid gap-4'>
                                    {educationList.map((education, index) => (
                                        <div key={education.id} className='p-4 border mt-4 flex justify-between items-center'>
                                            {isEducationEditing ? (
                                                <>
                                                    <input
                                                        type='text'
                                                        value={education.institution}
                                                        onChange={(e) => handleEducationInputChange(index, 'institution', e.target.value)}
                                                        placeholder='Institution'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <input
                                                        type='text'
                                                        value={education.degree}
                                                        onChange={(e) => handleEducationInputChange(index, 'degree', e.target.value)}
                                                        placeholder='Degree'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <input
                                                        type='number'
                                                        value={education.year}
                                                        onChange={(e) => handleEducationInputChange(index, 'year', e.target.value)}
                                                        placeholder='Year'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <input
                                                        type='text'
                                                        value={education.grade}
                                                        onChange={(e) => handleEducationInputChange(index, 'grade', e.target.value)}
                                                        placeholder='Grade'
                                                        className='border p-2 px-4 mr-2'
                                                    />
                                                    <button onClick={() => removeEducation(education.id)} className='text-red-500'>
                                                        <MdDelete />
                                                    </button>
                                                </>
                                            ) : (
                                                <span>{education.institution} - {education.degree} ({education.year}) - Grade: {education.grade}</span>
                                            )}
                                        </div>
                                    ))}
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
                            <div stye className={`${alerts.delete ? "flex" : "hidden"} fixed top-0 left-0 z-40 items-center justify-center h-full w-full backdrop-blur-lg bg-indigo-700 bg-opacity-10`}>
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