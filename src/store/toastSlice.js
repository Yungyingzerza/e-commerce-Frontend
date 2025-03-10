import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.push(action.payload);
        },
        popToast: (state) => {
            state.shift();
        },
    },
});

export const { addToast, popToast } = toastSlice.actions;
export default toastSlice.reducer;