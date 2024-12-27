import React from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../pages/home/Home";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import AdminHome from "../pages/home/AdminHome";
import CreateQuestion from "../pages/question/CreateQuestion";
import SolveQuestions from "../pages/question/SolveQuestions";
import ReviewQuestion from "../pages/question/ReviewQuestions";
import UserProgress from "../pages/users/UserProgress";
import UserResponses from "../pages/users/UserResponses";
import loadQuestions from "../utils/questionUtils/loadQuestions";
import { setUser } from "../store/userSlice";
import { getUserInfo } from "../utils/usersUtils/userInfo";

const AllRoutes = () => {
    const dispatch = useDispatch();

    const router = createBrowserRouter([
        {
            loader: () => {
                dispatch(setUser(getUserInfo()));
                return null;
            },
            children: [
                {
                    element: <AuthRoutes />,
                    children: [
                        {
                            path: "login",
                            element: <Login />,
                        },
                        {
                            path: "register",
                            element: <Register />,
                        },
                    ],
                },
                {
                    element: <ProtectedRoutes />,
                    children: [
                        {
                            path: "*",
                            element: <Home />,
                        },
                        {
                            loader: ({ params }) => {
                                const { topicId } = params;
                                loadQuestions(topicId, dispatch, "solve");
                                return null;
                            },
                            element: <SolveQuestions />,
                            path: "solve/:topicId",
                        },
                        {
                            loader: ({ params }) => {
                                const { topicId } = params;
                                loadQuestions(topicId, dispatch, "review");
                                return null;
                            },
                            element: <ReviewQuestion />,
                            path: "review/:topicId",
                        },
                    ],
                },
                {
                    element: <AdminRoutes />,
                    children: [
                        {
                            path: "admin-home",
                            element: <AdminHome />,
                        },
                        {
                            element: <CreateQuestion />,
                            path: "create",
                        },
                        {
                            element: <UserProgress />,
                            path: "user-progress",
                        },
                        {
                            loader: ({ params }) => {
                                const { topicId } = params;
                                loadQuestions(topicId, dispatch, "for-admin");
                                return null;
                            },
                            element: <UserResponses />,
                            path: "user-progress/:topicId",
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AllRoutes;
