import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importing an icon for removal

function Hobbies() {
    const [hobbyFields, setHobbyFields] = useState([{ hobby: "" }]);

    const handleInputChange = (index, event) => {
        const values = [...hobbyFields];
        values[index].hobby = event.target.value;
        setHobbyFields(values);
    };

    const removeHobbyField = (index) => {
        if (hobbyFields.length > 1) {
            const values = [...hobbyFields];
            values.splice(index, 1);
            setHobbyFields(values);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const hobbyValue = hobbyFields[hobbyFields.length - 1].hobby.trim();
            if (hobbyValue) {
                setHobbyFields([...hobbyFields, { hobby: "" }]);
                // Clear the last input field after adding the hobby
                setHobbyFields(prev => {
                    const newHobbies = [...prev];
                    newHobbies[newHobbies.length - 1].hobby = ""; // Clear the last input
                    return newHobbies;
                });
            }
        }
    };

    return (
        <div className='flex flex-wrap items-center'>
            <input
                    type="text"
                    className="mr-2 w-60 p-3 px-6 my-2 border rounded-full w-32"
                    placeholder="Add a hobby"
                    value={hobbyFields[hobbyFields.length - 1].hobby}
                    onChange={event => handleInputChange(hobbyFields.length - 1, event)}
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

            

            {/* <div className="flex items-center">
                
            </div> */}
        </div>
    );
}

export default Hobbies;
