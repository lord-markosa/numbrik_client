import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../store/appConfigSlice";
import { selectToastData } from "../selectors/appConfigSelectors";

import "./Toast.scss";

const Toast = () => {
    const dispatch = useDispatch();

    const { message, show } = useSelector(selectToastData);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, dispatch]);

    if (!show) return null;
    return <div className="toast">{message}</div>;
};

export default Toast;
