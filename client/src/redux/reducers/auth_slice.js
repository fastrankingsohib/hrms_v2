import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_auth: {
        logged_in: false,
        user_type: "super_admin",
        login_timestamp: null
    }
};


const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user_auth.logged_in = true;
            state.user_auth.user_type = "super_admin";
        } 
    }
})

// Export the actions generated by createSlice
export const { userLoggedIn } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;