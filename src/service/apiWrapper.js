import { createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "./makeRequest";

const apiWrapper = (actionName, url, method = "get") =>
    createAsyncThunk(
        actionName,
        async (data, thunkApi) => await makeRequest(url, method, thunkApi, data)
    );

export default apiWrapper;
