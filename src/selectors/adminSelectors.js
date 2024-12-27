import { createSelector } from "@reduxjs/toolkit";

export const selectUsersForAdmin = createSelector(
    (state) => state.admin,
    (admin) => admin.users
);

export const questionCreationStatus = createSelector(
    (state) => state.admin,
    (admin) => ({
        creating: admin.creating,
        creationFailed: admin.creationFailed,
    })
);
