import { configureStore } from "@reduxjs/toolkit";
import auth_slice from '../reducers/auth_slice'

const mainStore = configureStore({
    reducer: auth_slice,
})

export default mainStore;