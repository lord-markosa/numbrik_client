import React, { useState, useRef, useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import "./DropdownMenu.scss";
import Button from "./Button";

const DropdownMenu = ({ position = "left", options = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onOptionClickHandler = (option) => {
        return () => {
            setIsOpen(false);
            option.onClick();
        };
    };

    return (
        <div className="dropdown-menu-container" ref={menuRef}>
            <Button type="transparent" onClick={toggleMenu}>
                <IoMdMore size={20} />
            </Button>
            {isOpen && (
                <div className={`menu-options ${position}`}>
                    {options.map((option, index) => (
                        <Button
                            type="secondary"
                            key={index}
                            onClick={onOptionClickHandler(option)}
                            className="menu-option"
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
