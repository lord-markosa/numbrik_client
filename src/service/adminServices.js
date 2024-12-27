import { createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "./makeRequest";
import { getAdminToken } from "../utils/usersUtils/adminInfo";

const adminHeader = {
    "x-admin-token": `Bearer ${getAdminToken()}`,
};

export const fetchUserByAlias = createAsyncThunk(
    "admin/fetchUserByAlias",
    async (alias, thunkApi) =>
        makeRequest(
            "/api/admin/get-user",
            "post",
            thunkApi,
            { username: alias },
            adminHeader
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
            adminHeader
        )
);

export const createQuestion = createAsyncThunk(
    "admin/createQuestion",
    async (question, thunkApi) =>
        makeRequest(
            `/api/admin/create-question`,
            "post",
            thunkApi,
            question,
            adminHeader
        )
);
