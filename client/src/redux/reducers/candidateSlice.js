// Inside candidateSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    candidates: [],
    qualifications: [], // Add qualifications array
    isLoading: false,
    error: null,
};

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
            state.qualifications.push(action.payload); // Add qualifications
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
export const { startLoading, addCandidate, addQualification, updateCandidate, setError, resetCandidates } = candidateSlice.actions;
export default candidateSlice.reducer;