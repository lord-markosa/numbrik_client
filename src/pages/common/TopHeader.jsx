import React from "react";
import Persona from "../../components/Persona";
import { IoDiamondOutline } from "react-icons/io5";
import { getFormattedDate } from "../../utils/getFormattedTime";

import "./TopHeader.scss";
import PersonaCard from "./PersonaCard";

const TopHeader = ({
    username,
    diamonds,
    customRightButton,
    title,
    shouldShowDate = true,
    disablePersonaClick,
}) => {
    const [showPersona, setShowPersona] = React.useState(false);

    const currentTime = getFormattedDate(Date.now());

    const getPersonaClickHandler = () => {
        if (disablePersonaClick) return undefined;
        return () => setShowPersona(true);
    };

    return (
        <>
            <div className="top-header">
                <Persona
                    title={username}
                    onClick={getPersonaClickHandler()}
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
            {showPersona && (
                <PersonaCard
                    closePersona={() => setShowPersona(false)}
                    username={username}
                />
            )}
        </>
    );
};

export default TopHeader;
