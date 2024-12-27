import React from "react";
import classNames from "classnames";

import "./TextArea.scss";

const TextArea = ({
    minRows = 1,
    maxRows = 3,
    value,
    setValue,
    className,
    ...props
}) => {
    const textareaRef = React.useRef(null);
    const classes = classNames("text-area", className);

    const handleChange = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // matched with the CSS line-height
        const textareaLineHeight = 20;

        textarea.rows = minRows;
        const currentRows = Math.floor(
            textarea.scrollHeight / textareaLineHeight
        );

        if (currentRows >= maxRows) {
            textarea.rows = maxRows;
            textarea.scrollTop = textarea.scrollHeight;
        } else {
            textarea.rows = currentRows;
        }
        setValue(textarea.value);
    };

    return (
        <textarea
            ref={textareaRef}
            rows={minRows}
            className={classes}
            value={value}
            onChange={handleChange}
            {...props}
        />
    );
};

export default TextArea;
