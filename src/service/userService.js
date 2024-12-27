import apiWrapper from "./apiWrapper";

export const loginUser = apiWrapper(
    "user/loginUser",
    "/api/user/login",
    "post"
);
export const registerUser = apiWrapper(
    "user/registerUser",
    "/api/user/register",
    "post"
);

export const changePassword = apiWrapper(
    "user/changePassword",
    "/api/user/resetPass",
    "post"
);
