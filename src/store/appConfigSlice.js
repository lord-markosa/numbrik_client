import { createSlice } from "@reduxjs/toolkit";

const appConfigSlice = createSlice({
    name: "appConfig",
    initialState: {
        toastMessage: null,
        showToast: false,
    },
    reducers: {
        showToast: (state, action) => {
            state.toastMessage = action.payload;
            state.showToast = true;
        },
        hideToast: (state) => {
            state.toastMessage = null;
            state.showToast = false;
        },
    },

    extraReducers: (/* builder */) => {},
});

export const { showToast, hideToast } = appConfigSlice.actions;

export default appConfigSlice.reducer;
