import React from "react";
import Persona from "../../components/Persona";
import { IoDiamondOutline } from "react-icons/io5";
import { getFormattedDate } from "../../utils/getFormattedTime";

import "./TopHeader.scss";

const TopHeader = ({
    username,
    diamonds,
    personaClickHandler,
    customRightButton,
    shouldShowDate = true,
    title,
}) => {
    const currentTime = getFormattedDate(Date.now());

    return (
        <div className="top-header">
            <Persona
                title={username}
                onClick={personaClickHandler}
                subtitle={shouldShowDate && currentTime}
                className={"persona"}
            />
            {title && <div className="title">{"{" + title + "}"}</div>}
            <div className="right-section">
                {customRightButton || (
                    <div className="diamonds">
                        <IoDiamondOutline className="diamond-icon" />
                        {diamonds}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopHeader;
