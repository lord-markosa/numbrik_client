import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import questionSlice from "./questionSlice";
import appConfigSlice from "./appConfigSlice";
import adminSlice from "./adminSlice";
import customMiddlewares from "../middleware/customMiddlewares";

export const store = configureStore({
    reducer: {
        user: userSlice,
        question: questionSlice,
        appConfig: appConfigSlice,
        admin: adminSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(customMiddlewares),
});

export default store;
