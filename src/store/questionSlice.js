import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSolvedQuestions,
    fetchQuestions,
} from "../service/questionService";
import { fetchQuestionsForAdmin } from "../service/adminServices";

const questionSlice = createSlice({
    name: "question",
    initialState: {
        topicId: null,
        questions: [],
        loading: false,
        error: null,
        responses: null,
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setResponses: (state, action) => {
            state.responses = action.payload;
        },
    },
    extraReducers: (builder) => {
        [fetchQuestions].forEach((api) => {
            builder
                .addCase(api.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(api.fulfilled, (state, action) => {
                    state.questions = action.payload;
                    state.loading = false;
                })
                .addCase(api.rejected, (state, action) => {
                    state.loading = false;
                    state.questions = [];
                    state.error = action.error.message;
                });
        });

        builder
            .addCase(fetchSolvedQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.questions = [];
            })
            .addCase(fetchSolvedQuestions.fulfilled, (state, action) => {
                state.questions = action.payload.questions;
                state.responses = action.payload.responses;
                state.loading = false;
            })
            .addCase(fetchSolvedQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchQuestionsForAdmin.pending, (state, action) => {
                state.loading = true;
                if (action.meta.arg.topicId !== state.topicId) {
                    state.topicId = action.meta.arg.topicId;
                    state.questions = [];
                }
            })
            .addCase(fetchQuestionsForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.questions.push(...action.payload);
            })
            .addCase(fetchQuestionsForAdmin.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setQuestions, setLoading, setResponses } = questionSlice.actions;

export default questionSlice.reducer;
