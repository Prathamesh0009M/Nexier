import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload; // Corrected to use action.payload
        },
        setToken(state, action) {
            state.token = action.payload; // Add setToken reducer to store token
        },
    },
});

export const { setUser, setToken } = profileSlice.actions;
export default profileSlice.reducer;
