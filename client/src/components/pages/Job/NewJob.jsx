import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { PiUploadSimple } from "react-icons/pi";

function NewJob() {
    const navigate = useNavigate();
    const userLoggedIn = JSON.parse(localStorage.getItem("userDetails"))

    // State to store the list of skills
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [jobExpiry, setJobExpiry] = useState("No Expiry")

    const [jobDetails, setJobDetails] = useState({
        job_title: "",
        job_type: 'Full Time',
        experience: 'Any',
        min_experience: "1",
        max_experience: "5",
        skills: "",
        job_shift: 'Morning',
        genders: "",
        required_qualification: "",
        job_desc: "",
        job_location: "",
        number_of_opening: "",
        interview_timing: "",
        job_timing: "",
        min_offered_salary: "",
        max_offered_salary: "",
        job_shift: "",
        created_by: "",
        job_status: "",
        job_exp_date: "",
        job_scheduled_date: "",
        job_location: "",
        job_scheduled_time: "",
    });

    useEffect(() => {
        setJobDetails((values) => ({ ...values, skills: skills.join(', ') }))
        console.log(jobDetails.skills)
    }, [skills])

    const createJobPost = () => {
        axios.post("/post_job", {
            job_title: jobDetails.job_title,
            job_type: jobDetails.job_type,
            experience: jobDetails.experience,
            min_experience: jobDetails.min_experience,
            max_experience: jobDetails.max_experience,
            skills: jobDetails.skills,
            job_shift: jobDetails.job_shift,
            genders: jobDetails.genders,
            required_qualification: jobDetails.required_qualification,
            job_desc: jobDetails.job_desc,
            job_location: jobDetails.job_location,
            number_of_opening: jobDetails.number_of_opening,
            interview_timing: jobDetails.interview_timing,
            job_timing: jobDetails.job_timing,
            min_offered_salary: jobDetails.min_offered_salary,
            max_offered_salary: jobDetails.max_offered_salary,
            job_shift: jobDetails.job_shift,
            created_by: userLoggedIn ? userLoggedIn.username : "not defined",
            job_status: jobDetails.job_scheduled_date === "" ? "Active" : "Scheduled",
            job_exp_date: jobDetails.job_exp_date === "" ? null : jobDetails.job_exp_date,
            job_scheduled_date: jobDetails.job_scheduled_date,
            job_scheduled_time: jobDetails.job_scheduled_time
        }).then((res) => {
            console.log(res.data);
            navigate("/jobs")

        }).catch((err) => console.log(err))
    }

    // Function to handle adding a skill to the array
    const addSkill = () => {
        if (skillInput && !skills.includes(skillInput)) {
            setSkills(prevSkills => [...prevSkills, skillInput]); // Add new skill to array
            setSkillInput(''); // Reset input field
        }
    };

    // Function to handle removing a skill from the array
    const removeSkill = (skillToRemove) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove));
    };

    // Function to handle the Enter key to add skills
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addSkill();
        }
    };



    // Schedule the Job
    // Schedule the Job
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const openSchedulePopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const saveScheduleJob = () => {
        // Combine date and time
        const scheduledDateTime = `${selectedDate} ${selectedTime}`;

        // Update jobDetails with the scheduled date and time
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            job_scheduled_date: scheduledDateTime,
        }));

        // Close the popup
        setIsPopupOpen(false);
    };


    return (
        <div className='p-6 bg-gray-100 h-full max-h-full overflow-auto'>
            <h1 className='text-2xl font-bold py-5'>Create New Job</h1>
            <div className='bg-white p-4 pt-8 mt-4 shadow-xl rounded-[8px]'>
                <div className='flex items-center gap-4'>
                    <label className='font-semibold inline-block mb-2'>Job Type *</label>
                    <div className='flex gap-4'>
                        <button
                            className={`h-[40px] rounded-[8px] w-32 ${jobDetails.job_type === 'Full Time' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => {
                                setJobDetails((values) => ({ ...values, job_type: 'Full Time' }));
                            }}>
                            Full Time
                        </button>
                        <button
                            className={`h-[40px] rounded-[8px] w-32 ${jobDetails.job_type === 'Part Time' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => setJobDetails((values) => ({ ...values, job_type: 'Part Time' }))}>
                            Part Time
                        </button>
                        <button
                            className={`h-[40px] rounded-[8px] w-32 ${jobDetails.job_type === 'Internship' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => setJobDetails((values) => ({ ...values, job_type: 'Internship' }))}>
                            Internship
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-6 mt-6'>
                    <div>
                        <label className='font-semibold block mb-2'>Job Title</label>
                        <input type='text' className='p-2.5 border rounded-[8px] w-full'
                            onChange={(e) => setJobDetails((values) => ({ ...values, job_title: e.target.value }))}
                        />
                    </div>

                    {/* Job Location Selection */}
                    <div className='bg-white select-none'>
                        <label className='font-semibold block mb-2'>Job Location</label>
                        <select defaultValue={"--"} onChange={(e) => setJobDetails((values) => ({ ...values, job_location: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option value={"--"} defaultValue={true} disabled={true}>--- Select Job Location ---</option>
                            <option value={"Janakpuri"}>JanakPuri C-8, New Delhi - India</option>
                            <option value={"Future House, Luton - England"}>Future House, Luton - England</option>
                            <option value={"Time-Square, New-York - USA"}>Time-Square, New-York - USA</option>
                        </select>
                    </div>

                    <div>
                        <label className='font-semibold block mb-2'>No. of Openings</label>
                        <input type='number' className='p-2.5 border rounded-[8px] w-full'
                            onChange={(e) => setJobDetails((values) => ({ ...values, number_of_opening: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className='font-semibold block mb-2'>Interview Timings</label>
                        {/* <input type='text' className='p-2.5 border rounded-[8px] w-full'
                            onChange={(e) => setJobDetails((values) => ({ ...values, interview_timing: e.target.value }))}
                        /> */}
                        <select defaultValue={"--"} onChange={(e) => setJobDetails((values) => ({ ...values, interview_timing: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option value={"--"} defaultValue={true} disabled={true}>-- Please Select Interview Timing --</option>
                            <option value={"Mon - Fri || Regular Time"}>Mon - Fri || Regular Time</option>
                            <option value={"Mon - Sat || Regular Time"}>Mon - Sat || Regular Time</option>
                            <option value={"Sat Only || Regular Time"}>Sat Only || Regular Time</option>
                        </select>
                    </div>

                    <div>
                        <label className='font-semibold block mb-2'>Job Timings</label>
                        <select defaultValue={"--"} onChange={(e) => setJobDetails((values) => ({ ...values, job_timing: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option value={"--"} defaultValue={true} disabled={true}>-- Please Select Job Shift/ Timing --</option>
                            <option value={"Regular Shift"}>Regular Shift</option>
                            <option value={"Shift 2"}>Shift 2</option>
                            <option value={"Shift 3"}>Shift 3</option>
                        </select>
                        {/* <input type='text' className='p-2.5 border rounded-[8px] w-full'
                            onChange={(e) => setJobDetails((values) => ({ ...values, job_timing: e.target.value }))}
                        /> */}
                    </div>

                    {/* Qualification Selection */}
                    <div className='bg-white select-none'>
                        <label className='font-semibold block mb-2'>Select Required Qualification</label>
                        <select defaultValue={"--"} onChange={(e) => setJobDetails((values) => ({ ...values, required_qualification: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option value={"--"} defaultValue={true} disabled={true}>-- Please Select Minimum Qualification --</option>
                            <option value={"10th"}>10th</option>
                            <option value={"12th"}>12th</option>
                            <option value={"Graduation"}>Graduation</option>
                            <option value={"Post Graduation"}>Post - Graduation</option>
                        </select>
                    </div>

                </div>



                <h1 className='mt-6 mb-2 font-semibold'>Monthly In-hand Salary</h1>
                <div className='flex'>
                    <input type='text' className='p-2.5 border rounded-[8px] w-full' placeholder='eg. 30,000/-'
                        onChange={(e) => setJobDetails((values) => ({ ...values, min_offered_salary: e.target.value }))}
                    />
                    <div className='bg-gray-200 flex items-center justify-center w-60 mx-4 rounded-[8px]'>
                        To
                    </div>
                    <input type='text' className='p-2.5 border rounded-[8px] w-full' placeholder='eg. 30,000/-'
                        onChange={(e) => setJobDetails((values) => ({ ...values, max_offered_salary: e.target.value }))}
                    />
                </div>


                {/* Job Shift Section */}
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='font-semibold inline-block mb-2 mt-4'>Job Shift *</label>
                        <div className='flex gap-4'>
                            <button
                                className={`h-[40px] w-32 rounded-[8px] ${jobDetails.job_shift === 'Morning' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                                onClick={() => setJobDetails((values) => ({ ...values, job_shift: 'Morning' }))}>
                                Morning
                            </button>
                            <button
                                className={`h-[40px] w-32 rounded-[8px] ${jobDetails.job_shift === 'Afternoon' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                                onClick={() => setJobDetails((values) => ({ ...values, job_shift: 'Afternoon' }))}>
                                Afternoon
                            </button>
                            <button
                                className={`h-[40px] w-32 rounded-[8px] ${jobDetails.job_shift === 'Night' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                                onClick={() => setJobDetails((values) => ({ ...values, job_shift: 'Night' }))}>
                                Night
                            </button>
                        </div>
                    </div>


                    <div className='bg-white p-4 mt-4 select-none'>
                        <label className='font-semibold block mb-2'>Select Preffered Gender(s)</label>
                        <select defaultValue={"--"} onChange={(e) => setJobDetails((values) => ({ ...values, genders: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option value={"--"} defaultValue={true} disabled={true}>--- Select Preffered Gender(s) ---</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Both"}>Both</option>
                            <option value={"Other"}>Other</option>
                        </select>
                    </div>

                </div>

            </div>


            <div className='bg-white p-4 mt-4 shadow-xl rounded-[8px]'>
                <label className='font-semibold block mb-2'>Job Description</label>
                <textarea className='w-full min-h-60 h-60 border rounded-[8px] p-4'
                    onChange={(e) => setJobDetails((values) => ({ ...values, job_desc: e.target.value }))}
                ></textarea>
            </div>




            <div className='bg-white p-4 mt-4 select-none shadow-xl rounded-[8px]'>
                <h1 className='text-xl font-semibold mb-4'>Expreinece Details</h1>
                <label className='font-semibold inline-block mb-2'>Total Experience Required *</label>
                <div className='flex gap-4'>
                    <button
                        className={`h-[40px] rounded-[8px] px-4 min-w-32 ${jobDetails.experience === 'Any' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                        onClick={() => setJobDetails((values) => ({ ...values, experience: 'Any' }))}>
                        Any
                    </button>
                    <button
                        className={`h-[40px] rounded-[8px] px-4 min-w-32 ${jobDetails.experience === 'Freshers Only' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                        onClick={() => setJobDetails((values) => ({ ...values, experience: 'Freshers Only' }))}>
                        Freshers Only
                    </button>
                    <button
                        className={`h-[40px] rounded-[8px] px-4 min-w-32 ${jobDetails.experience === 'Experienced Only' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                        onClick={() => setJobDetails((values) => ({ ...values, experience: 'Experienced Only' }))}>
                        Experienced Only
                    </button>
                </div>

                {jobDetails.experience === 'Experienced Only' && (
                    <div className='mt-4 grid grid-cols-2 gap-4 cursor-default'>
                        <div className='w-full'>
                            <label className='font-semibold block mb-2'>Minimum Experience</label>
                            <select
                                defaultValue={"--"}
                                onChange={(e) => setJobDetails((values) => ({ ...values, min_experience: e.target.value }))}
                                className='p-2.5 border rounded-[8px] w-full cursor-pointer'>
                                <option value={"--"} defaultValue={true} disabled={true}>-- Select Maximum Experience --</option>
                                <option value={"1"}>1 Year</option>
                                <option value={"2"}>2 Years</option>
                                <option value={"3"}>3 Years</option>
                                <option value={"4"}>4 Years</option>
                                <option value={"5"}>5 Years</option>
                                <option value={"6"}>6 Years</option>
                                <option value={"7"}>7 Years</option>
                                <option value={"8"}>8 Years</option>
                                <option value={"9"}>9 Years</option>
                                <option value={"10"}>10 Years</option>
                                <option value={"11"}>11 Years</option>
                                <option value={"12"}>12 Years</option>
                                <option value={"13"}>13 Years</option>
                                <option value={"14"}>14 Years</option>
                                <option value={"15"}>15 Years</option>
                                <option value={"16"}>16 Years</option>
                                <option value={"17"}>17 Years</option>
                                <option value={"18"}>18 Years</option>
                                <option value={"19"}>19 Years</option>
                                <option value={"20"}>20 Years</option>
                            </select>
                        </div>

                        <div>
                            <label className='font-semibold block mb-2'>Maximum Experience</label>
                            <select 
                                defaultValue={"--"}
                                onChange={(e) => setJobDetails((values) => ({ ...values, max_experience: e.target.value }))}
                                className='p-2.5 border rounded-[8px] w-full cursor-pointer'>
                                <option value={"--"} defaultValue={true} disabled={true}>-- Select Maximum Experience --</option>
                                <option value={"1"}>1 Year</option>
                                <option value={"2"}>2 Years</option>
                                <option value={"3"}>3 Years</option>
                                <option value={"4"}>4 Years</option>
                                <option value={"5"}>5 Years</option>
                                <option value={"6"}>6 Years</option>
                                <option value={"7"}>7 Years</option>
                                <option value={"8"}>8 Years</option>
                                <option value={"9"}>9 Years</option>
                                <option value={"10"}>10 Years</option>
                                <option value={"11"}>11 Years</option>
                                <option value={"12"}>12 Years</option>
                                <option value={"13"}>13 Years</option>
                                <option value={"14"}>14 Years</option>
                                <option value={"15"}>15 Years</option>
                                <option value={"16"}>16 Years</option>
                                <option value={"17"}>17 Years</option>
                                <option value={"18"}>18 Years</option>
                                <option value={"19"}>19 Years</option>
                                <option value={"20"}>20 Years</option>
                            </select>
                        </div>
                    </div>
                )}

                {jobDetails.experience === 'Freshers Only' && (
                    <div className='mt-4 p-2.5 bg-yellow-100 text-yellow-700 border rounded-[8px] px-4 border-yellow-200'>
                        Freshers with no prior experience can apply for this job.
                    </div>
                )}
            </div>



            <div className='bg-white p-4 mt-4 select-none shadow-xl rounded-[8px]'>
                <h1 className='text-xl font-semibold'>Skills</h1>
                <div className='skills-manager mt-4'>
                    <h1 className='mb-2 font-semibold'>Manage Skills</h1>

                    {/* Input for new skills */}
                    <div className='flex'>
                        <input
                            type='text'
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={handleKeyPress} // Add skill on Enter key press
                            placeholder='Add a skill'
                            className='border rounded-lg p-2 px-4'
                        />
                    </div>

                    {/* Display the list of skills */}
                    <div className='mt-4 flex flex-wrap'>
                        {skills.map((skill, index) => (
                            <div key={index} className='skill-item bg-gray-200 px-4 py-2 rounded-full mr-2 mt-2'>
                                {skill}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className='ml-2 text-red-500'>
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className='bg-white p-4 mt-4 select-none shadow-xl rounded-[8px]'>
                <h1 className='text-xl font-semibold mb-4'>Job Expiry</h1>
                <button
                    className={`h-[40px] rounded-[8px] px-4 min-w-32 ${jobExpiry === 'No Expiry' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                    onClick={() => setJobExpiry("No Expiry")}>
                    No Expiry
                </button>
                <button
                    className={`h-[40px] rounded-[8px] ml-4 px-4 min-w-32 ${jobExpiry === 'Set Expiry' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                    onClick={() => setJobExpiry("Set Expiry")}>
                    Set Expiry
                </button>

                <div className={`${jobExpiry === "Set Expiry" ? "block" : "hidden"} mt-4`}>
                    <h1 className='mb-2 font-semibold'>Set Expiry Date</h1>
                    <input type="date" className='p-2 px-6 border w-2/4 rounded-xl' onChange={(e) => setJobDetails((values) => ({ ...values, job_exp_date: e.target.value }))} />
                </div>
            </div>


            {/* <div className='bg-white p-4 mt-4 select-none shadow-xl rounded-[8px]'>
                <h1 className='text-xl font-semibold mb-4'>Upload Job Description - PDF</h1>
                <label htmlFor="uploadPDF" className='inline-flex gap-4 items-center justify-center cursor-pointer h-28 w-80 rounded-xl bg-gray-100'>
                    <PiUploadSimple size={"20px"} /> Click Here To Upload
                </label>
                <input type="file" id='uploadPDF' className='hidden' accept="application/pdf" />
            </div> */}



            <div className='py-4 text-right mt-10'>
                <button className='p-2.5 bg-indigo-100 rounded-[8px] px-10 mr-4' onClick={openSchedulePopup}> Schedule Job </button>
                <button className='p-2.5 bg-indigo-700 rounded-[8px] text-white px-10' onClick={createJobPost}> Post Job </button>
            </div>



            {/* Schedule Popup */}
            {isPopupOpen && (
                <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-[30em] p-10 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Schedule Job</h2>
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">Select Date</label>
                            <input
                                type="date"
                                className="p-2.5 border rounded w-full"
                                defaultValue={selectedDate}
                                onChange={(e) => setJobDetails((values) => ({ ...values, job_scheduled_date: e.target.value }))}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">Select Time</label>
                            <input
                                type="time"
                                className="p-2.5 border rounded w-full"
                                value={selectedTime}
                                onChange={(e) => {
                                    setSelectedTime(e.target.value);
                                    setJobDetails((values) => ({...values, job_scheduled_time: e.target.value}))
                                }}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="p-2.5 px-8 bg-gray-200 rounded mr-4"
                                onClick={closePopup} // Function to close the popup
                            >Cancel</button>
                            <button
                                className="p-2.5 px-8 bg-indigo-700 text-white rounded"
                                onClick={() => {
                                    saveScheduleJob();
                                    createJobPost();
                                }}
                            >Schedule Job</button>
                        </div>
                    </div>
                </div>
            )}


            <br /><br />
        </div>
    );
}

export default NewJob;