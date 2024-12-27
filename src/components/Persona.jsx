import React from "react";
import classNames from "classnames";
import { IoPersonCircle } from "react-icons/io5";

import "./Persona.scss";

export default function Persona({ title, subtitle, onClick, className }) {
    const _title = title ?? "Harry Potter";
    const classes = classNames("persona", onClick && "actionable", className);

    return (
        <div className={classes} onClick={onClick}>
            <IoPersonCircle className="persona-icon" />
            <div className="persona-info">
                <div className="persona-title">{_title}</div>
                {subtitle && <div className="persona-subtitle">{subtitle}</div>}
            </div>
        </div>
    );
}
