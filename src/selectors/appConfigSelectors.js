import { createSelector } from "@reduxjs/toolkit";

export const selectToastData = createSelector(
    (state) => state.appConfig,
    (appConfig) => ({
        message: appConfig.toastMessage,
        show: appConfig.showToast,
    })
);
