import React, { useEffect } from "react";

const MathJaxComponent = ({ mathExpression }) => {
    useEffect(() => {
        window.MathJax.typeset();
    }, [mathExpression]);

    return <>{mathExpression}</>;
};

export default MathJaxComponent;
