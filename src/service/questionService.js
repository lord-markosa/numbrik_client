import { createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "./makeRequest";

export const fetchQuestions = createAsyncThunk(
    "question/getQuestion",
    async (topicId, thunkApi) =>
        makeRequest(`/api/question/${topicId}`, "get", thunkApi)
);

export const sendResponses = createAsyncThunk(
    "question/sendResponses",
    async ({ responses, solvedCount, correctCount, topicId }, thunkApi) =>
        makeRequest(`/api/question/response/${topicId}`, "post", thunkApi, {
            responses,
            solvedCount,
            correctCount,
        })
);

export const fetchSolvedQuestions = createAsyncThunk(
    "question/fetchSolvedQuestions",
    async (topicId, thunkApi) =>
        makeRequest(`/api/question/review/${topicId}`, "get", thunkApi)
);

// DISABLED
// export const getAllQuestion = createAsyncThunk(
//     "question/getAllQuestion",
//     async (_, thunkApi) => makeRequest(`/api/question/`, "get", thunkApi)
// );
