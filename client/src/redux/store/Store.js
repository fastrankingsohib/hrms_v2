import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../reducers/auth_slice'

const mainStore = configureStore({
    reducer: authSlice,
})

export default mainStore;