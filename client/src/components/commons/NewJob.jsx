import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';

function NewJob() {
    const [jobDetails, setJobDetails] = useState({
        jobType: 'Full Time',
        experienceType: 'Any',
        minExperience: 1,
        maxExperience: 5,
        callDaysType: 'Monday to Friday',
        customCallDays: [],
        skills: [],
        jobShift: 'Morning',
        selectedGenders: [], // Store selected genders
        selectedQualifications: []
    });

    const [isMinDropdownOpen, setIsMinDropdownOpen] = useState(false);
    const [isMaxDropdownOpen, setIsMaxDropdownOpen] = useState(false);

    const minDropdownRef = useRef(null);
    const maxDropdownRef = useRef(null);

    const experienceOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // For years of experience
    const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Days for call availability


    // Gender Selection
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false); // State to manage dropdown visibility
    const genderDropdownRef = useRef(null); // Ref for dropdown

    const genderOptions = ['Male', 'Female', 'Non-Binary', 'Prefer Not to Say']; // Gender options

    // Function to handle toggling gender selection
    const handleGenderToggle = (gender) => {
        setJobDetails((prevDetails) => {
            const isGenderSelected = prevDetails.selectedGenders.includes(gender);
            const updatedSelectedGenders = isGenderSelected
                ? prevDetails.selectedGenders.filter((g) => g !== gender) // Remove if already selected
                : [...prevDetails.selectedGenders, gender]; // Add if not selected

            return { ...prevDetails, selectedGenders: updatedSelectedGenders };
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
            const isQualificationSelected = prevDetails.selectedQualifications.includes(qualification);
            const updatedSelectedQualifications = isQualificationSelected
                ? prevDetails.selectedQualifications.filter((q) => q !== qualification)
                : [...prevDetails.selectedQualifications, qualification];

            return { ...prevDetails, selectedQualifications: updatedSelectedQualifications };
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


    return (
        <div className='p-4 bg-gray-100 h-full max-h-full overflow-auto'>
            <h1 className='text-xl font-bold'>Job Details</h1>
            <div className='bg-white p-4 pt-8 mt-4 shadow-xl rounded-[8px]'>
                <div className='flex items-center gap-4'>
                    <label className='font-semibold inline-block mb-2'>Job Type *</label>
                    <div className='flex gap-4'>
                        <button
                            className={`h-10 rounded-[8px] w-32 ${jobDetails.jobType === 'Full Time' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                            onClick={() => setJobDetails((values) => ({ ...values, jobType: 'Full Time' }))}>
                            Full Time
                        </button>
                        <button
                            className={`h-10 rounded-[8px] w-32 ${jobDetails.jobType === 'Part Time' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                            onClick={() => setJobDetails((values) => ({ ...values, jobType: 'Part Time' }))}>
                            Part Time
                        </button>
                        <button
                            className={`h-10 rounded-[8px] w-32 ${jobDetails.jobType === 'Internship' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                            onClick={() => setJobDetails((values) => ({ ...values, jobType: 'Internship' }))}>
                            Internship
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-6 mt-6'>
                    <div>
                        <label className='font-semibold block mb-2'>Job Title</label>
                        <input type='text' className='p-2 border rounded-[8px] w-full' />
                    </div>

                    <div className='bg-white select-none'>
                        <label className='font-semibold block mb-2'>Job Location</label>
                        <div className='relative w-full' ref={qualificationDropdownRef}>
                            <div
                                className='p-2 border rounded-[8px] cursor-pointer'
                                onClick={() => setIsQualificationDropdownOpen(!isQualificationDropdownOpen)}
                            >
                                {jobDetails.selectedQualifications.length > 0
                                    ? jobDetails.selectedQualifications.join(', ') // Show selected qualifications
                                    : 'Select Qualification(s)'}
                            </div>
                            {isQualificationDropdownOpen && (
                                <div className='absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto w-full'>
                                    {qualificationOptions.map((qualification) => (
                                        <div
                                            key={qualification}
                                            className={`flex items-center p-2 mb-2 cursor-pointer ${jobDetails.selectedQualifications.includes(qualification)
                                                ? 'bg-indigo-900 text-white'
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

                    <div>
                        <label className='font-semibold block mb-2'>No. of Openings</label>
                        <input type='number' className='p-2 border rounded-[8px] w-full' />
                    </div>

                    <div>
                        <label className='font-semibold block mb-2'>Interview Timings</label>
                        <input type='text' className='p-2 border rounded-[8px] w-full' />
                    </div>


                    <div>
                        <label className='font-semibold block mb-2'>Job Timings</label>
                        <input type='text' className='p-2 border rounded-[8px] w-full' />
                    </div>

                    {/* Qualification Selection */}
                    <div className='bg-white select-none'>
                        <label className='font-semibold block mb-2'>Select Qualification(s)</label>
                        <div className='relative w-full' ref={qualificationDropdownRef}>
                            <div
                                className='p-2 border rounded-[8px] cursor-pointer'
                                onClick={() => setIsQualificationDropdownOpen(!isQualificationDropdownOpen)}
                            >
                                {jobDetails.selectedQualifications.length > 0
                                    ? jobDetails.selectedQualifications.join(', ') // Show selected qualifications
                                    : 'Select Qualification(s)'}
                            </div>
                            {isQualificationDropdownOpen && (
                                <div className='absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto w-full'>
                                    {qualificationOptions.map((qualification) => (
                                        <div
                                            key={qualification}
                                            className={`flex items-center p-2 mb-2 cursor-pointer ${jobDetails.selectedQualifications.includes(qualification)
                                                ? 'bg-indigo-900 text-white'
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
                    <input type='text' className='p-2 border rounded-[8px] w-full' placeholder='eg. 30,000/-' />
                    <div className='bg-gray-200 flex items-center justify-center w-60 mx-4 rounded-[8px]'>
                        To
                    </div>
                    <input type='text' className='p-2 border rounded-[8px] w-full' placeholder='eg. 30,000/-' />
                </div>


                {/* Job Shift Section */}
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='font-semibold inline-block mb-2 mt-4'>Job Shift *</label>
                        <div className='flex gap-4'>
                            <button
                                className={`h-10 w-32 rounded-[8px] ${jobDetails.jobShift === 'Morning' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                                onClick={() => setJobDetails((values) => ({ ...values, jobShift: 'Morning' }))}>
                                Morning
                            </button>
                            <button
                                className={`h-10 w-32 rounded-[8px] ${jobDetails.jobShift === 'Afternoon' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                                onClick={() => setJobDetails((values) => ({ ...values, jobShift: 'Afternoon' }))}>
                                Afternoon
                            </button>
                            <button
                                className={`h-10 w-32 rounded-[8px] ${jobDetails.jobShift === 'Night' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                                onClick={() => setJobDetails((values) => ({ ...values, jobShift: 'Night' }))}>
                                Night
                            </button>
                        </div>
                    </div>


                    <div className='bg-white p-4 mt-4 select-none'>
                        <label className='font-semibold block mb-2'>Select Gender(s)</label>
                        <div className='relative w-full' ref={genderDropdownRef}>
                            <div
                                className='p-2 border rounded-[8px] cursor-pointer'
                                onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
                            >
                                {jobDetails.selectedGenders.length > 0
                                    ? jobDetails.selectedGenders.join(', ') // Show selected genders
                                    : 'Select Gender(s)'}
                            </div>
                            {isGenderDropdownOpen && (
                                <div className='absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto w-full'>
                                    {genderOptions.map((gender) => (
                                        <div
                                            key={gender}
                                            className={`flex items-center p-2 mb-2 cursor-pointer ${jobDetails.selectedGenders.includes(gender)
                                                ? 'bg-indigo-900 text-white' // Selected state styles
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
                <textarea className='w-full min-h-60 h-60 border rounded-[8px] p-4'></textarea>
            </div>




            <div className='bg-white p-4 mt-4 select-none shadow-xl rounded-[8px]'>
                <h1 className='text-xl font-semibold mb-4'>Expreinece Details</h1>
                <label className='font-semibold inline-block mb-2'>Total Experience Required *</label>
                <div className='flex gap-4'>
                    <button
                        className={`h-10 rounded-[8px] px-4 min-w-32 ${jobDetails.experienceType === 'Any' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                        onClick={() => setJobDetails((values) => ({ ...values, experienceType: 'Any' }))}>
                        Any
                    </button>
                    <button
                        className={`h-10 rounded-[8px] px-4 min-w-32 ${jobDetails.experienceType === 'Freshers Only' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                        onClick={() => setJobDetails((values) => ({ ...values, experienceType: 'Freshers Only' }))}>
                        Freshers Only
                    </button>
                    <button
                        className={`h-10 rounded-[8px] px-4 min-w-32 ${jobDetails.experienceType === 'Experienced Only' ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
                        onClick={() => setJobDetails((values) => ({ ...values, experienceType: 'Experienced Only' }))}>
                        Experienced Only
                    </button>
                </div>

                {jobDetails.experienceType === 'Experienced Only' && (
                    <div className='mt-4 grid grid-cols-2 gap-4 cursor-default'>
                        <div className='w-full'>
                            <label className='font-semibold block mb-2'>Minimum Experience</label>
                            <div className='relative w-full' ref={minDropdownRef}>
                                <div
                                    className='p-2 border rounded-[8px]'
                                    onClick={() => setIsMinDropdownOpen(!isMinDropdownOpen)}>
                                    {jobDetails.minExperience === 11 ? '10+ years' : `${jobDetails.minExperience} year(s)`}
                                </div>
                                {isMinDropdownOpen && (
                                    <div className='w-full absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto'>
                                        {experienceOptions.map((value) => (
                                            <div
                                                key={value}
                                                className='p-2 hover:bg-indigo-50 rounded-[8px] w-full'
                                                onClick={() => {
                                                    handleExperienceSelect('minExperience', value);
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
                                    className='p-2 border rounded-[8px]'
                                    onClick={() => setIsMaxDropdownOpen(!isMaxDropdownOpen)}>
                                    {jobDetails.maxExperience === 11 ? '10+ years' : `${jobDetails.maxExperience} year(s)`}
                                </div>
                                {isMaxDropdownOpen && (
                                    <div className='w-full absolute z-10 bg-white border rounded-[8px] mt-1 max-h-40 overflow-auto'>
                                        {experienceOptions.map((value) => (
                                            <div
                                                key={value}
                                                className='p-2 hover:bg-indigo-50 rounded-[8px] w-full'
                                                onClick={() => {
                                                    handleExperienceSelect('maxExperience', value);
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

                {jobDetails.experienceType === 'Freshers Only' && (
                    <div className='mt-4 p-2 bg-yellow-100 text-yellow-700 border rounded-[8px] px-4 border-yellow-200'>
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
                        className='border rounded-[8px] border-gray-300 p-2'
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
                <button className='p-2 bg-indigo-100 rounded-[8px] px-10 mr-4'>Schedule Job</button>
                <button className='p-2 bg-indigo-900 rounded-[8px] text-white px-10'>Post Job</button>
            </div>

            <br /><br />
        </div>
    );
}

export default NewJob;
