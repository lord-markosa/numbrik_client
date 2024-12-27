import React from "react";
import Button from "./Button";
import DialogOverlay from "./DialogOverlay";
import "./ConfirmationDialog.scss";

const ConfirmationDialog = ({
    isOpen,
    prompt,
    primaryButtonHandler,
    secondaryButtonHandler,
    blurHandler,
}) =>
    isOpen && (
        <DialogOverlay
            className="confirmation-dialog"
            blurHandler={blurHandler}
        >
            <div className="confirmation-dialog-message">{prompt}</div>
            <div className="confirmation-dialog-actions">
                <Button onClick={primaryButtonHandler} label="Confirm" />
                <Button
                    type="secondary"
                    onClick={secondaryButtonHandler}
                    label="Cancel"
                />
            </div>
        </DialogOverlay>
    );

export default ConfirmationDialog;
