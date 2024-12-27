import { createSelector } from "@reduxjs/toolkit";

export const selectUserStatus = createSelector(
    (state) => state.user,
    (user) => user.status
);

export const selectUserToken = createSelector(
    (state) => state.user,
    (user) => user.token
);

export const selectUserData = createSelector(
    (state) => state.user,
    (user) => ({
        username: user.username,
        diamonds: user.diamonds,
    })
);

// need to refactored wherever multiple selects are being used
