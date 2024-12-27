import React from "react";
import DialogOverlay from "../../components/DialogOverlay";
import Button from "../../components/Button";
import "./TopicNavigationPrompt.scss";

const TopicNavigationPrompt = ({
    isOpen,
    primaryButtonHandler,
    secondaryButtonHandler,
    blurHandler,
}) =>
    isOpen && (
        <DialogOverlay className="dialog-props" blurHandler={blurHandler}>
            <div className="dialog-message">
                Do you want to solve new questions or review previous questions?
            </div>
            <Button
                label="Solve New Questions"
                onClick={primaryButtonHandler}
                className="button"
            />
            <Button
                label="Review Previous Questions"
                onClick={secondaryButtonHandler}
                type="secondary"
                className="button second"
            />
        </DialogOverlay>
    );

export default TopicNavigationPrompt;
