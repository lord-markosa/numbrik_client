import classNames from "classnames";
import React from "react";
import "./Input.scss";

export default function Input({ label, className, isInvalid, ...props }) {
    const classes = classNames("input-box", className, {
        "input-error": isInvalid,
    });

    return (
        <>
            {label && <label className="label">{label}</label>}
            <input className={classes} {...props} />
        </>
    );
}
