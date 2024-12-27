import axios from "axios";
import { showToast } from "../store/appConfigSlice";
import config from "../config";
import { getUserInfo } from "../utils/usersUtils/userInfo";

const makeRequest = async (
    url,
    method,
    { dispatch, rejectWithValue },
    data,
    headers
) => {
    const token = getUserInfo()?.token;
    try {
        const response = await axios({
            method,
            url: `${config.apiUrl}${url}`,
            data,
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers,
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "An error occurred";
        dispatch(showToast(errorMessage));
        return rejectWithValue(errorMessage);
    }
};

export default makeRequest;
