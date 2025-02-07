import { createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "./makeRequest";
import { getAdminToken } from "../utils/usersUtils/adminInfo";

const getAdminHeader = () => ({
    "x-admin-token": `Bearer ${getAdminToken()}`,
});

export const fetchUserByAlias = createAsyncThunk(
    "admin/fetchUserByAlias",
    async (alias, thunkApi) =>
        makeRequest(
            "/api/admin/get-user",
            "post",
            thunkApi,
            { username: alias },
            getAdminHeader()
        )
);

export const fetchQuestionsForAdmin = createAsyncThunk(
    "admin/fetchQuestionsForAdmin",
    async ({ startIdx, topicId }, thunkApi) =>
        makeRequest(
            `/api/admin/get-questions/${topicId}?startIndex=${startIdx ?? 0}`,
            "get",
            thunkApi,
            null,
            getAdminHeader()
        )
);

export const createQuestion = createAsyncThunk(
    "admin/createQuestion",
    async (questions, thunkApi) =>
        makeRequest(
            `/api/admin/create-question`,
            "post",
            thunkApi,
            { questions },
            getAdminHeader()
        )
);

export const generateQuestion = createAsyncThunk(
    "admin/generateQuestion",
    async (prompt, thunkApi) =>
        makeRequest(
            `/api/admin/generate-questions`,
            "post",
            thunkApi,
            { prompt },
            getAdminHeader()
        )
);
