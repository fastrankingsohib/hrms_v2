import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { addSkill, removeSkill } from '../../redux/reducers/candidateSlice'; // Correct import for addSkill

function Skills() {
    const dispatch = useDispatch();
    const [skillFields, setSkillFields] = useState([{ id: Date.now(), skill: "" }]); // Add ID

    // Load existing skills from Redux store if needed
    const storedSkills = useSelector((state) => state.skills || []);

    useEffect(() => {
        if (storedSkills.length > 0) {
            setSkillFields(storedSkills);  // Initialize with stored skills
        }
    }, [storedSkills]);

    const handleSkillsChange = (index, event) => {
        const values = [...skillFields];
        values[index].skill = event.target.value;
        setSkillFields(values);
    };

    const removeSkillField = (index) => {
        const skillToRemove = skillFields[index];
        if (skillToRemove) {
            dispatch(removeSkill(skillToRemove.id)); // Dispatch with the skill's ID
            setSkillFields(skillFields.filter((_, i) => i !== index)); // Update local state
        }
    };

    const handleSkillsKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const skillValue = skillFields[skillFields.length - 1].skill.trim();
            if (skillValue) {
                const newSkill = { id: Date.now(), skill: skillValue }; // Assign a unique ID
                dispatch(addSkill(newSkill)); // Dispatch the action to add the skill
                setSkillFields([...skillFields, { id: Date.now(), skill: "" }]); // Add new skill field
            }
        }
    };

    return (
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
    );
}

export default Skills;
