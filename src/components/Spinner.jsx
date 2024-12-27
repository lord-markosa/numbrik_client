import React from "react";
import classNames from "classnames";
import "./Spinner.scss";

const Spinner = ({ small, className }) => (
    <div
        className={classNames("spinner-container", small && "small", className)}
    >
        <div className={classNames("loading-spinner", small && "small")} />
    </div>
);

export default Spinner;
