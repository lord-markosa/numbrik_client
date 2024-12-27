import React from "react";
import classNames from "classnames";
import "./Button.scss";

export default function Button({
    type = "primary",
    children,
    className,
    label,
    ...props
}) {
    // type: 'primary' | 'secondary' | 'transparent'

    const classes = classNames("btn", `btn-${type}`, className);

    return (
        <button className={classes} {...props}>
            {label ?? children}
        </button>
    );
}
