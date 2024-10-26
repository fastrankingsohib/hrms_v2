import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useNewCandidate from "../../../helpers/useNewCandidate";
import { FaTimes } from "react-icons/fa";
import { MdAccessTime, MdDone, MdOutlineDone } from "react-icons/md";
import { IoIosArrowDown, IoIosCheckmarkCircleOutline, IoIosRemoveCircle, IoMdClose } from "react-icons/io";
import axios from "axios";
import { FaCircleDot, FaListUl } from "react-icons/fa6";
import { RiListCheck3, RiUserSharedFill } from "react-icons/ri";
import { VscVmRunning } from "react-icons/vsc";

const NewCandidate = () => {
    const { registerCandidate, loading, success, error } = useNewCandidate();
    const [selectedJobs, setSelectedJobs] = useState({
        toggled: false,
        jobs: [],
        ids: [],
    });

    // Candidate Handlings
    const [candidate, setCandidate] = useState({
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pin_code: "",
        country: "",
        contact_number: "",
        alt_contact_number: "",
        email_address: "",
        alt_email_address: "",
        date_of_birth: "",
        job_title: "",
        department: "",
        work_experience: "",
        recruiter_comments: "",
        communication_skills: "Excellent",
        status: "Follow-up",
        current_status: "",
        other1: "Additional info 1",
        other2: "Additional info 2",
        other3: "Additional info 3",
        jobs: selectedJobs.ids, // Updated to use ids directly
        work_tenure: "",
        created_by: "",
    });

    const [feildsRequired, setFieldsRequired] = useState(false)

    useEffect(() => {
        setFieldsRequired(candidate.status == "Follow-up" ? false : true)
    }, [candidate])

    const [allJobs, setAllJobs] = useState([]);
    const dropdownRef = useRef(null); // Ref for the dropdown

    useEffect(() => {
        // Fetching jobs from the server
        axios.get("/display_jobs")
            .then((res) => {
                console.log(res.data);
                setAllJobs(res.data.jobs);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // Handle job selection
    const handleJobsSelection = (job, jobId, value) => {
        setSelectedJobs((prevState) => {
            const updatedJobs = value
                ? [...prevState.jobs, job] // Add job
                : prevState.jobs.filter((j) => j.id !== jobId); // Remove job

            const updatedJobIds = updatedJobs.map(j => j.id);

            // Update the candidate's job field
            setCandidate((prevCandidate) => ({
                ...prevCandidate,
                jobs: updatedJobIds, // Update jobs in candidate state
            }));

            return {
                ...prevState,
                jobs: updatedJobs, // Update the jobs array
                ids: updatedJobIds, // Update the jobIds array
            };
        });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSelectedJobs((prevState) => ({ ...prevState, toggled: false }));
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleToggleDropdown = () => {
        setSelectedJobs((prevState) => ({ ...prevState, toggled: !prevState.toggled }));
    };

    // Initial experience field structure
    const initialExperienceField = {
        organisation_name: "",
        total_tenure_years: "",
        total_tenure_months: "",
        last_designation: "",
        last_drawn_salary: "",
        // total_tenure: "", // This will hold the total tenure in months
    };

    const [experienceFields, setExperienceFields] = useState([initialExperienceField]);
    const [isExperienced, setIsExperienced] = useState(false);

    // Function to handle experience fields input change
    const handleInputChange = (index, event) => {
        const values = [...experienceFields]; // Shallow copy of the experience fields
        values[index] = {
            ...values[index], // Copy the existing experience object
            [event.target.name]: event.target.value, // Update the specific field
        };

        // Calculate total tenure in months
        const years = parseInt(values[index].total_tenure_years) || 0; // Default to 0 if NaN
        const months = parseInt(values[index].total_tenure_months) || 0; // Default to 0 if NaN
        values[index].total_tenure = String((years * 12) + months); // Store total tenure in months
        values[index].total_tenure_years = String(years); // Store total tenure in Years
        values[index].total_tenure_months = String(months); // Store total tenure Months

        setExperienceFields(values); // Update state
    };

    // Function to add more experience fields
    const addExperienceField = () => {
        setExperienceFields([...experienceFields, initialExperienceField]); // Add new field
    };

    // Function to remove an experience field
    const removeExperienceField = (index) => {
        if (experienceFields.length > 1) {
            const values = [...experienceFields];
            values.splice(index, 1); // Remove the field at the given index
            setExperienceFields(values);
        }
    };

    // Function to handle experience level (experienced or fresher)
    const handleExperienceChange = (event) => {
        const selectedValue = event.target.value;
        setIsExperienced(selectedValue === "experienced");

        if (selectedValue === "fresher") {
            setExperienceFields([initialExperienceField]); // Reset to one field for fresher
        } else if (selectedValue === "experienced" && experienceFields.length === 0) {
            setExperienceFields([initialExperienceField]); // Initialize for experienced if no fields
        }
    };

    // Effect to calculate total tenure and update candidate state
    useEffect(() => {
        let totalExperience = 0;
        experienceFields.forEach((value) => {
            totalExperience += parseInt(value.total_tenure) || 0;
        });
        console.log("Total Experience in months:", totalExperience);
        // Update candidate's work tenure if needed
        // setCandidate((values) => ({ ...values, work_tenure: totalExperience }));
    }, [experienceFields]);




    // Qualification/ Education ----------------
    // Qualification/ Education ----------------
    // Qualification/ Education ----------------

    const [qualifications, setQualifications] = useState([
        {
            course: "",
            college_university: "",
            year_of_passing: "",
            percentage_cgpa: ""
        }
    ]);

    // Add new qualification field
    const addQualificationField = () => {
        setQualifications([
            ...qualifications,
            {
                course: "",
                college_university: "",
                year_of_passing: "",
                percentage_cgpa: ""
            }
        ]);
    };

    // Handle input change in the qualification field
    const handleQualificationChange = (index, event) => {
        const { name, value } = event.target;
        const values = [...qualifications];
        values[index][name] = value;
        setQualifications(values);

        // Log the updated qualification fields to the console
        console.log("Updated Qualification Fields: ", values);
    };

    // Remove a qualification field
    const removeQualificationField = (index) => {
        if (qualifications.length > 1) {
            const values = [...qualifications];
            values.splice(index, 1);
            setQualifications(values);

            // Log the updated qualification fields to the console after removal
            console.log("Updated Qualification Fields after removal: ", values);
        }
    };


    // Skills Handling -------------------------
    // Skills Handling -------------------------
    // Skills Handling -------------------------
    // Skills Handling -------------------------

    const [skillFields, setSkillFields] = useState([{ id: Date.now(), skill: "" }]); // Add ID
    const handleSkillsChange = (index, event) => {
        const values = [...skillFields];
        values[index].skill = event.target.value;
        setSkillFields(values);
    };

    const removeSkillField = (index) => {
        const skillToRemove = skillFields[index];
        if (skillToRemove) {
            setSkillFields(skillFields.filter((_, i) => i !== index)); // Update local state
        }
    };

    const handleSkillsKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const skillValue = skillFields[skillFields.length - 1].skill.trim();
            if (skillValue) {
                const newSkill = { id: Date.now(), skill: skillValue }; // Assign a unique ID
                setSkillFields([...skillFields, { id: Date.now(), skill: "" }]); // Add new skill field
            }
        }
    };




    // Hobbies Handlings ------------------------
    // Hobbies Handlings ------------------------
    // Hobbies Handlings ------------------------
    const [hobbyFields, setHobbyFields] = useState([{ hobby: "" }]);

    // Load existing hobbies from Redux store if needed
    const storedHobbies = useSelector((state) => state.hobbies || []);

    useEffect(() => {
        if (storedHobbies.length > 0) {
            setHobbyFields(storedHobbies);  // Initialize with stored hobbies
        }
    }, [storedHobbies]);

    // Log the current hobbies whenever they are updated
    useEffect(() => {
        console.log("Current Hobbies in State: ", hobbyFields);
    }, [hobbyFields]);

    const handleHobbyChange = (index, event) => {
        const values = [...hobbyFields];
        values[index].hobby = event.target.value;
        setHobbyFields(values);
    };

    const removeHobbyField = (index) => {
        if (hobbyFields.length > 1) {
            const values = [...hobbyFields];
            values.splice(index, 1);
            setHobbyFields(values);
            console.log("Hobby removed:", values); // Log after removal
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const hobbyValue = hobbyFields[hobbyFields.length - 1].hobby.trim();
            if (hobbyValue) {
                const newHobby = { hobby: hobbyValue };
                console.log("Hobby added:", newHobby); // Log the added hobby
                setHobbyFields([...hobbyFields, { hobby: "" }]);

                // Clear the last input field after adding the hobby
                setHobbyFields(prev => {
                    const newHobbies = [...prev];
                    newHobbies[newHobbies.length - 1].hobby = "";
                    return newHobbies;
                });
            }
        }
    };





    // Email Validation
    const [errors, setErrors] = useState({
        emailError: '',
        altEmailError: ''
    });

    // Email validation function (disallow special characters outside valid email format)
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Handle changes and validation for primary email
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setCandidate((values) => ({ ...values, email_address: email }));

        if (!validateEmail(email)) {
            setErrors((prevErrors) => ({ ...prevErrors, emailError: 'Invalid email or contains special characters.' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, emailError: '' }));
        }

        if (e.target.value === null || e.target.value === "") {
            setErrors((prevErrors) => ({ ...prevErrors, emailError: '' }))
        }
    };

    // Handle changes and validation for alternate email
    const handleAltEmailChange = (e) => {
        const altEmail = e.target.value;
        setCandidate((values) => ({ ...values, alt_email_address: altEmail }));

        if (!validateEmail(altEmail)) {
            setErrors((prevErrors) => ({ ...prevErrors, altEmailError: 'Invalid alternate email or contains special characters.' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, altEmailError: '' }));
        }


        if (e.target.value === null || e.target.value === "") {
            setErrors((prevErrors) => ({ ...prevErrors, altEmailError: '' }))
        }
    };





    // Phone Number
    const [validationErrors, setValidationErrors] = useState({
        contact_number: '',
        alt_contact_number: '',
    });

    const validatePhoneNumber = (number) => {
        // Regular expression for validating a phone number
        const regex = /^[0-9]{10,10}$/;
        return regex.test(number);
    };

    const handleContactChange = (e) => {
        const value = e.target.value;
        setCandidate((values) => ({ ...values, contact_number: value }));

        // Validate phone number
        if (!validatePhoneNumber(value)) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                contact_number: 'Contact number must be at least 10 digits and contain only numbers.',
            }));
        } else {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                contact_number: '',
            }));
        }

        if (e.target.value === null || e.target.value === "") {
            setValidationErrors((prevErrors) => ({ ...prevErrors, contact_number: '' }))
        }
    };

    const handleAltContactChange = (e) => {
        const value = e.target.value;
        setCandidate((values) => ({ ...values, alt_contact_number: value }));

        // Validate alternate contact number
        if (!validatePhoneNumber(value)) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                alt_contact_number: 'Alternate contact number must be at least 10 digits and contain only numbers.',
            }));
        } else {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                alt_contact_number: '',
            }));
        }

        if (e.target.value === null || e.target.value === "") {
            setValidationErrors((prevErrors) => ({ ...prevErrors, alt_contact_number: '' }))
        }
    };




    // Select Status
    const popupRef = useRef(null);

    // States for selected filter and editing modes
    const [selectedFilter, setSelectedFilter] = useState("Overview");
    const [isEducationEditing, setIsEducationEditing] = useState(false);
    const [isExperienceEditing, setIsExperienceEditing] = useState(false);

    const [nextRoundSelection, setNextRoundSelection] = useState({
        checked: false,
        value: ""
    });

    const [newInterviewDetails, setNewInterviewDetails] = useState({
        date: "",
        time: "",
        jobTitle: "",
        jobId: "",
        interviewer: "",
        round: "",
        loading: false,
        success: false,
        error: false
    });

    useEffect(() => {
        console.log(newInterviewDetails.jobId)
    }, [newInterviewDetails])

    // Function to schedule the interview
    // const scheduleInterview = () => {
    //     setNewInterviewDetails((values) => ({
    //         ...values, loading: true, success: false, error: false
    //     }));
    //     axios.post("/schedule-interview", {
    //         "job_id": 101,
    //         "candidate_id": Number(0),
    //         "interview_date": `${newInterviewDetails.date}`,
    //         "interview_time": `${newInterviewDetails.time}`,
    //         "interviewer": `${newInterviewDetails.interviewer}`,
    //         "interview_round": "1"
    //     })
    //         .then((res) => {
    //             setNewInterviewDetails((values) => ({
    //                 ...values, loading: false, success: true, error: false
    //             }));
    //             setTimeout(() => {
    //                 setNextRoundSelection((values) => ({ ...values, checked: false }));
    //             }, 3000);
    //         })
    //         .catch((err) => {
    //             setNewInterviewDetails((values) => ({
    //                 ...values, loading: false, success: false, error: true
    //             }));
    //             console.log(err);
    //         });
    // };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setNextRoundSelection((values) => ({ ...values, checked: false }));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);





    // Years
    const [years, setYears] = useState([]);
    useEffect(() => {
        const currentYear = new Date().getFullYear(); // Get the current year
        const yearRange = [];

        for (let i = currentYear; i >= currentYear - 100; i--) {
            yearRange.push(i); // Add years from current year back to 100 years ago
        }

        setYears(yearRange);
        console.log(yearRange);
    }, []);
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            registerCandidate(candidate, experienceFields, qualifications, skillFields, hobbyFields, selectedJobs.ids, nextRoundSelection.value, nextRoundSelection.value !== "Rejected" || nextRoundSelection.value !== "Follow-up" ? "Shortlisted" : nextRoundSelection.status, newInterviewDetails)
        }} className="p-8 component-rendering-tranistion h-full overflow-auto bg-gray-100">
            <h1 className="text-2xl font-semibold">Create New Candidate</h1>
            <span className={`inline-flex items-center gap-2 fixed top-28 p-3 min-w-60 bg-green-600 text-white transition-small ${success ? 'right-12' : '-right-[100%]'}`}><IoIosCheckmarkCircleOutline size={'18px'} />User Created Successfully</span>
            <span className={`inline-flex items-center gap-2 fixed top-28 p-3 min-w-60 bg-red-600 text-white transition-small ${error ? 'right-12' : '-right-[100%]'}`}><IoIosCheckmarkCircleOutline size={'18px'} />User Creation Failed</span>

            <div className="w-full mt-2">


                <div className="bg-white shadow-xl p-8 rounded-xl border">
                    <h1 className="flex items-center"><span className="inline-block min-w-fit text-xl mr-5 font-bold">Personal Details</span></h1>

                    <div className="grid grid-cols-4 gap-4 mt-2">
                        <div>
                            <label htmlFor="title" className="font-semibold inline-block p-4 pl-0">
                                Title<span className="text-red-500">*</span>
                            </label>
                            <select
                                id="title"
                                name="title"
                                required
                                defaultValue=""
                                className="primary-input"
                                onChange={(e) => setCandidate((values) => ({ ...values, title: e.target.value }))}
                            >
                                <option value="" disabled={true}>
                                    -- Select Title --
                                </option>
                                <option value="Mr.">Mr.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>


                        <div>
                            <label htmlFor="first-name" className="font-semibold inline-block p-4 pl-0">
                                First Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                className="primary-input"
                                placeholder="First Name"
                                id="first-name"
                                onChange={(e) =>
                                    setCandidate((values) => ({
                                        ...values,
                                        first_name: e.target.value,
                                    }))
                                }
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
                                }}
                            />
                        </div>


                        <div>
                            <label htmlFor="middle-name" className="font-semibold inline-block p-4 pl-0">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                className="primary-input"
                                placeholder="Middle Name"
                                id="middle-name"
                                onChange={(e) =>
                                    setCandidate((values) => ({
                                        ...values,
                                        middle_name: e.target.value,
                                    }))
                                }
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
                                }}
                            />
                        </div>


                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Name<span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                className="primary-input"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only alphabetic characters and spaces
                                    if (/^[A-Za-z\s]*$/.test(value)) {
                                        setCandidate((values) => ({ ...values, last_name: value }));
                                    }
                                }}
                                placeholder="Last Name"
                                name=""
                                id=""
                            />
                        </div>


                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Address Line 1<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                            <input required={feildsRequired} type="text" className="primary-input"
                                onChange={(e) => setCandidate((values) => ({ ...values, address_line1: e.target.value }))}
                                placeholder="Address Line1" name="" id="" />
                        </div>

                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Address Line 2</label>
                            <input type="text" className="primary-input"
                                onChange={(e) => setCandidate((values) => ({ ...values, address_line2: e.target.value }))}
                                placeholder="Address Line 2" name="" id="" />
                        </div>

                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">City<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                            <input required={feildsRequired} type="text" className="primary-input"
                                onChange={(e) => setCandidate((values) => ({ ...values, city: e.target.value }))}
                                placeholder="Address Line 2" name="" id="" />
                        </div>

                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">State<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                            <input required={feildsRequired} type="text" className="primary-input"
                                onChange={(e) => setCandidate((values) => ({ ...values, state: e.target.value }))}
                                placeholder="State" name="" id="" />
                        </div>

                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Pin Code<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                            <input required={feildsRequired} type="number" className="primary-input" placeholder="Pin Code" name="" id="" />
                        </div>

                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Country<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                            <input required={feildsRequired} type="text" className="primary-input"
                                onChange={(e) => setCandidate((values) => ({ ...values, country: e.target.value }))}
                                placeholder="Country" name="" id="" />
                        </div>

                        <div>
                            <label htmlFor="contact_number" className="font-semibold inline-block p-4 pl-0">Contact Number<span className="text-red-500">*</span></label>
                            <input
                                required
                                type="tel"
                                className="primary-input"
                                onChange={handleContactChange}
                                placeholder="Contact Number"
                                name="contact_number"
                                id="contact_number"
                            />
                            {validationErrors.contact_number && <span className="text-red-600">{validationErrors.contact_number}</span>}
                        </div>

                        <div>
                            <label htmlFor="alt_contact_number" className="font-semibold inline-block p-4 pl-0">Alt. Contact Number</label>
                            <input
                                type="tel"
                                className="primary-input"
                                onChange={handleAltContactChange}
                                placeholder="Alt. Contact Number"
                                name="alt_contact_number"
                                id="alt_contact_number"
                            />
                            {validationErrors.alt_contact_number && <span className="text-red-600">{validationErrors.alt_contact_number}</span>}
                        </div>

                        <div>
                            <label htmlFor="email_address" className="font-semibold inline-block p-4 pl-0">Email Address<span className="text-red-500">*</span></label>
                            <input
                                required
                                type="email"
                                className="primary-input lowercase"
                                onChange={handleEmailChange}
                                placeholder="Email Address"
                                name="email_address"
                                id="email_address"
                            />
                            {/* Show validation error for email */}
                            {errors.emailError && <p className="text-red-500">{errors.emailError}</p>}
                        </div>

                        <div>
                            <label htmlFor="alt_email_address" className="font-semibold inline-block p-4 pl-0">Alt. Email Address</label>
                            <input
                                type="email"
                                className="primary-input lowercase"
                                onChange={handleAltEmailChange}
                                placeholder="Alt. Email Address"
                                name="alt_email_address"
                                id="alt_email_address"
                            />
                            {/* Show validation error for alternate email */}
                            {errors.altEmailError && <p className="text-red-500">{errors.altEmailError}</p>}
                        </div>

                        <div>
                            <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of Birth<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                            <input required={feildsRequired} type="date" className="primary-input"
                                onChange={(e) => setCandidate((values) => ({ ...values, date_of_birth: e.target.value }))}
                                placeholder="Date of Birth" name="" id="" />
                        </div>

                        <div>
                            <label className="inline-block mt-4 font-semibold">Select Jobs<span className="text-red-500">*</span></label>
                            <div className="relative" ref={dropdownRef}>
                                <div
                                    className={`select-none cursor-pointer p-[11.5px] border rounded-md mt-4 flex items-center justify-between ${selectedJobs.toggled ? "bg-gray-200" : "bg-white"}`}
                                    onClick={handleToggleDropdown}
                                >
                                    <span>Selected Jobs</span>
                                    <span className={`transition-colors ${selectedJobs.toggled ? "rotate-180" : "rotate-0"}`}>
                                        <IoIosArrowDown />
                                    </span>
                                </div>

                                <div className={`select-none absolute grid gap-1 top-16 right-0 p-1 bg-white shadow-2xl border w-full ${selectedJobs.toggled ? "block" : "hidden"}`}>
                                    {allJobs.length > 0 ? (
                                        allJobs.map((value, key) => {
                                            const isChecked = selectedJobs.jobs.some(job => job.id === value.id); // Check if job is already selected

                                            if (value.job_status === "Active") {
                                                return (
                                                    <label
                                                        key={key}
                                                        htmlFor={`job-id-${key}`}
                                                        className="flex items-center gap-4 p-2.5 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <input
                                                            id={`job-id-${key}`}
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                                handleJobsSelection(value, value.id, e.target.checked);
                                                                console.log(selectedJobs);
                                                            }}
                                                        />
                                                        <span>{value.job_title}</span>
                                                    </label>
                                                );
                                            }
                                            return null; // If not active, return null
                                        })
                                    ) : (
                                        <div className="p-4">No Jobs Found!</div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="select-default-status" className="font-semibold inline-block p-4 pl-0">
                                Set Default Status<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span>
                            </label>
                            <select
                                id="select-default-status"
                                required
                                // required={feildsRequired}
                                defaultValue=""
                                className="primary-input"
                                onChange={(e) =>
                                    setCandidate((values) => ({
                                        ...values,
                                        current_status: e.target.value,
                                        status: e.target.value
                                    }))
                                }
                            >
                                <option value="" disabled={true}>
                                    --- Select Default Status ---
                                </option>
                                <option value="Follow-up">Follow-up</option>
                                <option value="Shortlisted" className={`${selectedJobs.jobs.length > 0 ? "inline-block" : "hidden"}`}>Shortlisted</option>
                            </select>
                        </div>



                    </div>


                    <br />
                    <div className="">
                        <h1 className="font-bold mb-4">Selected Jobs</h1>
                        <div className="flex items-center gap-4">
                            {
                                selectedJobs.jobs.map((value, index) => {
                                    if (selectedJobs.jobs.length > 0) {
                                        return (
                                            <div className="inline-block w-fit border p-2.5 px-5 rounded-full">{value.job_title}</div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>


                {/* Experience Component */}
                <div className="bg-white rounded-xl border p-8 mt-8 shadow-xl">
                    <h1 className="flex items-center"><span className="inline-block min-w-fit text-xl mr-5 font-bold">Experience</span></h1>
                    <div>
                        <div className="mb-5 w-1/4 pr-3">
                            <label htmlFor="experience" className="font-semibold inline-block p-4 pl-0">Experience Level<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                            <select
                                required={feildsRequired}
                                id="experience"
                                className="primary-input"
                                onChange={handleExperienceChange}
                            >
                                <option value="" disabled selected>--- Select Experience Level ---</option>
                                <option value="fresher">Fresher</option>
                                <option value="experienced">Experienced</option>
                            </select>
                        </div>

                        <div>
                            {/* Experience Selection (Experienced/Fresher) */}
                            {/* <div>
                            <label className="font-semibold inline-block mb-2">Experience</label>
                            <select
                                name="experience"
                                className="primary-select"
                                onChange={handleExperienceChange}
                            >
                                <option value="fresher">Fresher</option>
                                <option value="experienced">Experienced</option>
                            </select>
                        </div> */}

                            {isExperienced && (
                                <>
                                    {experienceFields.map((experienceField, index) => (
                                        <div key={index} className="grid grid-cols-5 gap-4 mb-5 pb-10 border-b relative">
                                            <div>
                                                <label
                                                    htmlFor={`organisation_name-${index}`}
                                                    className="font-semibold inline-block p-4 pl-0"
                                                >
                                                    Organisation Name<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="primary-input"
                                                    placeholder="Organisation Name"
                                                    name="organisation_name"
                                                    id={`organisation_name-${index}`}
                                                    value={experienceField.organisation_name}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`total_tenure_years-${index}`}
                                                    className="font-semibold inline-block p-4 pl-0"
                                                >
                                                    Total Tenure - Years<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    className="primary-input"
                                                    placeholder="Total Tenure - Years"
                                                    name="total_tenure_years"
                                                    id={`total_tenure_years-${index}`}
                                                    value={experienceField.total_tenure_years}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`total_tenure_months-${index}`}
                                                    className="font-semibold inline-block p-4 pl-0"
                                                >
                                                    Total Tenure - Months<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    className="primary-input"
                                                    placeholder="Total Tenure - Months"
                                                    name="total_tenure_months"
                                                    id={`total_tenure_months-${index}`}
                                                    value={experienceField.total_tenure_months}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`last_designation-${index}`}
                                                    className="font-semibold inline-block p-4 pl-0"
                                                >
                                                    Last Designation<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="primary-input"
                                                    placeholder="Last Designation"
                                                    name="last_designation"
                                                    id={`last_designation-${index}`}
                                                    value={experienceField.last_designation}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`last_drawn_salary-${index}`}
                                                    className="font-semibold inline-block p-4 pl-0"
                                                >
                                                    Last Drawn Salary<span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="primary-input"
                                                    placeholder="Last Drawn Salary"
                                                    name="last_drawn_salary"
                                                    id={`last_drawn_salary-${index}`}
                                                    value={experienceField.last_drawn_salary}
                                                    onChange={(event) => handleInputChange(index, event)}
                                                    onInput={(e) => {
                                                        // Allow only numbers, alphabets, and spaces
                                                        e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                                                    }}
                                                />
                                            </div>



                                            <button
                                                type="button"
                                                className={`absolute top-0 right-0 mt-4 text-red-600 ${experienceFields.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={() => removeExperienceField(index)}
                                                disabled={experienceFields.length === 1}
                                            >
                                                <IoMdClose size={"20px"} />
                                            </button>
                                        </div>
                                    ))}

                                    <div className="w-1/4 flex justify-start pr-3">
                                        <button
                                            type="button"
                                            className="primary-button justify-center"
                                            onClick={addExperienceField}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>


                {/* Education/ Qualification Handling */}
                {/* Education/ Qualification Handling */}
                {/* Education/ Qualification Handling */}
                <div className="bg-white p-8 mt-8 border rounded-xl shadow-xl">
                    <h1 className="flex items-center"><span className="inline-block min-w-fit text-xl mr-5 font-bold">Qualifications</span></h1>
                    <div>
                        {qualifications.map((qualificationField, index) => {
                            const required = index > 0 ? true : false
                            return (
                                <div key={index} className="grid grid-cols-4 gap-4 mb-5 pb-10 border-b relative">
                                    <div>
                                        <label htmlFor={`course-${index}`} className="font-semibold inline-block p-4 pl-0">Course<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                                        <input
                                            required={feildsRequired || required}
                                            type="text"
                                            className="primary-input"
                                            placeholder="Course"
                                            name="course"
                                            id={`course-${index}`}
                                            value={qualificationField.course}
                                            onChange={event => handleQualificationChange(index, event)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`college_university-${index}`} className="font-semibold inline-block p-4 pl-0">College/University Name<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                                        <input
                                            required={feildsRequired || required}
                                            type="text"
                                            className="primary-input"
                                            placeholder="College/University Name"
                                            name="college_university"
                                            id={`college_university-${index}`}
                                            value={qualificationField.college_university}
                                            onChange={event => handleQualificationChange(index, event)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`year_of_passing-${index}`} className="font-semibold inline-block p-4 pl-0">Year of Passing<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                                        <select
                                            required={feildsRequired || required}
                                            className="primary-input"
                                            name="year_of_passing"
                                            id={`year_of_passing-${index}`}
                                            value={qualificationField.year_of_passing}
                                            onChange={event => handleQualificationChange(index, event)}
                                        >
                                            <option value="" disabled={true}>--- Select Passing Year ---</option>
                                            {
                                                years.map((year, yearIndex) => {
                                                    return (
                                                        <option value={year}>{year}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor={`percentage_cgpa-${index}`} className="font-semibold inline-block p-4 pl-0">Percentage/CGPA<span className={`text-red-500 ${feildsRequired ? "inline-block" : "hidden"}`}>*</span></label>
                                        <input
                                            required={feildsRequired || required}
                                            type="number"
                                            className="primary-input"
                                            placeholder="Percentage/CGPA"
                                            name="percentage_cgpa"
                                            id={`percentage_cgpa-${index}`}
                                            value={qualificationField.percentage_cgpa}
                                            onChange={event => handleQualificationChange(index, event)}
                                            onInput={(e) => {
                                                const value = parseInt(e.target.value, 10);
                                                if (value < 0) e.target.value = 0;
                                                if (value > 100) e.target.value = 100;
                                            }}
                                        />

                                    </div>

                                    <button
                                        type="button"
                                        className={`absolute top-0 right-0 mt-4 text-red-600 ${qualifications.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => removeQualificationField(index)}
                                        disabled={qualifications.length === 1}
                                    >
                                        <IoMdClose size={"20px"} />
                                    </button>
                                </div>
                            )
                        })}

                        <div className="w-1/4 flex justify-start pr-3">
                            <button
                                type="button"
                                className="primary-button justify-center"
                                onClick={addQualificationField}
                            >
                                Add More
                            </button>
                        </div>
                    </div>
                </div>








                <div className="p-8 mt-8 bg-white shadow-xl rounded-xl">
                    {/* Skills Hanlding */}
                    {/* Skills Hanlding */}
                    {/* Skills Hanlding */}
                    <h1 className="flex items-center mb-2"><span className="inline-block min-w-fit text-xl mr-5 font-bold">Skills</span></h1>
                    {/* <Skills /> */}
                    <div className='flex flex-wrap items-center'>
                        <input
                            type="text"
                            className="mr-2 w-60 p-3 px-6 my-2 border rounded-full"
                            placeholder="Add a skill"
                            value={skillFields[skillFields.length - 1].skill}
                            onChange={event => handleSkillsChange(skillFields.length - 1, event)}
                            onKeyDown={handleSkillsKeyDown}
                        />
                        <div className="flex flex-wrap">
                            {skillFields.slice(0, -1).map((skillField, index) => ( // Don't show the last empty field as a tag
                                <div key={skillField.id} className="flex items-center justify-between bg-gray-100 w-60 border rounded-full p-3 px-6 my-2 mr-2">
                                    <span className="mr-2">{skillField.skill}</span>
                                    <FaTimes
                                        className="cursor-pointer text-red-600 ml-4"
                                        onClick={() => removeSkillField(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>








                <div className="p-8 mt-8 bg-white rounded-xl shadow-xl">
                    {/* Hobbies Handling */}
                    {/* Hobbies Handling */}
                    {/* Hobbies Handling */}
                    <h1 className="flex items-center mb-2"><span className="inline-block min-w-fit text-xl mr-5 font-bold">Hobbies</span></h1>
                    <div className='flex flex-wrap items-center'>
                        <input
                            type="text"
                            className="mr-2 p-3 px-6 my-2 border rounded-full w-60"
                            placeholder="Add a hobby"
                            value={hobbyFields[hobbyFields.length - 1].hobby}
                            onChange={event => handleHobbyChange(hobbyFields.length - 1, event)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="flex flex-wrap">
                            {hobbyFields.slice(0, -1).map((hobbyField, index) => ( // Don't show the last empty field as a tag
                                <div key={index} className="flex items-center justify-between bg-gray-100 w-60 border rounded-full p-3 px-6 my-2 mr-2">
                                    <span className="mr-2">{hobbyField.hobby}</span>
                                    <FaTimes
                                        className="cursor-pointer text-red-600 ml-4"
                                        onClick={() => removeHobbyField(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>




                <div className="my-2">
                    <div className='flex gap-4 items-center pr-8' ref={popupRef}>
                        {/* Filter Buttons */}
                        {/* <button className={`p-2.5 rounded-lg w-40 ${selectedFilter === "Overview" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Overview")}>Overview</button>
                        <button className={`p-2.5 rounded-lg w-40 ${selectedFilter === "Applied Jobs" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Applied Jobs")}>Applied Jobs</button>
                        <button className={`p-2.5 rounded-lg w-40 ${selectedFilter === "Interviews" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Interviews")}>Interviews</button> */}

                        {/* <div className={`p-2.5 relative`}>
                            <button className={`text-center block rounded-lg w-80 p-2.5 h-full border text-white ${nextRoundSelection.checked ? "bg-indigo-700" : "bg-black"}`}
                                onClick={() => {
                                    setNextRoundSelection((values) => ({ ...values, checked: !nextRoundSelection.checked }));
                                }}>
                                Select Status
                            </button>

                            <div className={`absolute z-10 -top-[600%] -right-[70%] bg-white text-black border shadow-2xl w-60 grid gap-4 p-4 ${nextRoundSelection.checked ? "block" : "hidden"}`}>
                                <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "FollowUp" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                    onClick={() => setNextRoundSelection((values) => ({ ...values, value: "FollowUp" }))}>
                                    <FaListUl size={"12px"} /> Follow Up
                                </button>

                                <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Shortlist" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                    onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Shortlist" }))}>
                                    <RiListCheck3 size={"16px"} /> Shortlist
                                </button>

                                <button className='relative'>
                                    <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Schedule" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                        onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Schedule" }))}>
                                        <MdAccessTime size={"16px"} /> Schedule Interview
                                    </button>

                                    <div className={`text-left absolute -top-[125px] -right-[170%] p-4 bg-white border shadow-2xl w-80 cursor-default ${nextRoundSelection.value === "Schedule" ? "block" : "hidden"}`}>
                                        <h1 className='text-xl font-semibold mb-4 text-center'>Schedule Interview</h1>
                                        <div className='grid'>
                                            <label className='text-left block w-full mb-2' htmlFor="">Select Interview Date</label>
                                            <input className='text-left block bg-gray-100 border p-2 mb-2 w-full'
                                                onChange={(e) => setNewInterviewDetails((values) => ({ ...values, date: e.target.value }))}
                                                type="date"
                                            />

                                            <label className='text-left block mb-2 w-full' htmlFor="">Select Interview Time</label>
                                            <input className='text-left block border bg-gray-100 p-2 mb-2 w-full'
                                                onChange={(e) => setNewInterviewDetails((values) => ({ ...values, time: e.target.value }))}
                                                type="time"
                                            />

                                            <label className='text-left block mb-2 w-full' htmlFor="">Interviewer Name</label>
                                            <input className='text-left block border bg-gray-100 p-2 w-full'
                                                onChange={(e) => setNewInterviewDetails((values) => ({ ...values, interviewer: e.target.value }))}
                                                type="text"
                                                placeholder='Eg. Mr. Akram'
                                            />

                                            <label className='text-left block mb-2 mt-2 w-full' htmlFor="">Job For Interview</label>
                                            <select defaultValue={"---"} className='text-left block border bg-gray-100 p-2 w-full'
                                                onChange={(e) => 
                                                    setNewInterviewDetails((values) => ({ ...values, jobId: e.target.value}))
                                                }
                                            >
                                                <option disabled={true} value={"---"}>--- Select Job For Interview ---</option>
                                                {
                                                    selectedJobs.jobs.length > 0 ?
                                                        selectedJobs.jobs.map((value, index) => {
                                                            return (
                                                                <option key={index} value={value.id}>{value.job_title}</option>
                                                            )
                                                        })
                                                        : <option value={"Un-Assigned"}>Un-Assigned!</option>
                                                }
                                            </select>


                                            <button className={`p-2.5 border rounded-lg bg-indigo-700 text-white mt-8 ${newInterviewDetails.loading ? "bg-opacity-60 cursor-not-allowed" : ""}`}
                                                onClick={() => setNextRoundSelection((values) => ({ ...values, checked: false }))}
                                                disabled={newInterviewDetails.loading}>
                                                Save Interview Details
                                            </button>
                                        </div>
                                    </div>
                                </button>

                                <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Offered" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                    onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Offered" }))}>
                                    <MdOutlineDone size={"16px"} />Offered
                                </button>

                                <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "OnBoard" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                    onClick={() => setNextRoundSelection((values) => ({ ...values, value: "OnBoard" }))}>
                                    <RiUserSharedFill size={"14px"} />On Board
                                </button>

                                <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Training" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                    onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Training" }))}>
                                    <VscVmRunning size={"16px"} />Training
                                </button>

                                <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Live" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                    onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Live" }))}>
                                    <FaCircleDot size={"16px"} /> Live
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>





                <div className="flex items-center justify-end mt-8">
                    <div className="w-1/4 pl-4">
                        <button type="submit" className={`rounded-full bg-indigo-700 w-full h-12 text-white ${loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                            disabled={loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError}
                        >Create Candidate</button>
                    </div>
                </div>
                <br /><br />
            </div>
        </form>
    )
}
export default NewCandidate;