import { createSlice } from "@reduxjs/toolkit";
import loading from "daisyui/components/loading";

const initialState = {
    id: "",
    name: "",
    surname: "",
    email: "",
    balance: 0,
    level: 1,
    profile_url: "",
    loading: true,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setSurname: (state, action) => {
            state.surname = action.payload;
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setProfileUrl: (state, action) => {
            state.profile_url = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

    },
});

export const { setId, setName, setSurname, setBalance, setEmail, setLevel, setProfileUrl, setLoading } = userSlice.actions;
export default userSlice.reducer;