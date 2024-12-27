import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../service/userService";
import { sendResponses } from "../service/questionService";

const initialState = {
    username: null,
    token: null,
    diamonds: 10,
    status: "idle",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload === null) {
                return;
            }

            state.username = action.payload.username;
            state.token = action.payload.token;
            state.diamonds = action.payload.diamonds;
        },

        clearUser: (state) => {
            state.username = null;
            state.token = null;
        },

        addDiamonds: (state, action) => {
            state.diamonds += action.payload;
        },
    },
    extraReducers: (builder) => {
        [loginUser, registerUser].forEach((apiCall) => {
            builder
                .addCase(apiCall.pending, (state) => {
                    state.status = "loading";
                })
                .addCase(apiCall.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.username = action.payload.username;
                    state.token = action.payload.token;
                    state.diamonds = action.payload.diamonds;
                })
                .addCase(apiCall.rejected, (state) => {
                    state.status = "failed";
                });
        });
        builder.addCase(sendResponses.fulfilled, (state, action) => {
            state.diamonds += action.meta.arg.correctCount;
        });
    },
});

export const { setUser, clearUser, addDiamonds } = userSlice.actions;

export default userSlice.reducer;
