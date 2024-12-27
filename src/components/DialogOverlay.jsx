import React from "react";
import classNames from "classnames";
import "./DialogOverlay.scss";

export default function DialogOverlay({ children, className, blurHandler }) {
    const classes = classNames("dialog", className);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("dialog-overlay")) {
            blurHandler();
        }
    };

    return (
        <div className="dialog-overlay" onClick={handleOverlayClick}>
            <div className={classes}>{children}</div>
        </div>
    );
}
