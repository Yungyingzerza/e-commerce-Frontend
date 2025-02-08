import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    email: "",
    picture_url: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPictureUrl: (state, action) => {
            state.picture_url = action.payload;
        }
    },
});

export const { setId, setEmail, setPictureUrl } = userSlice.actions;
export default userSlice.reducer;