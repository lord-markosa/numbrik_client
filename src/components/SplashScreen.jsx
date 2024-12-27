import React, { useEffect, useState } from "react";
import "./SplashScreen.scss"; // Import the CSS file for styling

const SplashScreen = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2500); // Hide after 2.5 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="splash-screen">
            <div className="progress-bar">
                <div className="progress"></div>
            </div>
        </div>
    );
};

export default SplashScreen;
