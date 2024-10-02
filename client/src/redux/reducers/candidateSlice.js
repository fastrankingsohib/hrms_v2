import { createSlice } from "@reduxjs/toolkit";
import { RiContactsBookLine } from "react-icons/ri";

// Initial state for the candidate slice
const initialState = {
    candidates: [],
    qualifications: [],
    experience: [], // Experience array
    hobbies: [], // Hobbies array
    skills: [], // Skills array
    isLoading: false,
    error: null,
};

// Create the candidate slice
const candidateSlice = createSlice({
    name: "candidateSlice",
    initialState: initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addCandidate: (state, action) => {
            state.candidates.push(action.payload);
            state.isLoading = false;
        },
        addQualification: (state, action) => {
            state.qualifications.push(action.payload);
        },
        addExperience: (state, action) => {
            const newExperience = action.payload;
            

            // Check if the experience already exists in the state
            const experienceExists = state.experience.some(experience => {
                // Customize the comparison based on which fields determine uniqueness
                return (
                    experience.jobTitle === newExperience.jobTitle &&
                    experience.organisationName === newExperience.organisationName &&
                    experience.totalTenure === newExperience.totalTenure
                );
            });

            // If it doesn't exist, push the new experience into the array
            if (!experienceExists) {
                state.experience.push(newExperience);
                // console.log("Experience added:", newExperience);
            } else {
                // console.log("Experience already exists:", newExperience);
            }
        },

        updateExperience: (state, action) => {
            const index = state.experience.findIndex(exp => exp.id === action.payload.id);
            if (index !== -1) {
                state.experience[index] = action.payload; // Update existing experience
            }
        },
        removeExperience: (state, action) => {
            state.experience = state.experience.filter(exp => exp.id !== action.payload); // Remove experience by ID
        },
        addHobby: (state, action) => {
            state.hobbies.push(action.payload); // Adds hobby to the array

        },
        addSkill: (state, action) => {
            state.skills.push(action.payload); // Adds skill to the array
            console.log(action.payload)
            console.log(state.skills.length)
        },
        removeSkill: (state, action) => {
            state.skills = state.skills.filter(skill => skill.id !== action.payload.id); // Remove skill by ID
            console.log("Updated skills array length:", state.skills.length); // Log for debugging
        },
        updateCandidate: (state, action) => {
            const index = state.candidates.findIndex(candidate => candidate.id === action.payload.id);
            if (index !== -1) {
                state.candidates[index] = action.payload;
            }
            state.isLoading = false;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetCandidates: (state) => {
            state.candidates = [];
        },
    },
});

// Export actions and reducer
export const {
    startLoading,
    addCandidate,
    addQualification,
    addExperience,
    updateExperience,
    removeExperience,
    addHobby,
    addSkill,
    removeSkill,
    updateCandidate,
    setError,
    resetCandidates
} = candidateSlice.actions;

export default candidateSlice.reducer;
