import React, { useState } from "react";

const ExperienceField = () => {
    const [experienceFields, setExperienceFields] = useState([
        {
            jobTitle: "",
            department: "",
            organisationName: "",
            totalTenure: "",
            lastDesignation: "",
            lastDrawnSalary: ""
        }
    ]);

    const [isExperienced, setIsExperienced] = useState(false);

    const addExperienceField = () => {
        setExperienceFields([
            ...experienceFields,
            {
                jobTitle: "",
                department: "",
                organisationName: "",
                totalTenure: "",
                lastDesignation: "",
                lastDrawnSalary: ""
            }
        ]);
    };

    const handleInputChange = (index, event) => {
        const values = [...experienceFields];
        values[index][event.target.name] = event.target.value;
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

        // Ensure at least one form is present when switching to "Experienced"
        if (selectedValue === "experienced" && experienceFields.length === 0) {
            setExperienceFields([
                {
                    jobTitle: "",
                    department: "",
                    organisationName: "",
                    totalTenure: "",
                    lastDesignation: "",
                    lastDrawnSalary: ""
                }
            ]);
        }
    };

    return (
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
                            <div>
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
                            </div>

                            <div>
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
                            </div>

                            <div>
                                <label htmlFor={`organisationName-${index}`} className="font-semibold inline-block p-4 pl-0">Organisation Name</label>
                                <input
                                    type="text"
                                    className="primary-input"
                                    placeholder="Organisation Name"
                                    name="organisationName"
                                    id={`organisationName-${index}`}
                                    value={experienceField.organisationName}
                                    onChange={event => handleInputChange(index, event)}
                                />
                            </div>

                            <div>
                                <label htmlFor={`totalTenure-${index}`} className="font-semibold inline-block p-4 pl-0">Total Tenure</label>
                                <input
                                    type="text"
                                    className="primary-input"
                                    placeholder="Total Tenure"
                                    name="totalTenure"
                                    id={`totalTenure-${index}`}
                                    value={experienceField.totalTenure}
                                    onChange={event => handleInputChange(index, event)}
                                />
                            </div>

                            <div>
                                <label htmlFor={`lastDesignation-${index}`} className="font-semibold inline-block p-4 pl-0">Last Designation</label>
                                <input
                                    type="text"
                                    className="primary-input"
                                    placeholder="Last Designation"
                                    name="lastDesignation"
                                    id={`lastDesignation-${index}`}
                                    value={experienceField.lastDesignation}
                                    onChange={event => handleInputChange(index, event)}
                                />
                            </div>

                            <div>
                                <label htmlFor={`lastDrawnSalary-${index}`} className="font-semibold inline-block p-4 pl-0">Last Drawn Salary</label>
                                <input
                                    type="text"
                                    className="primary-input"
                                    placeholder="Last Drawn Salary"
                                    name="lastDrawnSalary"
                                    id={`lastDrawnSalary-${index}`}
                                    value={experienceField.lastDrawnSalary}
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
    );
};

export default ExperienceField;
