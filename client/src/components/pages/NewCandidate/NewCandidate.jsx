import { useEffect, useState } from "react";
import Qualifications from "../../commons/Qualifications";
import { useSelector } from "react-redux";
import useNewCandidate from "../../../helpers/useNewCandidate";
import { FaTimes } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const NewCandidate = () => {
    const { registerCandidate, loading, success, error } = useNewCandidate()

    // Canidate Handlings
    const [candidate, setCandidate] = useState({
        "title": "",
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "address_line1": "",
        "address_line2": "",
        "city": "",
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
        "recruiter_comments": "",
        "communication_skills": "Excellent",
        "status": "",
        "other1": "Additional info 1",
        "other2": "Additional info 2",
        "other3": "Additional info 3",
    })

    // Experience Handlings
    const initialExperienceField = {
        // jobTitle: "",
        // department: "",
        organisation_name: "",
        total_tenure: "",
        last_designation: "",
        last_drawn_salary: ""
    };

    const [experienceFields, setExperienceFields] = useState([initialExperienceField]);
    const [isExperienced, setIsExperienced] = useState(false);

    const addExperienceField = () => {
        setExperienceFields([...experienceFields, initialExperienceField]);
    };

    const handleInputChange = (index, event) => {
        const values = [...experienceFields]; // Create a shallow copy of the experience fields
        values[index] = {
            ...values[index], // Copy the existing experience object
            [event.target.name]: event.target.value // Update only the specific field
        };
        setExperienceFields(values);
    };

    const removeExperienceField = (index) => {
        if (experienceFields.length > 1) {
            const values = [...experienceFields];
            values.splice(index, 1);
            setExperienceFields(values);
        }
    };

    const handleExperienceChange = (event) => {
        const selectedValue = event.target.value;
        setIsExperienced(selectedValue === "experienced");

        // Log the current experience fields before any potential changes
        console.log("Current Experience Fields: ", experienceFields);

        // Reset experience fields when "Fresher" is selected
        if (selectedValue === "fresher") {
            setExperienceFields([initialExperienceField]); // Reset to initial field
        } else if (selectedValue === "experienced" && experienceFields.length === 0) {
            setExperienceFields([initialExperienceField]); // Initialize with one empty field
        }
    };




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
    };



    return (
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">Create New Candidate</h1>
            <span className={`inline-flex items-center gap-2 fixed top-28 p-3 min-w-60 bg-green-600 text-white transition-small ${success ? 'right-12' : '-right-[100%]'}`}><IoIosCheckmarkCircleOutline size={'18px'} />User Created Successfully</span>
            <span className={`inline-flex items-center gap-2 fixed top-28 p-3 min-w-60 bg-red-600 text-white transition-small ${error ? 'right-12' : '-right-[100%]'}`}><IoIosCheckmarkCircleOutline size={'18px'} />User Creation Failed</span>

            <div className="w-full mt-10">


                <h1 className="flex items-center"><span className="inline-block min-w-fit text-2xl mr-5">Personal Details</span> <hr className="w-full" /></h1>

                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" value={candidate.title} className="font-semibold inline-block p-4 pl-0">Title</label>
                        <select className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, title: e.target.value }))}
                        >
                            <option value="Mr." selected disabled>-- Select Title --</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">First Name</label>
                        <input type="text" className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, first_name: e.target.value }))}
                            placeholder="First Name" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Middle Name</label>
                        <input type="text" className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, middle_name: e.target.value }))}
                            placeholder="Middle Name" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Name</label>
                        <input type="text" className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, last_name: e.target.value }))}
                            placeholder="Last Name" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Address Line 1</label>
                        <input type="text" className="primary-input"
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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">City</label>
                        <input type="text" className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, city: e.target.value }))}
                            placeholder="Address Line 2" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">State</label>
                        <input type="text" className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, state: e.target.value }))}
                            placeholder="State" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Pin Code</label>
                        <input type="number" className="primary-input" placeholder="Pin Code" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Country</label>
                        <input type="text" className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, country: e.target.value }))}
                            placeholder="Country" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="contact_number" className="font-semibold inline-block p-4 pl-0">Contact Number</label>
                        <input
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
                        <label htmlFor="email_address" className="font-semibold inline-block p-4 pl-0">Email Address</label>
                        <input
                            type="email"
                            className="primary-input"
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
                            className="primary-input"
                            onChange={handleAltEmailChange}
                            placeholder="Alt. Email Address"
                            name="alt_email_address"
                            id="alt_email_address"
                        />
                        {/* Show validation error for alternate email */}
                        {errors.altEmailError && <p className="text-red-500">{errors.altEmailError}</p>}
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of Birth</label>
                        <input type="date" className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, date_of_birth: e.target.value }))}
                            placeholder="Date of Birth" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Job Title</label>

                        <select className="primary-input"
                            onChange={(e) => setCandidate((values) => ({ ...values, job_title: e.target.value }))}
                        >
                            <option value="" selected disabled>-- Job Title --</option>

                            <optgroup label="Sales">
                                <option value="Telesales">Telesales</option>
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="Account Executive">Account Executive</option>
                                <option value="Business Development Manager">Business Development Manager</option>
                            </optgroup>

                            <optgroup label="Development">
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="Mobile App Developer">Mobile App Developer</option>
                            </optgroup>

                            <optgroup label="Design">
                                <option value="UI/UX Designer">UI/UX Designer</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value="Product Designer">Product Designer</option>
                                <option value="Web Designer">Web Designer</option>
                            </optgroup>

                            <optgroup label="Marketing">
                                <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
                                <option value="Content Strategist">Content Strategist</option>
                                <option value="SEO Specialist">SEO Specialist</option>
                                <option value="Social Media Manager">Social Media Manager</option>
                            </optgroup>

                            <optgroup label="Management">
                                <option value="Project Manager">Project Manager</option>
                                <option value="Operations Manager">Operations Manager</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Human Resources Manager">Human Resources Manager</option>
                            </optgroup>
                        </select>
                    </div>

                </div>



                {/* Experience Component */}
                <h1 className="flex items-center my-8"><span className="inline-block min-w-fit text-2xl mr-5">Experience</span> <hr className="w-full" /></h1>
                <div>
                    <div className="mb-5 w-1/4 pr-3">
                        <label htmlFor="experience" className="font-semibold inline-block p-4 pl-0">Experience Level</label>
                        <select
                            id="experience"
                            className="primary-input"
                            onChange={handleExperienceChange}
                        >
                            <option value="" disabled selected>-- Select Experience Level --</option>
                            <option value="fresher">Fresher</option>
                            <option value="experienced">Experienced</option>
                        </select>
                    </div>

                    {isExperienced && (
                        <>
                            {experienceFields.map((experienceField, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 mb-5 pb-10 border-b relative">
                                    {/* <div>
                                        <label htmlFor={`jobTitle-${index}`} className="font-semibold inline-block p-4 pl-0">Job Title</label>
                                        <input
                                            type="text"
                                            className="primary-input"
                                            placeholder="Job Title"
                                            name="jobTitle"
                                            id={`jobTitle-${index}`}
                                            value={experienceField.jobTitle}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </div> */}

                                    {/* <div>
                                        <label htmlFor={`department-${index}`} className="font-semibold inline-block p-4 pl-0">Department</label>
                                        <select
                                            name="department"
                                            id={`department-${index}`}
                                            className="primary-input"
                                            value={experienceField.department}
                                            onChange={event => handleInputChange(index, event)}
                                        >
                                            <option value="" disabled selected>-- Select Department --</option>
                                            <option value="Software Development">Software Development</option>
                                            <option value="IT">IT</option>
                                            <option value="Human Resources">Human Resources</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Customer Support">Customer Support</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Research and Development">Research and Development</option>
                                            <option value="Legal">Legal</option>
                                        </select>
                                    </div> */}

                                    <div>
                                        <label htmlFor={`organisation_name-${index}`} className="font-semibold inline-block p-4 pl-0">Organisation Name</label>
                                        <input
                                            type="text"
                                            className="primary-input"
                                            placeholder="Organisation Name"
                                            name="organisation_name"
                                            id={`organisation_name-${index}`}
                                            value={experienceField.organisation_name}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`total_tenure-${index}`} className="font-semibold inline-block p-4 pl-0">Total Tenure</label>
                                        <input
                                            type="text"
                                            className="primary-input"
                                            placeholder="Total Tenure"
                                            name="total_tenure"
                                            id={`total_tenure-${index}`}
                                            value={experienceField.total_tenure}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`last_designation-${index}`} className="font-semibold inline-block p-4 pl-0">Last Designation</label>
                                        <input
                                            type="text"
                                            className="primary-input"
                                            placeholder="Last Designation"
                                            name="last_designation"
                                            id={`last_designation-${index}`}
                                            value={experienceField.last_designation}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`last_drawn_salary-${index}`} className="font-semibold inline-block p-4 pl-0">Last Drawn Salary</label>
                                        <input
                                            type="text"
                                            className="primary-input"
                                            placeholder="Last Drawn Salary"
                                            name="last_drawn_salary"
                                            id={`last_drawn_salary-${index}`}
                                            value={experienceField.last_drawn_salary}
                                            onChange={event => handleInputChange(index, event)}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className={`absolute top-0 right-0 mt-4 mr-4 text-red-600 ${experienceFields.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => removeExperienceField(index)}
                                        disabled={experienceFields.length === 1}
                                    >
                                        Remove
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









                {/* Education/ Qualification Handling */}
                {/* Education/ Qualification Handling */}
                {/* Education/ Qualification Handling */}
                <h1 className="flex items-center my-8"><span className="inline-block min-w-fit text-2xl mr-5">Qualifications</span> <hr className="w-full" /></h1>
                <div>
                    {qualifications.map((qualificationField, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 mb-5 pb-10 border-b relative">
                            <div>
                                <label htmlFor={`course-${index}`} className="font-semibold inline-block p-4 pl-0">Course</label>
                                <input
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
                                <label htmlFor={`college_university-${index}`} className="font-semibold inline-block p-4 pl-0">College/University Name</label>
                                <input
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
                                <label htmlFor={`year_of_passing-${index}`} className="font-semibold inline-block p-4 pl-0">Year of Passing</label>
                                <input
                                    type="text"
                                    className="primary-input"
                                    placeholder="Year of Passing"
                                    name="year_of_passing"
                                    id={`year_of_passing-${index}`}
                                    value={qualificationField.year_of_passing}
                                    onChange={event => handleQualificationChange(index, event)}
                                />
                            </div>

                            <div>
                                <label htmlFor={`percentage_cgpa-${index}`} className="font-semibold inline-block p-4 pl-0">Percentage/CGPA</label>
                                <input
                                    type="text"
                                    className="primary-input"
                                    placeholder="Percentage/CGPA"
                                    name="percentage_cgpa"
                                    id={`percentage_cgpa-${index}`}
                                    value={qualificationField.percentage_cgpa}
                                    onChange={event => handleQualificationChange(index, event)}
                                />
                            </div>

                            <button
                                type="button"
                                className={`absolute top-0 right-0 mt-4 mr-4 text-red-600 ${qualifications.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => removeQualificationField(index)}
                                disabled={qualifications.length === 1}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

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





                {/* Skills Hanlding */}
                {/* Skills Hanlding */}
                {/* Skills Hanlding */}
                <h1 className="flex items-center my-8"><span className="inline-block min-w-fit text-2xl mr-5">Skills</span> <hr className="w-full" /></h1>
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






                {/* Hobbies Handling */}
                {/* Hobbies Handling */}
                {/* Hobbies Handling */}
                <h1 className="flex items-center my-8"><span className="inline-block min-w-fit text-2xl mr-5">Hobbies</span> <hr className="w-full" /></h1>
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




                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4">
                        <button className={`primary-button justify-center ${loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                            disabled={loading || validationErrors.alt_contact_number || validationErrors.contact_number || errors.emailError || errors.altEmailError}
                            onClick={() => {
                                // console.log(qualifications);
                                // registerCandidate(candidate, experiences, educations, skills, hobbies)
                                registerCandidate(candidate, experienceFields, qualifications, skillFields, hobbyFields)
                            }}
                        >Create User</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default NewCandidate;