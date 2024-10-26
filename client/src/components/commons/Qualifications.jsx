import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQualification } from '../../redux/reducers/candidateSlice'; // Adjust the path according to your structure

const Qualifications = () => {
    const dispatch = useDispatch();
    const [qualificationFields, setQualificationFields] = useState([
        {
            course: "",
            collegeName: "",
            yearOfPassing: "",
            percentageOrCgpa: ""
        }
    ]);

    // Add new qualification field
    const addQualificationField = () => {
        setQualificationFields([
            ...qualificationFields,
            {
                course: "",
                collegeName: "",
                yearOfPassing: "",
                percentageOrCgpa: ""
            }
        ]);
    };

    // Handle input change in the qualification field
    const handleQualificationChange = (index, event) => {
        const { name, value } = event.target;
        const values = [...qualificationFields];
        values[index][name] = value;
        setQualificationFields(values);

        // Dispatch updated qualifications to the Redux store
        dispatch(addQualification(values));
    };

    // Remove a qualification field
    const removeQualificationField = (index) => {
        if (qualificationFields.length > 1) {
            const values = [...qualificationFields];
            values.splice(index, 1);
            setQualificationFields(values);

            // Dispatch updated qualifications after removal to the Redux store
            dispatch(addQualification(values));
        }
    };

    return (
        <div>
            {qualificationFields.map((qualificationField, index) => (
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
                        <label htmlFor={`collegeName-${index}`} className="font-semibold inline-block p-4 pl-0">College/University Name</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="College/University Name"
                            name="collegeName"
                            id={`collegeName-${index}`}
                            value={qualificationField.collegeName}
                            onChange={event => handleQualificationChange(index, event)}
                        />
                    </div>

                    <div>
                        <label htmlFor={`yearOfPassing-${index}`} className="font-semibold inline-block p-4 pl-0">Year of Passing</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="Year of Passing"
                            name="yearOfPassing"
                            id={`yearOfPassing-${index}`}
                            value={qualificationField.yearOfPassing}
                            onChange={event => handleQualificationChange(index, event)}
                        />
                    </div>

                    <div>
                        <label htmlFor={`percentageOrCgpa-${index}`} className="font-semibold inline-block p-4 pl-0">Percentage/CGPA</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="Percentage/CGPA"
                            name="percentageOrCgpa"
                            id={`percentageOrCgpa-${index}`}
                            value={qualificationField.percentageOrCgpa}
                            onChange={event => handleQualificationChange(index, event)}
                        />
                    </div>

                    <button
                        type="button"
                        className={`absolute top-0 right-0 mt-4 mr-4 text-red-600 ${qualificationFields.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => removeQualificationField(index)}
                        disabled={qualificationFields.length === 1}
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
    );
};

export default Qualifications;