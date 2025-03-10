import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import  toastSlice  from "./toastSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice,
    },
});