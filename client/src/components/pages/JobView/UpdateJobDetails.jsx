import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateJobDetails() {
    const navigate = useNavigate();
    const { jobId } = useParams();


    // const [allStatus, setAllStatus] = useState({
    //   error
    // })
    const [jobDetails, setJobDetails] = useState({
        job_title: "",
        job_type: 'Full Time',
        experience: 'Any',
        min_experience: "1",
        max_experience: "5",
        skills: [],
        job_shift: 'Morning',
        genders: "", // Store selected Gender
        required_qualification: [],
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
        job_scheduled_date: "",
    });

    // State to store the list of skills
    const [skillInput, setSkillInput] = useState('');
    const [defaultData, setDefaultData] = useState({})
    const [skills, setSkills] = useState(defaultData.skills ? defaultData.skills.split(",") : []);
    useEffect(() => {
        setSkills(defaultData.skills ? defaultData.skills.split(",") : [])
    }, [defaultData])

    // setDefaultData((values) => ({ ...values, skills: skills.join(', ') }))
    useEffect(() => {
        // console.log(skills)
        // setDefaultData((values) => ({...values, skills: skills}))
    }, [skills])


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

    const [lastSkills, setLastSkills] = useState()
    useEffect(() => {
        setLastSkills(defaultData.skills ? defaultData.skills.split(",") : []);
    }, [defaultData])

    useEffect(() => {
        axios.get(`/id_based_jobs/${jobId}`)
            .then((res) => {
                setDefaultData(res.data.job);
                console.log(res.data.job)
                setDefaultData((values) => ({ ...values, skills: res.data.job.skills }));
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const updateJobPost = () => {
        axios.post(`/update_job_post/${jobId}`, defaultData).then((res) => {
            navigate(-1);
        }).catch((err) => console.log(err))
    }

    const [isMinDropdownOpen, setIsMinDropdownOpen] = useState(false);
    const [isMaxDropdownOpen, setIsMaxDropdownOpen] = useState(false);

    const minDropdownRef = useRef(null);
    const maxDropdownRef = useRef(null);

    const experienceOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]; // For years of experience
    const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Days for call availability


    // Gender Selection
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false); // State to manage dropdown visibility
    const genderDropdownRef = useRef(null); // Ref for dropdown
    const genderOptions = ['Male', 'Female']; // Gender options

    // Function to handle toggling gender selection
    const handleGenderToggle = (gender) => {
        setDefaultData((prevDetails) => {
            // Convert the CSV string to an array
            const genderArray = prevDetails.genders ? prevDetails.genders.split(', ') : [];

            // Check if the gender is already selected
            const isGenderSelected = genderArray.includes(gender);

            // Update the array by removing or adding the selected gender
            const updatedGenders = isGenderSelected
                ? genderArray.filter((g) => g !== gender) // Remove if selected
                : [...genderArray, gender]; // Add if not selected

            // Join the updated array back into a CSV string
            const updatedGendersCSV = updatedGenders.join(', ');

            // Update jobDetails with the new CSV string
            return { ...prevDetails, genders: updatedGendersCSV };
        });
    };





    // Close the dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
                setIsGenderDropdownOpen(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    const handleExperienceSelect = (key, value) => {
        setDefaultData((prev) => ({ ...prev, [key]: value }));
    };

    const handleDaySelect = (day) => {
        setDefaultData((prev) => {
            const newCustomCallDays = prev.customCallDays.includes(day)
                ? prev.customCallDays.filter((d) => d !== day)
                : [...prev.customCallDays, day];
            return { ...prev, customCallDays: newCustomCallDays };
        });
    };

    // Set predefined call days based on option selected
    const handleCallDaysTypeSelect = (type) => {
        let customCallDays = [];
        if (type === 'Monday to Wednesday') {
            customCallDays = ['Monday', 'Tuesday', 'Wednesday'];
        } else if (type === 'Monday to Friday') {
            customCallDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        } else if (type === 'Monday to Saturday') {
            customCallDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }
        setDefaultData((prev) => ({
            ...prev,
            callDaysType: type,
            customCallDays: type === 'Custom' ? prev.customCallDays : customCallDays,
        }));
    };

    // Effect to detect clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (minDropdownRef.current && !minDropdownRef.current.contains(event.target)) {
                setIsMinDropdownOpen(false);
            }
            if (maxDropdownRef.current && !maxDropdownRef.current.contains(event.target)) {
                setIsMaxDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // Minimum Qualifications
    const [isQualificationDropdownOpen, setIsQualificationDropdownOpen] = useState(false); // State for qualifications dropdown
    const qualificationDropdownRef = useRef(null); // Ref for qualifications dropdown

    // Qualification Selection
    const qualificationOptions = ['10th', '12th', 'Graduation', 'Post-Graduation']; // Qualification options

    // Function to handle toggling qualification selection
    const handleQualificationToggle = (qualification) => {
        setDefaultData((prevDetails) => {
            const isQualificationSelected = prevDetails.required_qualification.includes(qualification);
            const updatedrequired_qualification = isQualificationSelected
                ? prevDetails.required_qualification.filter((q) => q !== qualification)
                : [...prevDetails.required_qualification, qualification];

            return { ...prevDetails, required_qualification: updatedrequired_qualification };
        });
    };

    // Close the dropdown if clicked outside (existing code)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
                setIsGenderDropdownOpen(false);
            }
            if (qualificationDropdownRef.current && !qualificationDropdownRef.current.contains(event.target)) {
                setIsQualificationDropdownOpen(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    // Job Location Handling
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const locationDropdownRef = useRef(null);
    const locationOptions = ['Janakpuri, New Delhi', 'other'];

    const handleLocationToggle = (location) => {
        setDefaultData((prev) => ({
            ...prev,
            job_location: prev.job_location === location ? '' : location, // Toggle single selection for location
        }));
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
        setDefaultData((prevDetails) => ({
            ...prevDetails,
            job_scheduled_date: scheduledDateTime,
        }));

        // Close the popup
        setIsPopupOpen(false);
    };


    return (
        <div className='p-4 bg-gray-100 h-full max-h-full overflow-auto'>
            <h1 className='text-xl font-bold'>
                Update Job Details
            </h1>
            <div className='bg-white p-4 pt-8 mt-4 shadow-xl rounded-[8px]'>
                <div className='flex items-center gap-4'>
                    <label className='font-semibold inline-block mb-2'>Job Type *</label>
                    <div className='flex gap-4'>
                        <button
                            className={`h-[40px] rounded-[8px] w-32 ${defaultData.job_type === 'Full Time' || defaultData.job_type === 'Full-Time' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => {
                                setDefaultData((values) => ({ ...values, job_type: 'Full Time' }));
                            }}>
                            Full Time
                        </button>
                        <button
                            className={`h-[40px] rounded-[8px] w-32 ${defaultData.job_type === 'Part Time' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => setDefaultData((values) => ({ ...values, job_type: 'Part Time' }))}>
                            Part Time
                        </button>
                        <button
                            className={`h-[40px] rounded-[8px] w-32 ${defaultData.job_type === 'Internship' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => setDefaultData((values) => ({ ...values, job_type: 'Internship' }))}>
                            Internship
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-6 mt-6'>
                    <div>
                        <label className='font-semibold block mb-2'>Job Title</label>
                        <input type='text' className='p-2.5 border rounded-[8px] w-full'
                            defaultValue={defaultData.job_title}
                            onChange={(e) => setDefaultData((values) => ({ ...values, job_title: e.target.value }))}
                        />
                    </div>

                    {/* Job Location Selection */}
                    <div className='bg-white'>
                        <label className='font-semibold block mb-2'>Job Location</label>
                        <select value={defaultData.job_location ? defaultData.job_location : "--"}
                            onChange={(e) => setDefaultData((values) => ({ ...values, job_location: e.target.value }))}
                            className='p-2.5 border rounded-[8px] w-full'>
                            <option disabled={true} value={"--"}>--- Select Job Location ---</option>
                            <option value={"Janakpuri"}>JanakPuri C-8, New Delhi - India</option>
                            <option value={"Future House, Luton - England"}>Future House, Luton - England</option>
                            <option value={"Time-Square, New-York - USA"}>Time-Square, New-York - USA</option>
                        </select>
                    </div>

                    <div>
                        <label className='font-semibold block mb-2'>No. of Openings</label>
                        <input type='number' className='p-2.5 border rounded-[8px] w-full'
                            defaultValue={defaultData.number_of_opening}
                            onChange={(e) => setDefaultData((values) => ({ ...values, number_of_opening: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className='font-semibold block mb-2'>Interview Timings</label>
                        <select value={defaultData.interview_timing ? defaultData.interview_timing : "--"} onChange={(e) => setDefaultData((values) => ({ ...values, interview_timing: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option disabled={true} value={"--"}>-- Interview Timings --</option>
                            <option value={"Mon - Fri || Regular Time"}>Mon - Fri || Regular Time</option>
                            <option value={"Mon - Sat || Regular Time"}>Mon - Sat || Regular Time</option>
                            <option value={"Sat Only || Regular Time"}>Sat Only || Regular Time</option>
                        </select>
                    </div>


                    <div>
                        <label className='font-semibold block mb-2'>Job Timings</label>
                        <select value={defaultData.job_timing ? defaultData.job_timing : "--"} onChange={(e) => setDefaultData((values) => ({ ...values, job_timing: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option disabled={true} value={"--"}>-- Select Minimum Qualification --</option>
                            <option value={"Regular Shift"}>Regular Shift</option>
                            <option value={"Shift 2"}>Shift 2</option>
                            <option value={"Shift 3"}>Shift 3</option>
                        </select>
                    </div>

                    <div className='bg-white select-none'>
                        <label className='font-semibold block mb-2'>Minimum Qualification</label>
                        <select value={defaultData.required_qualification ? defaultData.required_qualification : "--"}
                            onChange={(e) => setDefaultData((values) => ({ ...values, required_qualification: e.target.value }))}
                            className='p-2.5 border rounded-[8px] w-full '>
                            <option value={"--"} disabled={true}>-- Select Minimum Qualification --</option>
                            <option value={"10th Pass"}>10th Pass</option>
                            <option value={"12th Pass"}>12th Pass</option>
                            <option value={"Graduation"}>Graduation</option>
                            <option value={"Post Graduation"}>Post Graduation</option>
                        </select>
                    </div>

                </div>


                <h1 className='mt-6 mb-2 font-semibold'>Monthly In-hand Salary</h1>
                <div className='flex'>
                    <input type='text' className='p-2.5 border rounded-[8px] w-full' placeholder='eg. 30,000/-'
                        defaultValue={defaultData.min_offered_salary}
                        onChange={(e) => setDefaultData((values) => ({ ...values, min_offered_salary: e.target.value }))}
                    />
                    <div className='bg-gray-200 flex items-center justify-center w-60 mx-4 rounded-[8px]'>
                        To
                    </div>
                    <input type='text' className='p-2.5 border rounded-[8px] w-full' placeholder='eg. 30,000/-'
                        defaultValue={defaultData.max_offered_salary}
                        onChange={(e) => setDefaultData((values) => ({ ...values, max_offered_salary: e.target.value }))}
                    />
                </div>


                {/* Job Shift Section */}
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='font-semibold inline-block mb-2 mt-4'>Job Shift *</label>
                        <div className='flex gap-4'>
                            <button
                                className={`h-[40px] w-32 rounded-[8px] ${defaultData.job_shift === 'Morning' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                                onClick={() => setDefaultData((values) => ({ ...values, job_shift: 'Morning' }))}>
                                Morning
                            </button>
                            <button
                                className={`h-[40px] w-32 rounded-[8px] ${defaultData.job_shift === 'Afternoon' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                                onClick={() => setDefaultData((values) => ({ ...values, job_shift: 'Afternoon' }))}>
                                Afternoon
                            </button>
                            <button
                                className={`h-[40px] w-32 rounded-[8px] ${defaultData.job_shift === 'Night' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                                onClick={() => setDefaultData((values) => ({ ...values, job_shift: 'Night' }))}>
                                Night
                            </button>
                        </div>
                    </div>


                    <div className='bg-white p-4 mt-4'>
                        <label className='font-semibold block mb-2'>Select Gender(s)</label>
                        <select value={defaultData.genders ? defaultData.genders : "--"}
                            onChange={(e) => setDefaultData((values) => ({ ...values, genders: e.target.value }))}
                            className='p-2.5 border rounded-[8px] w-full'>
                            <option value={"--"} disabled={true}>-- Select Genders --</option>
                            <option value={"Only Male"}>Only Male</option>
                            <option value={"Only Female"}>Only Female</option>
                            <option value={"Both"}>Both</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className='bg-white p-4 mt-4 shadow-xl rounded-[8px]'>
                <label className='font-semibold block mb-2'>Job Description</label>
                <textarea className='w-full min-h-60 h-60 border rounded-[8px] p-4'
                    onChange={(e) => setDefaultData((values) => ({ ...values, job_desc: e.target.value }))}
                    defaultValue={defaultData.job_desc}
                ></textarea>
            </div>




            <div className='bg-white p-4 mt-4 select-none shadow-xl rounded-[8px]'>
                <h1 className='text-xl font-semibold mb-4'>Expreinece Details</h1>
                <label className='font-semibold inline-block mb-2'>Total Experience Required *</label>
                <div className='flex gap-4'>
                    <button
                        className={`h-[40px] rounded-[8px] px-4 min-w-32 ${defaultData.experience === 'Any' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                        onClick={() => setDefaultData((values) => ({ ...values, experience: 'Any' }))}>
                        Any
                    </button>
                    <button
                        className={`h-[40px] rounded-[8px] px-4 min-w-32 ${defaultData.experience === 'Freshers Only' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                        onClick={() => setDefaultData((values) => ({ ...values, experience: 'Freshers Only' }))}>
                        Freshers Only
                    </button>
                    <button
                        className={`h-[40px] rounded-[8px] px-4 min-w-32 ${defaultData.experience === 'Experienced Only' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                        onClick={() => setDefaultData((values) => ({ ...values, experience: 'Experienced Only' }))}>
                        Experienced Only
                    </button>
                </div>

                {defaultData.experience === 'Experienced Only' && (
                    <div className='mt-4 grid grid-cols-2 gap-4 cursor-default'>
                        <div className='bg-white p-4 select-none'>
                            <label className='font-semibold block mb-2'>Minimum Experience</label>
                            <select defaultValue={defaultData.min_experience}
                                onChange={(e) => setDefaultData((values) => ({ ...values, min_experience: e.target.value }))}
                                className='p-2.5 border rounded-[8px] w-full '>
                                <option value={"Select Miminum Qualification"} disabled={true}>-- Select Maximum Experience --</option>
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

                        <div className='bg-white p-4 select-none'>
                            <label className='font-semibold block mb-2'>Maximum Experience</label>
                            <select defaultValue={defaultData.max_experience}
                                onChange={(e) => setDefaultData((values) => ({ ...values, max_experience: e.target.value }))}
                                className='p-2.5 border rounded-[8px] w-full '>
                                <option value={"Select Miminum Qualification"} disabled={true}>-- Select Maximum Experience --</option>
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


                <div>
                    <label className='font-semibold inline-block mb-2 mt-4'>Job Status *</label>
                    <div className='flex gap-4'>
                        <button
                            className={`h-[40px] w-32 rounded-[8px] ${defaultData.job_status === 'Active' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => setDefaultData((values) => ({ ...values, job_status: 'Active' }))}>
                            Active
                        </button>
                        <button
                            className={`h-[40px] w-32 rounded-[8px] ${defaultData.job_status === 'Inactive' ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            onClick={() => setDefaultData((values) => ({ ...values, job_status: 'Inactive' }))}>
                            In-Active
                        </button>
                    </div>
                </div>
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


            <div className='py-4 text-right mt-10'>
                {/* <button className='p-2.5 bg-indigo-100 rounded-[8px] px-10 mr-4' onClick={openSchedulePopup} >
          Schedule Job
        </button> */}
                <button onClick={() => navigate(-1)} to={"/"} className='text-base font-normal p-2.5 bg-black text-white rounded-lg px-5 mr-4'>Cancel</button>
                <button className='p-2.5 bg-indigo-700 rounded-[8px] text-white px-10' onClick={updateJobPost}>
                    Update Job
                </button>
            </div>

            {/* Schedule Popup */}
            {/* {isPopupOpen && (
        <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[30em] p-10 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Schedule Job</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select Date</label>
              <input
                type="date"
                className="p-2.5 border rounded w-full"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select Time</label>
              <input
                type="time"
                className="p-2.5 border rounded w-full"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
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
                  updateJobPost();
                }}
              >Schedule Job</button>
            </div>
          </div>
        </div>
      )} */}


            <br /><br />
        </div>
    );
}

export default UpdateJobDetails;