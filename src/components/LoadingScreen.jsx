import React from "react";
import "./LoadingScreen.scss";
import Spinner from "./Spinner";

const LoadingScreen = ({ msg }) => (
    <div className="loading-screen-overlay">
        <Spinner />
        <div className="loadingMessage">{msg ?? "Just do it..."}</div>
    </div>
);

export default LoadingScreen;
