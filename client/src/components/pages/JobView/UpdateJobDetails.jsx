import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateJobDetails() {
    const navigate = useNavigate()
    const { jobId } = useParams()
    const [defaultData, setDefaultData] = useState({})
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

    useEffect(() => {
        setJobDetails({
            job_title: jobData.job_title || "",
            job_type: jobData.job_type || "Full Time",
            experience: jobData.experience || "Any",
            min_experience: jobData.min_experience || "1",
            max_experience: jobData.max_experience || "5",
            skills: parsedSkills, // Updated skills array
            job_shift: jobData.job_shift || 'Morning',
            genders: jobData.genders || "", // Selected gender
            required_qualification: jobData.required_qualification ? jobData.required_qualification.split(',') : [],
            job_desc: jobData.job_desc || "",
            job_location: jobData.job_location || "",
            number_of_opening: jobData.number_of_opening || "",
            interview_timing: jobData.interview_timing || "",
            job_timing: jobData.job_timing || "",
            min_offered_salary: jobData.min_offered_salary || "",
            max_offered_salary: jobData.max_offered_salary || "",
            created_by: jobData.created_by || "",
            job_status: jobData.job_status || "",
            job_exp_date: jobData.job_exp_date || "",
            job_scheduled_date: jobData.job_scheduled_date || "",
        });
    }, [jobId])

    useEffect(() => {
        axios.get(`/id_based_jobs/${jobId}`)
            .then((res) => {
                console.log(res.data);
                setDefaultData(res.data.job);
                console.log(defaultData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const updateJobPost = () => {
        axios.post("/post_job", {
            job_title: jobDetails.job_title,
            job_type: jobDetails.job_type,
            experience: jobDetails.experience,
            min_experience: jobDetails.min_experience,
            max_experience: jobDetails.max_experience,
            skills: "skills,kjhh",
            job_shift: jobDetails.job_shift,
            genders: jobDetails.genders, // Store selected genders
            required_qualification: "jobDetails.required_qualification",
            job_desc: jobDetails.job_desc,
            job_location: jobDetails.job_location,
            number_of_opening: jobDetails.number_of_opening,
            interview_timing: jobDetails.interview_timing,
            job_timing: jobDetails.job_timing,
            min_offered_salary: jobDetails.min_offered_salary,
            max_offered_salary: jobDetails.max_offered_salary,
            job_shift: jobDetails.job_shift,
            created_by: "jobDetails.created_by",
            job_status: jobDetails.job_status,
            job_exp_date: jobDetails.job_exp_date,
            job_scheduled_date: jobDetails.job_scheduled_date
        }).then((res) => {
            console.log(res.data);
            navigate("/jobs")

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
        setJobDetails((prevDetails) => {
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
        setJobDetails((prev) => ({ ...prev, [key]: value }));
    };

    const handleDaySelect = (day) => {
        setJobDetails((prev) => {
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
        setJobDetails((prev) => ({
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



    const [skillInput, setSkillInput] = useState('');

    // Function to handle adding a skill
    const addSkill = () => {
        if (skillInput && !jobDetails.skills.some(skill => skill.name === skillInput)) {
            setJobDetails(prevDetails => ({
                ...prevDetails,
                skills: [...prevDetails.skills, { name: skillInput, required: false }], // Add skill as an object
            }));
            setSkillInput('');
        }
    };

    // Function to handle removing a skill
    const removeSkill = (skillToRemove) => {
        setJobDetails(prevDetails => ({
            ...prevDetails,
            skills: prevDetails.skills.filter(skill => skill.name !== skillToRemove),
        }));
    };

    // Function to toggle the required status of a skill
    const toggleRequired = (skillName) => {
        setJobDetails(prevDetails => ({
            ...prevDetails,
            skills: prevDetails.skills.map(skill =>
                skill.name === skillName ? { ...skill, required: !skill.required } : skill
            ),
        }));
    };

    // Function to handle key press event
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addSkill();
        }
    };





    // Minimum Qualifications
    const [isQualificationDropdownOpen, setIsQualificationDropdownOpen] = useState(false); // State for qualifications dropdown
    const qualificationDropdownRef = useRef(null); // Ref for qualifications dropdown

    // Qualification Selection
    const qualificationOptions = ['10th', '12th', 'Graduation', 'Post-Graduation']; // Qualification options

    // Function to handle toggling qualification selection
    const handleQualificationToggle = (qualification) => {
        setJobDetails((prevDetails) => {
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
        setJobDetails((prev) => ({
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
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            job_scheduled_date: scheduledDateTime,
        }));

        // Close the popup
        setIsPopupOpen(false);
    };


    return (
        <div className='p-4 bg-gray-100 h-full max-h-full overflow-auto'>
            <h1 className='text-xl font-bold'><button onClick={() => navigate(-1)} to={"/"} className='text-base font-normal h-10 bg-black text-white rounded-full px-5 mr-4'>Go Back</button> Update Job Details</h1>
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
                            defaultValue={defaultData.job_title}
                            onChange={(e) => setJobDetails((values) => ({ ...values, job_title: e.target.value }))}
                        />
                    </div>

                    {/* Job Location Selection */}
                    <div className='bg-white select-none'>
                        <label className='font-semibold block mb-2'>Job Location</label>
                        <div className='relative w-full' ref={locationDropdownRef}>
                            <div
                                className='p-2.5 border rounded-[8px] cursor-pointer'
                                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                            >
                                {jobDetails.job_location
                                    ? jobDetails.job_location // Show selected location
                                    : 'Select Job Location'}
                            </div>
                            {isLocationDropdownOpen && (
                                <div className='absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto w-full'>
                                    {locationOptions.map((location) => (
                                        <div
                                            key={location}
                                            className={`flex items-center p-2.5 mb-2 cursor-pointer ${jobDetails.job_location === location
                                                ? 'bg-indigo-700 text-white'
                                                : 'hover:bg-indigo-50'
                                                }`}
                                            onClick={() => handleLocationToggle(location)}
                                        >
                                            <label className='font-semibold'>{location}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                        <select onChange={(e) => setJobDetails((values) => ({ ...values, interview_timing: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
                            <option value={"Mon - Fri || Regular Time"}>Mon - Fri || Regular Time</option>
                            <option value={"Mon - Sat || Regular Time"}>Mon - Sat || Regular Time</option>
                            <option value={"Sat Only || Regular Time"}>Sat Only || Regular Time</option>
                        </select>
                    </div>


                    <div>
                        <label className='font-semibold block mb-2'>Job Timings</label>
                        <select onChange={(e) => setJobDetails((values) => ({ ...values, job_timing: e.target.value }))} className='p-2.5 border rounded-[8px] w-full'>
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
                        <label className='font-semibold block mb-2'>Select Qualification(s)</label>
                        <div className='relative w-full' ref={qualificationDropdownRef}>
                            <div
                                className='p-2.5 border rounded-[8px] cursor-pointer'
                                onClick={() => setIsQualificationDropdownOpen(!isQualificationDropdownOpen)}
                            >
                                {jobDetails.required_qualification.length > 0
                                    ? jobDetails.required_qualification.join(',') // Show selected qualifications
                                    : 'Select Qualification(s)'}
                            </div>
                            {isQualificationDropdownOpen && (
                                <div className='absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto w-full'>
                                    {qualificationOptions.map((qualification) => (
                                        <div
                                            key={qualification}
                                            className={`flex items-center p-2.5 mb-2 cursor-pointer ${jobDetails.required_qualification.includes(qualification)
                                                ? 'bg-indigo-700 text-white'
                                                : 'hover:bg-indigo-50'
                                                }`}
                                            onClick={() => handleQualificationToggle(qualification)}
                                        >
                                            <label className='font-semibold'>{qualification}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                        <label className='font-semibold block mb-2'>Select Gender(s)</label>
                        <div className='relative w-full' ref={genderDropdownRef}>
                            <div
                                className='p-2.5 border rounded-[8px] cursor-pointer'
                                onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
                            >
                                {jobDetails.genders && jobDetails.genders.length > 0
                                    ? jobDetails.genders // Show selected genders (already CSV)
                                    : 'Select Gender(s)'}
                            </div>
                            {isGenderDropdownOpen && (
                                <div className='absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto w-full'>
                                    {genderOptions.map((gender) => (
                                        <div
                                            key={gender}
                                            className={`flex items-center p-2.5 mb-2 cursor-pointer ${jobDetails.genders.includes(gender)
                                                ? 'bg-indigo-700 text-white' // Selected state styles
                                                : 'hover:bg-indigo-50' // Hover effect
                                                }`}
                                            onClick={() => handleGenderToggle(gender)}
                                        >
                                            <label className='font-semibold'>{gender}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                            <div className='relative w-full' ref={minDropdownRef}>
                                <div
                                    className='p-2.5 border rounded-[8px]'
                                    onClick={() => setIsMinDropdownOpen(!isMinDropdownOpen)}>
                                    {jobDetails.min_experience === 11 ? '10+ years' : `${jobDetails.min_experience} year(s)`}
                                </div>
                                {isMinDropdownOpen && (
                                    <div className='w-full absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto'>
                                        {experienceOptions.map((value) => (
                                            <div
                                                key={value}
                                                className='p-2.5 hover:bg-indigo-50 rounded-[8px] w-full'
                                                onClick={() => {
                                                    handleExperienceSelect('min_experience', value);
                                                    setIsMinDropdownOpen(false);
                                                }}>
                                                {value === 11 ? '10+ years' : `${value} year(s)`}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className='font-semibold block mb-2'>Maximum Experience</label>
                            <div className='relative w-full' ref={maxDropdownRef}>
                                <div
                                    className='p-2.5 border rounded-[8px]'
                                    onClick={() => setIsMaxDropdownOpen(!isMaxDropdownOpen)}>
                                    {jobDetails.max_experience === 11 ? '10+ years' : `${jobDetails.max_experience} year(s)`}
                                </div>
                                {isMaxDropdownOpen && (
                                    <div className='w-full absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto'>
                                        {experienceOptions.map((value) => (
                                            <div
                                                key={value}
                                                className='p-2.5 hover:bg-indigo-50 rounded-[8px] w-full'
                                                onClick={() => {
                                                    handleExperienceSelect('max_experience', value);
                                                    setIsMaxDropdownOpen(false);
                                                }}>
                                                {value === 11 ? '10+ years' : `${value} year(s)`}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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
                <h1 className='text-xl font-bold'>Skills</h1>

                <div className='flex mt-4'>
                    <input
                        type='text'
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder='Type to search for skills'
                        className='border rounded-[8px] border-gray-300 p-2.5'
                    />
                </div>

                <div className='mt-4 flex flex-wrap'>
                    {jobDetails.skills.map((skill, index) => (
                        <div key={index} className='flex items-center bg-gray-100 text-blue-800 overflow-hidden px-5 py-3 rounded-full mr-2 mt-2 pr-14 relative'>
                            <button
                                onClick={() => toggleRequired(skill.name)}
                                className={`text-${skill.required ? 'green' : 'gray'}-500 -ml-2 mr-2`}
                            >
                                {skill.required ? <MdOutlineStarPurple500 size={'20px'} /> : <MdOutlineStarOutline size={'20px'} />}
                            </button>

                            {skill.name}

                            <button onClick={() => removeSkill(skill.name)} className='ml-2 bg-red-500 text-white inline-flex items-center justify-center absolute right-2 h-7 w-7 rounded-full'>
                                <IoMdClose size={'16px'} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div className='py-4 text-right mt-10'>
                <button className='p-2.5 bg-indigo-100 rounded-[8px] px-10 mr-4'
                    onClick={openSchedulePopup} // This will open the popup
                >
                    Schedule Job
                </button>
                <button className='p-2.5 bg-indigo-700 rounded-[8px] text-white px-10'
                    onClick={updateJobPost} // Your existing job post function
                // onClick={() => {
                //     console.log({
                //         job_title: jobDetails.job_title,
                //         job_type: jobDetails.job_type,
                //         experience: jobDetails.experience,
                //         min_experience: jobDetails.min_experience,
                //         max_experience: jobDetails.max_experience,
                //         skills: "skills,kjhh",
                //         job_shift: jobDetails.job_shift,
                //         genders: jobDetails.genders, // Store selected genders
                //         required_qualification: "jobDetails.required_qualification",
                //         job_desc: jobDetails.job_desc,
                //         job_location: jobDetails.job_location,
                //         number_of_opening: jobDetails.number_of_opening,
                //         interview_timing: jobDetails.interview_timing,
                //         job_timing: jobDetails.job_timing,
                //         min_offered_salary: jobDetails.min_offered_salary,
                //         max_offered_salary: jobDetails.max_offered_salary,
                //         job_shift: jobDetails.job_shift,
                //         created_by: "jobDetails.created_by",
                //         job_status: jobDetails.job_status,
                //         job_exp_date: jobDetails.job_exp_date,
                //         job_scheduled_date: jobDetails.job_scheduled_date
                //     })
                // }}
                >
                    Post Job
                </button>
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
            )}


            <br /><br />
        </div>
    );
}

export default UpdateJobDetails;