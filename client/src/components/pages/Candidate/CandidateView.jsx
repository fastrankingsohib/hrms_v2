import axios from 'axios';
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { AiFillCodepenCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaList, FaListUl, FaUser } from 'react-icons/fa';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { FaCartFlatbed, FaCircleCheck, FaCircleDot, FaK, FaRegCircleCheck } from "react-icons/fa6";
import { MdAccessTime, MdAdd, MdDelete, MdDone, MdEdit, MdOutlineCancel, MdOutlineDone, MdOutlinePendingActions } from 'react-icons/md';
import { RiListCheck3, RiUserSharedFill } from "react-icons/ri";
import { VscVmRunning } from "react-icons/vsc";
import useCandidateUpdate from '../../../helpers/useCanidateUpdate';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import CandidateInterviews from './CandidateInterviews';
import CandidateComments from './CandidateComments';
import NewInterview from './NewInterview';
import AppliedJobs from './AppliedJobs';
import { MdWork } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { VscDebugStepOut } from "react-icons/vsc";
import { TbAlertOctagonFilled } from "react-icons/tb";




function CandidateView() {
    const navigate = useNavigate()
    const [allUsers, setAllUsers] = useState([])
    const { candidate_id } = useParams();
    const [candidate, setCandidate] = useState();
    const [candidateLoading, setCandidateLoading] = useState(false);
    const [candidateSuccess, setCandidateSuccess] = useState(false);
    const [candidateError, setCandidateError] = useState(false);
    const [isPersonalDetailsEditing, setIsPersonalDetailsEditing] = useState(false);
    const [experienceInYears, setExpeirenceInYears] = useState()
    const [experienceInMonths, setExpeirenceInMonths] = useState()
    const [allJobs, setAllJobs] = useState([]);
    let loggedInUser = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null
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
    const [skills, setSkills] = useState([]); // Add state to manage skills
    const [hobbies, setHobbies] = useState([]);


    const [candidateEmpty, setCandidateEmpty] = useState({
        toggled: false,
        value: true
    });
    const [selectedJobs, setSelectedJobs] = useState({
        toggled: false,
        jobs: [],
        ids: [],
    });

    // Debugging Purpose
    useEffect(() => {
        console.log(selectedJobs.ids);
    }, [selectedJobs])


    useEffect(() => {
        if (candidate) {
            console.log(candidate)
            if (
                candidate.title === "" ||
                candidate.first_name === "" ||
                candidate.last_name === "" ||
                candidate.address_line1 === "" ||
                candidate.city === "" ||
                candidate.state === "" ||
                candidate.pin_code === "" ||
                candidate.country === "" ||
                candidate.contact_number === "" ||
                candidate.email_address === "" ||
                candidate.candidate_applied_jobs.length < 1
                // candidate.date_of_birth === "" ||
                // candidate.department === "" ||
                // candidate.current_status === ""
            ) {
                setCandidateEmpty({ toggled: false, value: true })
            }
            else {
                setCandidateEmpty({ toggled: false, value: false })
            }
        }
    }, [candidate]);

    const [emptyRequiredValue, setEmptyRequiredValue] = useState({
        "title": true,
        "first_name": true,
        "last_name": true,
        "address_line1": true,
        "city": true,
        "pin_code": true,
        "country": true,
        "contact_number": true,
        "email_address": true,
        "selectedJobs": true
    })
    useEffect(() => {
        if (isPersonalDetailsEditing) {
            if (candidate) {
                if (candidateEmpty.value) {
                    candidate.title === "" ? setEmptyRequiredValue((values) => ({ ...values, title: true })) : setEmptyRequiredValue((values) => ({ ...values, title: false }));
                    candidate.first_name === "" ? setEmptyRequiredValue((values) => ({ ...values, first_name: true })) : setEmptyRequiredValue((values) => ({ ...values, first_name: false }));
                    candidate.last_name === "" ? setEmptyRequiredValue((values) => ({ ...values, last_name: true })) : setEmptyRequiredValue((values) => ({ ...values, last_name: false }));
                    candidate.address_line1 === "" ? setEmptyRequiredValue((values) => ({ ...values, address_line1: true })) : setEmptyRequiredValue((values) => ({ ...values, address_line1: false }));
                    candidate.city === "" ? setEmptyRequiredValue((values) => ({ ...values, city: true })) : setEmptyRequiredValue((values) => ({ ...values, city: false }));
                    candidate.pin_code === "" ? setEmptyRequiredValue((values) => ({ ...values, pin_code: true })) : setEmptyRequiredValue((values) => ({ ...values, pin_code: false }));
                    candidate.country === "" ? setEmptyRequiredValue((values) => ({ ...values, country: true })) : setEmptyRequiredValue((values) => ({ ...values, country: false }));
                    candidate.contact_number === "" ? setEmptyRequiredValue((values) => ({ ...values, contact_number: true })) : setEmptyRequiredValue((values) => ({ ...values, contact_number: false }));
                    candidate.email_address === "" ? setEmptyRequiredValue((values) => ({ ...values, email_address: true })) : setEmptyRequiredValue((values) => ({ ...values, email_address: false }));
                    candidate.candidate_applied_jobs.length < 1 ? setEmptyRequiredValue((values) => ({ ...values, selectedJobs: true })) : setEmptyRequiredValue((values) => ({ ...values, selectedJobs: false }));
                }
            }
        }
        else {
            setEmptyRequiredValue(
                {
                    "title": false,
                    "first_name": false,
                    "last_name": false,
                    "address_line1": false,
                    "city": false,
                    "pin_code": false,
                    "country": false,
                    "contact_number": false,
                    "email_address": false,
                    "selectedJobs": false
                }
            )
        }
    }, [isPersonalDetailsEditing, candidate, selectedJobs]);
    const dropdownRef = useRef(null); // Ref for the dropdown

    // When Candidate is a Follow-up
    const [candidateInFollowup, setCandidateInFollowup] = useState(false);
    useEffect(() => {
        if (candidate) {
            if (candidate.status === "Follow-up") {
                setCandidateInFollowup(true);
            }
            else {
                setCandidateInFollowup(false)
            }
        }
        setCandidateInFollowup(false)
    }, candidate)


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


    const handleJobsSelection = (job, jobId, value) => {
        setSelectedJobs((prevState) => {
            const jobKey = job.hasOwnProperty('job_id') ? 'job_id' : 'id';
            const jobIdentifier = job[jobKey];

            const updatedJobs = value
                ? [...prevState.jobs, job] // Add job
                : prevState.jobs.filter((j) => j[jobKey] !== jobIdentifier); // Remove job

            const updatedJobIds = updatedJobs.map(j => j[jobKey]);

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


    const handleToggleDropdown = () => {
        setSelectedJobs((prevState) => ({ ...prevState, toggled: !prevState.toggled }));
    };





    // Fecth User Data
    useEffect(() => {
        axios.get("/user/all-users")
            .then((res) => {
                setAllUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [candidate_id]);

    // Fetch candidate data
    // Fetch candidate data
    // const fetchCandidate = () => {
    //     setCandidateLoading(true);
    //     axios.get(`/candidate-info/${candidate_id}`)
    //         .then((res) => {
    //             console.log(res.data)
    //             if (res.data.success) {
    //                 const candidateData = res.data.candidate;
    //                 setCandidateSuccess(true);
    //                 setCandidateLoading(false);
    //                 setCandidateError(false);
    //                 setCandidate(candidateData);

    //                 // Populate education and experience lists after data is fetched
    //                 setEducationList(candidateData.qualifications || []);
    //                 setExperienceList(candidateData.workExperiences.map((exp, index) => ({
    //                     id_updated: index + 1,
    //                     organisation_name: exp.organisation_name || '',
    //                     last_designation: exp.last_designation || '',
    //                     total_tenure_years: exp.total_tenure_years || '',
    //                     total_tenure_months: exp.total_tenure_months || '',
    //                     last_drawn_salary: exp.last_drawn_salary || '',
    //                 })) || []);

    //                 // Convert skills string into an array
    //                 const skillsArray = candidateData.skills
    //                     ? candidateData.skills.split(',').map(skill => skill.trim())
    //                     : []; // If there are no skills, use an empty array
    //                 setSkills(skillsArray); // Update skills state

    //                 // Convert hobbies string into an array
    //                 const hobbiesArray = candidateData.hobbies
    //                     ? candidateData.hobbies.split(',').map(hobby => hobby.trim())
    //                     : []; // If there are no hobbies, use an empty array
    //                 setHobbies(hobbiesArray); // Update hobbies state

    //             }
    //         })
    //         .catch((err) => {
    //             setCandidateError(true);
    //             setCandidateSuccess(false);
    //             setCandidateLoading(false);
    //         });
    // }
    useEffect(() => {
        setCandidateLoading(true);
        axios.get(`/candidate-info/${candidate_id}`)
            .then((res) => {
                if (res.data.success) {
                    const candidateData = res.data.candidate;
                    // console.log(res.data.candidate)
                    setCandidateSuccess(true);
                    setCandidateLoading(false);
                    setCandidateError(false);
                    setCandidate(candidateData);
                    setExpeirenceInYears(res.data.experience_years)
                    setExpeirenceInMonths(res.data.experience_months)

                    // Setting Selected Jobs by Default
                    let lastJobsIds = [];
                    let lastJobs = []
                    res.data.candidate.candidate_applied_jobs.map((value) => {
                        lastJobsIds.push(value.job_id)
                        lastJobs.push(value)
                    })
                    setSelectedJobs((values) => ({ ...values, ids: lastJobsIds, jobs: lastJobs }))

                    // Populate education and experience lists after data is fetched
                    setEducationList(candidateData.qualifications || []);
                    setExperienceList(candidateData.workExperiences.map((exp, index) => ({
                        id_updated: index + 1,
                        organisation_name: exp.organisation_name || '',
                        last_designation: exp.last_designation || '',
                        total_tenure: exp.total_tenure || '',
                        total_tenure_months: exp.total_tenure_months || '',
                        total_tenure_years: exp.total_tenure_years || '',
                        last_drawn_salary: exp.last_drawn_salary || '',
                    })) || []);

                    // Convert skills string into an array
                    const skillsArray = candidateData.skills
                        ? candidateData.skills.split(',').map(skill => skill.trim())
                        : []; // If there are no skills, use an empty array
                    setSkills(skillsArray); // Update skills state

                    // Convert hobbies string into an array
                    const hobbiesArray = candidateData.hobbies
                        ? candidateData.hobbies.split(',').map(hobby => hobby.trim())
                        : []; // If there are no hobbies, use an empty array
                    setHobbies(hobbiesArray); // Update hobbies state

                }
            })
            .catch((err) => {
                setCandidateError(true);
                setCandidateSuccess(false);
                setCandidateLoading(false);
            });
        // fetchCandidate()
    }, [candidate_id]);




    // Hanlde Skills
    // Initial skills list
    const [skillInput, setSkillInput] = useState("");

    const handleSkillsKeyDown = (e) => {
        if (e.key === "Enter" && skillInput.trim()) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput(""); // Clear the input after adding skill
            e.preventDefault(); // Prevent form submission or default behavior
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };


    // Hanlde Hobbies
    const [hobbyInput, setHobbyInput] = useState("");
    const handleHobbiesKeyDown = (e) => {
        if (e.key === "Enter" && hobbyInput.trim()) {
            setHobbies([...hobbies, hobbyInput.trim()]);
            setHobbyInput(""); // Clear the input after adding hobby
            e.preventDefault(); // Prevent form submission or default behavior
        }
    };

    const handleRemoveHobby = (index) => {
        const updatedHobbies = hobbies.filter((_, i) => i !== index);
        setHobbies(updatedHobbies);
    };

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
                total_tenure_months: '',
                total_tenure_years: '',
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
        updateCandidate(candidate_id, educationList, experienceList, candidate, skills, hobbies, selectedJobs);
    };

    // Setting Editing Mode if user updated successully
    useEffect(() => {
        if (updateEvents.success) {
            setIsPersonalDetailsEditing(false);
            setSelectedJobs((values) => ({ ...values, ids: [], jobs: [], toggled: false }))
        }
    }, [updateEvents])

    const [deleteEvents, setDeleteEvents] = useState({
        loading: false,
        error: false,
        success: false
    })

    useEffect(() => {
        if (updateEvents.success) {
            setCandidateLoading(true);
            axios.get(`/candidate-info/${candidate_id}`)
                .then((res) => {
                    if (res.data.success) {
                        const candidateData = res.data.candidate;
                        // console.log(res.data.candidate)
                        setCandidateSuccess(true);
                        setCandidateLoading(false);
                        setCandidateError(false);
                        setCandidate(candidateData);
                        setExpeirenceInYears(res.data.experience_years)
                        setExpeirenceInMonths(res.data.experience_months)
                        let lastJobs = [];
                        res.data.candidate.candidate_applied_jobs.map((value) => {
                            lastJobs.push(value.job_id)
                        })
                        console.log("jobs")
                        setSelectedJobs((values) => ({ ...values, ids: lastJobs }))

                        // Populate education and experience lists after data is fetched
                        setEducationList(candidateData.qualifications || []);
                        console.log(res.data)
                        setExperienceList(candidateData.workExperiences.map((exp, index) => ({
                            id_updated: index + 1,
                            organisation_name: exp.organisation_name || '',
                            last_designation: exp.last_designation || '',
                            total_tenure: exp.total_tenure || '',
                            total_tenure_months: exp.total_tenure_months || '',
                            total_tenure_years: exp.total_tenure_years || '',
                            last_drawn_salary: exp.last_drawn_salary || '',
                        })) || []);

                        // Convert skills string into an array
                        const skillsArray = candidateData.skills
                            ? candidateData.skills.split(',').map(skill => skill.trim())
                            : []; // If there are no skills, use an empty array
                        setSkills(skillsArray); // Update skills state

                        // Convert hobbies string into an array
                        const hobbiesArray = candidateData.hobbies
                            ? candidateData.hobbies.split(',').map(hobby => hobby.trim())
                            : []; // If there are no hobbies, use an empty array
                        setHobbies(hobbiesArray); // Update hobbies state

                    }
                })
                .catch((err) => {
                    setCandidateError(true);
                    setCandidateSuccess(false);
                    setCandidateLoading(false);
                });
            // fetchCandidate()
        }
    }, [updateEvents])

    const handleDelete = () => {
        setDeleteEvents({ loading: true, error: false, success: false })
        axios.get(`/delete-candidate/${candidate_id}`)
            .then((res) => {
                setDeleteEvents({ loading: false, error: false, success: true })
                setAlerts({ delete: false });
                navigate("/candidates")

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
                                total_tenure_years: exp.total_tenure_months || '',
                                total_tenure_months: exp.total_tenure_months || '',
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


    const popupRef = useRef(null);

    const [nextRoundSelection, setNextRoundSelection] = useState({
        checked: false,
        value: candidate ? candidate.current_status : ""
    });

    useEffect(() => {
        setNextRoundSelection((values) => ({ ...values, value: candidate ? candidate.current_status : "" }))
    }, [candidate])

    const [permissions, setPersmissions] = useState({
        createInterview: false,
    })
    const [newInterviewDetails, setNewInterviewDetails] = useState({
        date: null,
        time: null,
        interviewer: "null",
        job: "null",
        loading: false,
        success: false,
        error: false
    });

    useEffect(() => {
        if (newInterviewDetails.job !== "null" && newInterviewDetails.interviewer !== "null" && newInterviewDetails.date && newInterviewDetails.time) {
            setPersmissions((values) => ({ ...values, createInterview: true }))
        }
        else (
            setPersmissions((values) => ({ ...values, createInterview: false }))
        )
    }, [newInterviewDetails])

    // Function to schedule the interview
    const scheduleInterview = () => {
        setNewInterviewDetails((values) => ({
            ...values, loading: true, success: false, error: false
        }));
        if (newInterviewDetails.job !== "null" && newInterviewDetails.interviewer !== "null" && newInterviewDetails.date && newInterviewDetails.time) {
            axios.post("/schedule-interview", {
                "job_id": Number(newInterviewDetails.job),
                "candidate_id": Number(candidate_id),
                "interview_date": `${newInterviewDetails.date}`,
                "interview_time": `${newInterviewDetails.time}`,
                "interviewer": `${newInterviewDetails.interviewer}`
            })
                .then((res) => {
                    setNewInterviewDetails((values) => ({
                        ...values, loading: false, success: true, error: false
                    }));

                    setTimeout(() => {
                        setNextRoundSelection((values) => ({ ...values, checked: false, value: "" }));
                        setNewInterviewDetails((values) => ({ ...values, success: false, date: null, time: null, job: "null", interviewer: "null" }))
                    }, 800);





                    // Updating Candidate Status
                    setShortlisted((values) => ({ ...values, loading: true, success: false, error: false }))
                    axios.post(`/update-candidate-status/${candidate_id}`,
                        {
                            "status": "Shortlisted",
                            "current_status": "Shortlisted"
                        }
                    )
                        .then((res) => {
                            setShortlisted((values) => ({ ...values, loading: false, success: true, error: false }))
                            setNextRoundSelection((values) => ({ ...values, checked: false }))
                            setCandidateLoading(true);
                            axios.get(`/candidate-info/${candidate_id}`)
                                .then((res) => {
                                    if (res.data.success) {
                                        const candidateData = res.data.candidate;
                                        setCandidateSuccess(true);
                                        setCandidateLoading(false);
                                        setCandidateError(false);
                                        setCandidate(candidateData);
                                        setExpeirenceInYears(res.data.experience_in_years)

                                        // Populate education and experience lists after data is fetched
                                        setEducationList(candidateData.qualifications || []);
                                        setExperienceList(candidateData.workExperiences.map((exp, index) => ({
                                            id_updated: index + 1,
                                            organisation_name: exp.organisation_name || '',
                                            last_designation: exp.last_designation || '',
                                            total_tenure: exp.total_tenure || '',
                                            last_drawn_salary: exp.last_drawn_salary || '',
                                        })) || []);

                                        // Convert skills string into an array
                                        const skillsArray = candidateData.skills
                                            ? candidateData.skills.split(',').map(skill => skill.trim())
                                            : []; // If there are no skills, use an empty array
                                        setSkills(skillsArray); // Update skills state

                                        // Convert hobbies string into an array
                                        const hobbiesArray = candidateData.hobbies
                                            ? candidateData.hobbies.split(',').map(hobby => hobby.trim())
                                            : []; // If there are no hobbies, use an empty array
                                        setHobbies(hobbiesArray); // Update hobbies state

                                    }
                                })
                                .catch((err) => {
                                    setCandidateError(true);
                                    setCandidateSuccess(false);
                                    setCandidateLoading(false);
                                });
                        })
                        .catch((err) => {
                            setShortlisted((values) => ({ ...values, loading: false, success: false, error: true }))
                            console.log(err)
                        })
                })
                .catch((err) => {
                    setNewInterviewDetails((values) => ({
                        ...values, loading: false, success: false, error: true
                    }));
                    console.log(err);
                });
        }
        else {
            console.log("Please Fill All Details")
            setNewInterviewDetails((values) => ({
                ...values, loading: false, success: false, error: false
            }));
        }
    };



    const [candidateStatus, setCandidateStatus] = useState(candidate ? candidate.status : "");
    useEffect(() => {
        setCandidateStatus(() => {
            if (candidate) {
                return candidate === "Shortlisted" ? "Shortlisted" : nextRoundSelection.value
            }
        })
    }, [nextRoundSelection])
    // Update Candidate Status
    const updateCandidateStatus = () => {
        axios.post(`/update-candidate-status/${candidate_id}`,
            {
                "status": candidateStatus,
                "current_status": nextRoundSelection.value
            }
        )
            .then((res) => {
                // console.log(res.data);
                setNextRoundSelection((values) => ({ ...values, checked: false }))
                setCandidateLoading(true);
                axios.get(`/candidate-info/${candidate_id}`)
                    .then((res) => {
                        if (res.data.success) {
                            const candidateData = res.data.candidate;
                            setCandidateSuccess(true);
                            setCandidateLoading(false);
                            setCandidateError(false);
                            setCandidate(candidateData);
                            setExpeirenceInYears(res.data.experience_in_years)

                            // Populate education and experience lists after data is fetched
                            setEducationList(candidateData.qualifications || []);
                            setExperienceList(candidateData.workExperiences.map((exp, index) => ({
                                id_updated: index + 1,
                                organisation_name: exp.organisation_name || '',
                                last_designation: exp.last_designation || '',
                                total_tenure: exp.total_tenure || '',
                                last_drawn_salary: exp.last_drawn_salary || '',
                            })) || []);

                            // Convert skills string into an array
                            const skillsArray = candidateData.skills
                                ? candidateData.skills.split(',').map(skill => skill.trim())
                                : []; // If there are no skills, use an empty array
                            setSkills(skillsArray); // Update skills state

                            // Convert hobbies string into an array
                            const hobbiesArray = candidateData.hobbies
                                ? candidateData.hobbies.split(',').map(hobby => hobby.trim())
                                : []; // If there are no hobbies, use an empty array
                            setHobbies(hobbiesArray); // Update hobbies state

                        }
                    })
                    .catch((err) => {
                        setCandidateError(true);
                        setCandidateSuccess(false);
                        setCandidateLoading(false);
                    });
            })
            .catch((err) => console.log(err))
    }


    const [shortlisted, setShortlisted] = useState({
        loading: false,
        success: false,
        error: false
    })

    const shortlistCandidate = () => {
        setShortlisted((values) => ({ ...values, loading: true, success: false, error: false }))
        axios.post(`/update-candidate-status/${candidate_id}`,
            {
                "status": "Shortlisted",
                "current_status": "Shortlisted"
            }
        )
            .then((res) => {
                setShortlisted((values) => ({ ...values, loading: false, success: true, error: false }))
                setNextRoundSelection((values) => ({ ...values, checked: false }))
                setCandidateLoading(true);
                axios.get(`/candidate-info/${candidate_id}`)
                    .then((res) => {
                        if (res.data.success) {
                            const candidateData = res.data.candidate;
                            setCandidateSuccess(true);
                            setCandidateLoading(false);
                            setCandidateError(false);
                            setCandidate(candidateData);
                            setExpeirenceInYears(res.data.experience_in_years)

                            // Populate education and experience lists after data is fetched
                            setEducationList(candidateData.qualifications || []);
                            setExperienceList(candidateData.workExperiences.map((exp, index) => ({
                                id_updated: index + 1,
                                organisation_name: exp.organisation_name || '',
                                last_designation: exp.last_designation || '',
                                total_tenure: exp.total_tenure || '',
                                last_drawn_salary: exp.last_drawn_salary || '',
                            })) || []);

                            // Convert skills string into an array
                            const skillsArray = candidateData.skills
                                ? candidateData.skills.split(',').map(skill => skill.trim())
                                : []; // If there are no skills, use an empty array
                            setSkills(skillsArray); // Update skills state

                            // Convert hobbies string into an array
                            const hobbiesArray = candidateData.hobbies
                                ? candidateData.hobbies.split(',').map(hobby => hobby.trim())
                                : []; // If there are no hobbies, use an empty array
                            setHobbies(hobbiesArray); // Update hobbies state

                        }
                    })
                    .catch((err) => {
                        setCandidateError(true);
                        setCandidateSuccess(false);
                        setCandidateLoading(false);
                    });
            })
            .catch((err) => {
                setShortlisted((values) => ({ ...values, loading: false, success: false, error: true }))
                console.log(err)
            })
    }






    // Validations
    // Validations
    // Validations

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
                    <div className='flex items-center justify-between sticky top-0 z-50 bg-white border-b'>
                        <div className='min-w-80'>
                            <div className='flex items-center p-4'>
                                <div className='inline-flex items-center justify-center h-20 w-20 bg-gray-100 rounded-full mr-4'><FaUser size={"20px"} className='text-gray-400' /></div>
                                <div>
                                    <div className='text-xl font-bold'>{`${candidate.title} ${candidate.first_name} ${candidate.last_name}`}</div>
                                    <div className='flex items-center gap-2'><MdWork /> {`${experienceInYears > 0 ? `${experienceInYears} Year` : `Fresher`}`} {experienceInMonths > 0 ? `& ${experienceInMonths} Months` : ""}</div>
                                    {/* <div className={`${candidate.status === "Active" ? "text-green-500" : candidate.status === "Inactive" ? "bg-orange-500" : "text-red-500"}`}>{`${candidate.status}`}</div> */}
                                    <div className='flex items-center gap-2'><VscDebugStepOut size={"14px"} className='rotate-90' /> {`${candidate.status}`}</div>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-4 items-center pr-8' ref={popupRef}>
                            {/* Filter Buttons */}
                            <button type="button" className={`p-2.5 rounded-lg w-32 ${selectedFilter === "Overview" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Overview")}>Overview</button>
                            <button type="button" className={`p-2.5 rounded-lg w-32 ${candidate.status === "Follow-up" ? "hidden" : "inline-block"} ${selectedFilter === "Applied Jobs" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Applied Jobs")}>Applied Jobs</button>
                            <button type="button" className={`p-2.5 rounded-lg w-32 ${candidate.status === "Follow-up" ? "hidden" : "inline-block"} ${selectedFilter === "Interviews" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Interviews")}>Interviews</button>
                            <button type="button" className={`p-2.5 rounded-lg w-32 ${selectedFilter === "Comments" ? "bg-indigo-700 text-white" : "bg-gray-100"}`} onClick={() => setSelectedFilter("Comments")}>Comments</button>

                            {/* Candidate Shortlisting Toggling if When user trying to shortlist the candidate */}
                            <button type="button" className={`p-2.5 rounded-lg min-w-32 ${candidate.status === "Follow-up" ? "inline-block" : "hidden"} ${selectedFilter === "Interviews" ? "bg-indigo-700 text-white" : "bg-gray-100"}`}
                                onClick={
                                    () => {
                                        candidateEmpty.value ? setCandidateEmpty({ value: true, toggled: true }) : shortlistCandidate();
                                        candidateEmpty.value ? setIsPersonalDetailsEditing(true) : setIsPersonalDetailsEditing(false);
                                    }
                                }>{shortlisted.loading ? "Shortlisting..." : shortlisted.success ? "Candidate Shortlisted" : shortlisted.error ? "Candidate Shortlisted" : "Shortlist"}</button>



                            <div className={`relative `} >
                                <span
                                    onClick={() => {
                                        if (nextRoundSelection.value !== "New Interview") {
                                            setNextRoundSelection((values) => ({ ...values, value: "New Interview", checked: false }))
                                        }
                                        else {
                                            setNextRoundSelection((values) => ({ ...values, value: "", checked: false }))
                                        }
                                    }}
                                    className='cursor-pointer inline-block p-2.5 px-5 rounded-lg min-w-40 bg-black text-white'>{candidate.status === "Follow-up" ? "Shortlist & Schedule Interview" : "Schedule Interview"}</span>
                            </div>

                            <div className={`p-2.5 ${candidate.status === "Follow-up" ? "hidden" : "inline-block"}`}>
                                <button type="button" className={`text-center block rounded-lg w-40 p-2.5 h-full border text-white ${nextRoundSelection.checked ? "bg-indigo-700" : "bg-black"}`}
                                    onClick={() => {
                                        setNextRoundSelection((values) => ({ ...values, checked: true }));
                                    }}>
                                    Change Status
                                </button>
                            </div>
                        </div>
                    </div>



                    <form onSubmit={handleUpdateCandidate} className={`max-h-full ${selectedFilter === "Overview" ? "block" : "hidden"}`}>
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


                        {/* Head Alert When User Trying to shortlist the candidate */}

                        <div className={`bg-gray-50 p-4 pb-0 transition-small ${isPersonalDetailsEditing ? "h-auto" : "h-0 overflow-hidden"}`}>
                            <div className='p-4 bg-red-100 border flex items-center gap-4 border-red-300 text-red-500'>
                                <TbAlertOctagonFilled size={"20px"} /> Please Fill All Required Details
                            </div>
                        </div>



                        <div className='grid gap-4 p-4 bg-gray-50'>
                            <div className='grid gap-2 p-6 bg-white w-full border'>
                                <h1 className='flex justify-between font-semibold text-indigo-700 pb-4'>
                                    <span className='text-xl'>Personal Details</span>
                                    <div className='flex items-center gap-4'>
                                        <button type="button" onClick={() => { setIsPersonalDetailsEditing(!isPersonalDetailsEditing); }}>{isPersonalDetailsEditing ? <span className='inline-flex gap-2 items-center p-2 rounded-lg px-5 bg-red-50 border border-red-300 text-red-500'><MdOutlineDone /> Disbale Edit</span> : <span className='inline-flex gap-2 items-center p-2 px-5'><MdEdit /> Edit Personal Details</span>}</button>
                                        {/* <button type="button" className={`${isPersonalDetailsEditing ? "inline-block" : "hidden"} p-2 rounded-lg px-4 bg-indigo-700 border border-indigo-700 text-white ${updateEvents.loading ? 'bg-opacity-80 cursor-not-allowed' : ''}`}
                                            onClick={handleUpdateCandidate}
                                            disabled={updateEvents.loading}
                                        >
                                            {updateEvents.loading ? <span className='inline-flex gap-2 items-center justify-center h-4'><AiOutlineLoading3Quarters size={"10px"} className='reload-rounding' /> Updating ...</span> : updateEvents.error ? "Error!, Try Again" : "Update Candidate"}
                                        </button> */}
                                        <input type="submit" className={`${isPersonalDetailsEditing ? "inline-block" : "hidden"} p-2 rounded-lg px-4 bg-indigo-700 border border-indigo-700 text-white ${updateEvents.loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError ? 'bg-opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
                                            // onClick={handleUpdateCandidate}
                                            disabled={updateEvents.loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError} value={"Update Candidate"}
                                        />
                                    </div>
                                </h1>

                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Title<span className='text-red-500'>*</span> </span>
                                        {/* <input type="text" className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.title} onChange={(e) => setCandidate((values) => ({ ...values, title: e.target.value }))} /> */}
                                        <select required className={`text-black border-l-2 w-96 border-transparent focus:outline-none focus:border-l-2 p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.title ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                            onChange={(e) => setCandidate((values) => ({ ...values, title: e.target.value }))}
                                            disabled={!isPersonalDetailsEditing}
                                            defaultValue={candidate.title ? candidate.title : "---"}>
                                            <option value="" disabled={true}>--- Selecte Title ---</option>
                                            <option value="Mr.">Mr.</option>
                                            <option value="Ms.">Ms.</option>
                                        </select>
                                    </div>
                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>First Name<span className='text-red-500'>*</span></span>
                                        <input
                                            type="text"
                                            required
                                            disabled={!isPersonalDetailsEditing}
                                            className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.first_name ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                            value={candidate.first_name}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const regex = /^[A-Za-z\s]*$/; // Only allow alphabetic characters and spaces
                                                if (regex.test(inputValue)) {
                                                    setCandidate((values) => ({ ...values, first_name: inputValue }));
                                                }
                                            }}
                                            placeholder="First Name"
                                        />
                                    </div>

                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>Middle Name</span>
                                        <input
                                            type="text"
                                            disabled={!isPersonalDetailsEditing}
                                            className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                            value={candidate.middle_name}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const regex = /^[A-Za-z\s]*$/; // Only allow alphabetic characters and spaces
                                                if (regex.test(inputValue)) {
                                                    setCandidate((values) => ({ ...values, middle_name: inputValue }));
                                                }
                                            }}
                                            placeholder="Middle Name"
                                        />
                                    </div>


                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>Last Name<span className='text-red-500'>*</span></span>
                                        <input
                                            type="text"
                                            required
                                            disabled={!isPersonalDetailsEditing}
                                            className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.last_name ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                            value={candidate.last_name}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const regex = /^[A-Za-z\s]*$/; // Only allow alphabetic characters and spaces
                                                if (regex.test(inputValue)) {
                                                    setCandidate((values) => ({ ...values, last_name: inputValue }));
                                                }
                                            }}
                                            placeholder="Last Name"
                                        />
                                    </div>

                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>Date Of Birth<span className='text-red-500'>*</span></span>
                                        <input
                                            type="text"
                                            required
                                            disabled={!isPersonalDetailsEditing}
                                            className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.first_name ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                            value={candidate.first_name}
                                            onChange={(e) => {
                                                // const inputValue = e.target.value;
                                                // const regex = /^[A-Za-z\s]*$/; // Only allow alphabetic characters and spaces
                                                // if (regex.test(inputValue)) {
                                                //     setCandidate((values) => ({ ...values, date_of_birth: inputValue }));
                                                // }
                                                setCandidate((values) => ({ ...values, date_of_birth: e.target.value }));
                                            }}
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div></div>

                                    <hr />
                                    <hr />
                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>Contact Number<span className='text-red-500'>*</span></span>
                                        <div className='grid'>
                                            <input
                                                type="text"
                                                required
                                                disabled={!isPersonalDetailsEditing}
                                                className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.contact_number ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                                value={candidate.contact_number}
                                                onChange={(e) => {
                                                    handleContactChange(e)
                                                    const inputValue = e.target.value;
                                                    const regex = /^[0-9+\- ]*$/; // Allow only numbers, +, -, and spaces
                                                    if (regex.test(inputValue)) {
                                                        setCandidate((values) => ({ ...values, contact_number: inputValue }));
                                                    }
                                                }}
                                                placeholder="Contact Number"
                                            />
                                            {validationErrors.contact_number && <span className="text-red-600">{validationErrors.contact_number}</span>}
                                        </div>
                                    </div>

                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>Alt. Contact Number</span>
                                        <div className='grid'>
                                            <input
                                                type="text"
                                                disabled={!isPersonalDetailsEditing}
                                                className={`text-black w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`}
                                                value={candidate.alt_contact_number}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    const regex = /^[0-9+\- ]*$/; // Allow only numbers, +, -, and spaces
                                                    if (regex.test(inputValue)) {
                                                        setCandidate((values) => ({ ...values, alt_contact_number: inputValue }));
                                                    }
                                                    handleAltContactChange(e)
                                                }}
                                                placeholder="Alt. Contact Number"
                                            />
                                            {validationErrors.alt_contact_number && <span className="text-red-600">{validationErrors.alt_contact_number}</span>}
                                        </div>
                                    </div>

                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>Email Address<span className='text-red-500'>*</span></span>
                                        <div>
                                            <input type="text" required disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.email_address ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.email_address}
                                                onChange={(e) => {
                                                    handleEmailChange(e)
                                                    setCandidate((values) => ({ ...values, email_address: e.target.value }))
                                                }
                                                } />
                                            {errors.emailError && <p className="text-red-500">{errors.emailError}</p>}
                                        </div>
                                    </div>


                                    <div className='flex gap-4'>
                                        <span className='font-semibold min-w-40 py-2'>Alt. Email Address</span>
                                        <div className='grid'>
                                            <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.alt_email_address}
                                                onChange={(e) => {
                                                    handleAltEmailChange(e)
                                                    setCandidate((values) => ({ ...values, alt_email_address: e.target.value }))
                                                }} />
                                            {errors.altEmailError && <p className="text-red-500">{errors.altEmailError}</p>}
                                        </div>
                                    </div>
                                    <hr />
                                    <hr />
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 1<span className='text-red-500'>*</span></span> <input required type="text" disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.address_line1 ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.address_line1} onChange={(e) => setCandidate((values) => ({ ...values, address_line1: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Address Line 2</span> <input type="text" disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.address_line2} onChange={(e) => setCandidate((values) => ({ ...values, address_line2: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>POST Code<span className='text-red-500'>*</span></span> <input required type="text" disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.pin_code ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.pin_code} onChange={(e) => setCandidate((values) => ({ ...values, pin_code: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>City<span className='text-red-500'>*</span></span> <input required type="text" disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.city ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.city} onChange={(e) => setCandidate((values) => ({ ...values, city: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>State<span className='text-red-500'>*</span></span> <input required type="text" disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.state ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.state} onChange={(e) => setCandidate((values) => ({ ...values, state: e.target.value }))} /></div>
                                    <div className='flex gap-4'><span className='font-semibold min-w-40 py-2'>Country<span className='text-red-500'>*</span></span> <input required type="text" disabled={!isPersonalDetailsEditing} className={`text-black border w-96 border-transparent focus:outline-none p-2 pl-4 focus:bg-gray-100 ${emptyRequiredValue.country ? "border-red-500" : ""} ${isPersonalDetailsEditing ? 'bg-gray-100 pr-5' : 'bg-white'}`} defaultValue={candidate.country} onChange={(e) => setCandidate((values) => ({ ...values, country: e.target.value }))} /></div>


                                    {/* Applied Jobs */}
                                    <div className={`w-80 ${candidate.status === "Follow-up" ? "inline-block" : "hidden"}`}>
                                        <label className={`inline-block mt-4 font-semibold`}>Select Jobs<span className="text-red-500">*</span></label>
                                        <div className={`relative`} ref={dropdownRef}>
                                            <div
                                                className={`select-none cursor-pointer p-[11.5px] border rounded-md mt-4 flex items-center justify-between ${emptyRequiredValue.selectedJobs ? "border-red-500" : "bg-white"} ${selectedJobs.toggled ? "bg-gray-200" : ""}`}
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
                                                                        checked={isChecked || selectedJobs.ids.includes(value.id)}
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

                                    <br />
                                    <div className={`${candidate.status === "Follow-up" ? "inline-block" : "hidden"}`}>
                                        <h1 className='font-bold'>Selected Jobs</h1>
                                        <div className='flex items-center gap-4 mt-4'>
                                            {
                                                selectedJobs.jobs.length > 0 ?
                                                    selectedJobs.jobs.map((value, index) => {
                                                        return (
                                                            <div key={index} className='inline-block p-2.5 px-5 rounded-full border'>{value.job_title}</div>
                                                        )
                                                    }) : <div className='mt-4'>No Jobs Selected Here!</div>
                                            }
                                        </div>
                                    </div>
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
                                    {experienceList.length > 0 ? (
                                        experienceList.map((experience, index) => {
                                            return (
                                                <div key={index} className='p-4 border mt-4 flex justify-between items-center'>
                                                    {isExperienceEditing ? (
                                                        <div className='grid grid-cols-6'>
                                                            <input
                                                                required
                                                                type='text'
                                                                value={experience.organisation_name}
                                                                onChange={(e) => handleExperienceInputChange(index, 'organisation_name', e.target.value)}
                                                                placeholder='Organisation Name'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                required
                                                                type='text'
                                                                value={experience.last_designation}
                                                                onChange={(e) => handleExperienceInputChange(index, 'last_designation', e.target.value)}
                                                                placeholder='Last Designation'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                required
                                                                type='number' // Change to number for easier input handling
                                                                value={experience.total_tenure_years || ''} // Adjusted to take months
                                                                onChange={(e) => handleExperienceInputChange(index, 'total_tenure_years', e.target.value)}
                                                                placeholder='Total Tenure Years'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                required
                                                                type='number' // Change to number for easier input handling
                                                                value={experience.total_tenure_months || ''} // Adjusted to take months
                                                                onChange={(e) => handleExperienceInputChange(index, 'total_tenure_months', e.target.value)}
                                                                placeholder='Total Tenure Months'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                required
                                                                type='text'
                                                                value={experience.last_drawn_salary}
                                                                onChange={(e) => handleExperienceInputChange(index, 'last_drawn_salary', e.target.value)}
                                                                placeholder='Last Drawn Salary'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <button type="button" onClick={() => removeExperience(experience.id_updated)} className='text-red-500 bg-red-100 flex items-center gap-2 justify-center'>
                                                                <MdDelete /> Remove Experience
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span>
                                                            {experience.organisation_name} - {experience.last_designation} - {experience.total_tenure_years} Years {experience.total_tenure_months} Months - Last Drawn Salary: {experience.last_drawn_salary}
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div>No Experience Added</div>
                                    )}

                                    <div>
                                        {isExperienceEditing && (
                                            <button type="button" onClick={addExperience} className='mt-4 bg-indigo-700 text-white p-2 px-4 mr-4'>
                                                + Add More Experience
                                            </button>
                                        )}

                                        <button type="button"
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
                                                                required
                                                                type='text'
                                                                defaultValue={education.college_university}
                                                                onChange={(e) => handleEducationInputChange(index, 'college_university', e.target.value)}
                                                                placeholder='Institution'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                required
                                                                type='text'
                                                                defaultValue={education.course}
                                                                onChange={(e) => handleEducationInputChange(index, 'course', e.target.value)}
                                                                placeholder='Degree'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                required
                                                                type='number'
                                                                defaultValue={education.year_of_passing}
                                                                onChange={(e) => handleEducationInputChange(index, 'year', e.target.value)}
                                                                placeholder='Year'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <input
                                                                required
                                                                type='text'
                                                                defaultValue={education.percentage_cgpa}
                                                                onChange={(e) => handleEducationInputChange(index, 'percentage_cgpa', e.target.value)}
                                                                placeholder='Grade'
                                                                className='border p-2 px-4 mr-2'
                                                            />
                                                            <button type="button" onClick={() => removeEducation(education.id)} className='text-red-500'>
                                                                <MdDelete />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        education.college_university !== "" ? <span>{education.college_university} - {education.course} ({education.year_of_passing}) - Grade: {education.percentage_cgpa}</span> : "There Is No Education Added"
                                                    )}
                                                </div>
                                            )) : "No Education"}
                                    </div>

                                    {isEducationEditing && (
                                        <button type="button" onClick={addEducation} className='mt-4 bg-indigo-700 text-white p-2 px-4 mr-4'>
                                            + Add More Education
                                        </button>
                                    )}

                                    <button type="button"
                                        onClick={() => setIsEducationEditing(!isEducationEditing)}
                                        className='mt-4 bg-indigo-700 text-white p-2 px-4'
                                    >
                                        {isEducationEditing ? 'Save Education' : 'Edit Education'}
                                    </button>
                                </div>
                            </div>


                            <div className='grid gap-2 p-6 bg-white w-full border'>
                                <h1 className='flex justify-between font-semibold text-indigo-700 mb-2'>
                                    <span className='text-xl'>Skills</span>
                                </h1>
                                <div>
                                    <input
                                        type="text"
                                        className="border block mb-4 w-96 rounded-full focus:outline-none p-2.5 pl-4 focus:bg-gray-100 bg-white"
                                        placeholder="Add a skill and press Enter"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={handleSkillsKeyDown}
                                    />
                                    <div className='flex flex-wrap gap-2'>
                                        {skills.map((skill, index) => (
                                            <span key={index} className='bg-indigo-100 text-indigo-700 inline-flex justify-center gap-2 items-center p-2.5 px-5 rounded-full'>
                                                {skill}
                                                <button type="button"
                                                    className="ml-2 text-red-500"
                                                    onClick={() => handleRemoveSkill(index)}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <div className='grid gap-2 p-6 bg-white w-full border'>
                                <h1 className='flex justify-between font-semibold text-indigo-700 mb-2'>
                                    <span className='text-xl'>Hobbies</span>
                                </h1>
                                <div>
                                    <input
                                        type="text"
                                        className="border p-2.5 mb-4 rounded-full w-96 pl-4 focus:outline-none focus:bg-gray-100 bg-white"
                                        placeholder="Add a hobby and press Enter"
                                        value={hobbyInput}
                                        onChange={(e) => setHobbyInput(e.target.value)}
                                        onKeyDown={handleHobbiesKeyDown}
                                    />
                                    <div className='flex flex-wrap gap-2'>
                                        {hobbies.map((hobby, index) => (
                                            <span key={index} className='bg-indigo-100 text-indigo-700 p-2.5 px-5 rounded-full'>
                                                {hobby}
                                                <button type="button"
                                                    className="ml-2 text-red-500"
                                                    onClick={() => handleRemoveHobby(index)}
                                                >
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>



                            <div className='pb-32 flex justify-end'>
                                <input type='submit' className={`p-2.5 rounded-lg px-4 bg-indigo-700 text-white ${updateEvents.loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError ? 'bg-opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
                                    // onClick={}
                                    disabled={updateEvents.loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError}
                                    value={updateEvents.loading ? <span className='inline-flex gap-2 items-center justify-center h-4'><AiOutlineLoading3Quarters size={"10px"} className='reload-rounding' /> Updating ...</span> : "Update Candidate"}
                                /></div>

                            <div className='grid gap-2 p-6 bg-white w-full border mb-4'>
                                <h1 className='flex justify-between font-semibold mb-2'>
                                    <span className='text-xl text-red-500'>Danger Zone</span>
                                    {/* <button className='inline-flex gap-2 items-center'><MdEdit /> Edit Legal Details</button> */}
                                </h1>
                                <div className='flex gap-4'>
                                    <button type="button" className='text-white bg-red-500 rounded-lg p-2.5 px-5'
                                        onClick={() => setAlerts((values) => ({ ...values, delete: true }))}
                                    >Delete This Candidate</button>
                                </div>

                                {/* Delete Alert */}
                                <div className={`${alerts.delete ? "flex" : "hidden"} fixed top-0 left-0 z-40 items-center justify-center h-full w-full backdrop-blur-sm bg-black bg-opacity-10`}>
                                    <div className='w-96 min-h-32 p-10 text-center bg-white border rounded-xl'>
                                        <h1 className='text-xl font-semibold text-red-500'>Do You Want To Delete The Candidate</h1>
                                        <div className='flex flex-wrap items-center justify-center gap-2 mt-4'>
                                            <button type="button" className='bg-gray-100 rounded-lg p-2.5 px-5 mt-4 mr-4'
                                                onClick={() => setAlerts((values) => ({ ...values, delete: false }))}
                                            >Cancel</button>
                                            <button type="button" className={`bg-red-500 text-white rounded-lg p-2.5 px-5 mt-4 ${deleteEvents.loading ? "bg-opacity-50 cursor-not-allowed" : ""}`} onClick={handleDelete} disabled={deleteEvents.loading}>{deleteEvents.loading ? "Deleting..." : "Delete"}</button>
                                            <div className={`text-red-500 ${deleteEvents.error ? "opacity-100" : "hidden"}`}>Error: Cann't Delete the Candidate</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>


                    {/* Applied Jobs */}
                    <div className={`h-full ${selectedFilter === "Applied Jobs" ? "block" : "hidden"}`}>
                        <AppliedJobs candidateId={candidate_id} candidate={candidate} />
                    </div>



                    {/* Interviews */}
                    <div className={`${selectedFilter === "Interviews" ? "block" : "hidden"}`}>
                        <CandidateInterviews candidateId={candidate_id} />
                    </div>


                    {/* Comments */}
                    <div className={`${selectedFilter === "Comments" ? "block" : "hidden"}`}>
                        <CandidateComments candidateId={candidate_id} />
                    </div>

                    {/* Update Status */}
                    <div className={`fixed z-[101] top-0 w-full h-full flex justify-center items-center left-0 backdrop-blur-sm text-black border shadow-2xl gap-4 p-4 ${nextRoundSelection.checked ? "flex" : "hidden"}`}>
                        <div className='w-96 bg-white border grid gap-4 p-10'>
                            {/* <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "FollowUp" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                onClick={() => setNextRoundSelection((values) => ({ ...values, value: "FollowUp" }))}>
                                <FaListUl size={"12px"} /> Follow Up
                            </button> */}

                            <button type="button" className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Rejected" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Rejected" }))}>
                                <IoMdClose size={"14px"} /> Rejected
                            </button>

                            {/* <button className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Shortlisted" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Shortlisted" }))}>
                                <RiListCheck3 size={"16px"} /> Shortlisted
                            </button> */}

                            <button type="button" className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Offered" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Offered" }))}>
                                <MdOutlineDone size={"16px"} />Offered
                            </button>

                            <button type="button" className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "OnBoard" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                onClick={() => setNextRoundSelection((values) => ({ ...values, value: "OnBoard" }))}>
                                <RiUserSharedFill size={"14px"} />On Board
                            </button>

                            <button type="button" className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Training" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Training" }))}>
                                <VscVmRunning size={"16px"} />Training
                            </button>

                            <button type="button" className={`p-2.5 inline-flex items-center justify-start gap-2 border w-full rounded-md ${nextRoundSelection.value === "Live" ? "bg-indigo-700 text-white border-indigo-700" : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"}`}
                                onClick={() => setNextRoundSelection((values) => ({ ...values, value: "Live" }))}>
                                <FaCircleDot size={"16px"} /> Live
                            </button>


                            <div className='flex gap-4'>
                                <button type="button" className={`p-2.5 inline-flex items-center justify-center gap-2 border w-full rounded-md bg-gray-100`}
                                    onClick={() => {
                                        setNextRoundSelection((values) => ({ ...values, checked: false }));
                                    }}>Cancel
                                </button>

                                <button type="button" className={`p-2.5 min-w-[60%] inline-flex items-center justify-center gap-2 border rounded-md bg-black text-white border-black`}
                                    onClick={() => {
                                        updateCandidateStatus();
                                        // console.log(nextRoundSelection.value)
                                    }}
                                >
                                    <MdDone size={"16px"} /> Update
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Set Interview */}
                    <div className={`fixed flex justify-center items-center h-full w-full z-[101] backdrop-blur-sm left-0 top-0 ${nextRoundSelection.value === "New Interview" ? "block" : "hidden"}`}>
                        <div
                            className={`min-h-96 w-80 p-4 bg-white border shadow-2xl text-black cursor-default`}>
                            <label className='block text-left'>Interview Date</label>
                            <input
                                required={true}
                                onChange={(e) => setNewInterviewDetails((values) => ({ ...values, date: e.target.value }))}
                                className='block text-left border w-full  mt-2 p-2.5 bg-gray-50' type="date" />
                            <br />
                            <label className='block text-left'>Interview Time</label>
                            <input
                                required={true}
                                onChange={(e) => setNewInterviewDetails((values) => ({ ...values, time: e.target.value }))}
                                className='block text-left border w-full mt-2 p-2.5 bg-gray-50' type="time" />
                            <br />
                            <label className='block text-left'>Interviewer</label>
                            <select defaultValue={"---"}
                                onChange={(e) => setNewInterviewDetails((values) => ({ ...values, interviewer: e.target.value }))}
                                className='block text-left border w-full mt-2 p-2.5 bg-gray-50'>
                                <option value={"---"} disabled={true}>--- Select Interviewer ---</option>
                                {
                                    allUsers.length > 0 ?
                                        allUsers.map((value, key) => {
                                            return (
                                                <option value={value.id} key={key}>{`${value.title} ${value.first_name} ${value.middle_name} ${value.last_name}`}</option>
                                            )
                                        }) : <option value={"null"}>No User Found!</option>
                                }
                            </select>
                            <br />
                            <label className='block text-left'>Select Job For Interview</label>
                            <select defaultValue={"---"}
                                onChange={(e) => setNewInterviewDetails((values) => ({ ...values, job: e.target.value }))}
                                className='block text-left border w-full mt-2 p-2.5 bg-gray-50'>
                                <option value="---" disabled={true}>--- Select Interviewer ---</option>
                                {
                                    candidate.candidate_applied_jobs.length > 0 ?
                                        candidate.candidate_applied_jobs.map((value, key) => {
                                            return (
                                                <option value={value.job_id} key={key}>{value.job.job_title}</option>
                                            )
                                        }) : <option value={"null"}>No Applied Jobs Found!</option>
                                }
                            </select>
                            <br />

                            <div className='flex gap-4'>
                                <button type="button" className='min-w-[30%] px-5 rounded-md bg-gray-100 border' onClick={() => setNextRoundSelection((values) => ({ ...values, value: "", checked: false }))}>Cancel</button>
                                <button type="button" onClick={scheduleInterview} className={`min-w-[60%] p-2.5 bg-indigo-700 text-white w-full rounded-md`}
                                    disabled={newInterviewDetails.loading ? true : newInterviewDetails.success ? true : !permissions.createInterview ? true : false}
                                    style={{
                                        opacity: newInterviewDetails.loading ? 0.9 : newInterviewDetails.success ? 0.9 : !permissions.createInterview ? 0.5 : 1,
                                        cursor: newInterviewDetails.loading ? "not-allowed" : newInterviewDetails.success ? "not-allowed" : !permissions.createInterview ? "not-allowed" : "",
                                        backgroundColor: newInterviewDetails.loading ? "" : newInterviewDetails.success ? "green" : newInterviewDetails.error ? "red" : "",
                                    }}
                                >{newInterviewDetails.loading ? "Scheduling" : newInterviewDetails.success ? "Interview Scheduled" : newInterviewDetails.error ? "Error! Try Again" : "Schedule Interview"}</button>
                            </div>
                        </div>
                    </div>

                </div>


                {/* Can't Shortlist Candidate alert when user didn't filled the mendetory feilds */}
                <div className={`fixed top-0 left-0 w-full h-full backdrop-blur-sm z-[1000] justify-center items-center hidden`}>
                    <div className='w-96 bg-white border rounded-xl p-8'>
                        <h1 className='flex justify-center gap-2 items-center font-bold text-xl text-red-500'>
                            <TbAlertOctagonFilled size={"15px"} />
                            <p className='text-xl'>Can't Shortlist The Candidate</p>
                        </h1>
                        <h1 className='mt-4'>Sorry! You Can't make this candidate shortlisted until unless you fill complete details of the candidate</h1>
                        <div className='text-red-500 mt-4'>
                            {/* <h1 className='font-bold'>These Feilds Are Required*</h1> */}
                            <ul>
                                <li className={`${candidate.title === "" ? "block" : "hidden"}`}>Title - is required feild</li>
                                <li className={`${candidate.first_name === "" ? "block" : "hidden"}`}>First Name - is required feild</li>
                                <li className={`${candidate.last_name === "" ? "block" : "hidden"}`}>Last Name - is required feild</li>
                                <li className={`${candidate.address_line1 === "" ? "block" : "hidden"}`}>Address Line 1 - is required feild</li>
                                <li className={`${candidate.city === "" ? "block" : "hidden"}`}>City - is required feild</li>
                                <li className={`${candidate.state === "" ? "block" : "hidden"}`}>State - is required feild</li>
                                <li className={`${candidate.pin_code === "" ? "block" : "hidden"}`}>POST Code - is required feild</li>
                                <li className={`${candidate.country === "" ? "block" : "hidden"}`}>Country - is required feild</li>
                                <li className={`${candidate.contact_number === "" ? "block" : "hidden"}`}>Contact Number - is required feild</li>
                                <li className={`${candidate.email_address === "" ? "block" : "hidden"}`}>Email Address - is required feild</li>
                                <li className={`${selectedJobs.jobs.length <= 0 ? "block" : "hidden"}`}>Atleast 1 Job - is required feild</li>
                            </ul>

                        </div>
                        <button type="button" className='p-2.5 border w-full mt-4 rounded-xl' onClick={() => setCandidateEmpty({ value: true, toggled: false })}>Okay</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateView;