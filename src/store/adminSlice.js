import { createSlice } from "@reduxjs/toolkit";
import { createQuestion, fetchUserByAlias } from "../service/adminServices";

const initialState = {
    users: [],
    creating: false,
    creationFailed: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminLoader: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByAlias.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserByAlias.fulfilled, (state, action) => {
                state.isLoading = false;
                const userExists = state.users.some(
                    (user) => user.username === action.payload.username
                );
                if (!userExists) {
                    state.users.push(action.payload);
                }
            })
            .addCase(fetchUserByAlias.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createQuestion.pending, (state) => {
                state.creating = true;
                state.creationFailed = false;
            })
            .addCase(createQuestion.fulfilled, (state) => {
                state.creating = false;
            })
            .addCase(createQuestion.rejected, (state) => {
                state.creating = false;
                state.creationFailed = true;
            });
    },
});

export const { setAdminLoader } = adminSlice.actions;

export default adminSlice.reducer;
