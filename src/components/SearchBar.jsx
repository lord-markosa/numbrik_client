import React from "react";
import { IoSearch } from "react-icons/io5";
import Input from "./Input";
import classNames from "classnames";
import "./SearchBar.scss";

const SearchBar = ({
    items,
    searchQuery,
    setSearchQuery,
    className,
    placeholder,
    shouldHideMenu = false,
}) => {
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [isFocused, setIsFocused] = React.useState(false);
    const dropdownRef = React.useRef(null);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setHighlightedIndex(-1);
    };

    const classes = classNames("search-bar", className);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prevIndex) =>
                prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            setSearchQuery(items[highlightedIndex].name);
        }
    };

    const onBlurHandler = (e) => {
        setTimeout(() => {
            setIsFocused(false);
            setHighlightedIndex(-1);
        }, 250);
    };

    const onItemClick = (item) => {
        setSearchQuery(item.name);
    };

    return (
        <div className={classes}>
            <Input
                type="text"
                placeholder={placeholder || "Search..."}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="search-input"
                onFocus={() => setIsFocused(true)}
                onBlur={onBlurHandler}
            />
            <IoSearch className="search-icon" />
            {!shouldHideMenu && isFocused && searchQuery !== items[0]?.name && (
                <div className="dropdown-menu" ref={dropdownRef}>
                    {items.map((item, idx) => (
                        <div
                            className={`dropdown-menu-item ${
                                highlightedIndex === idx ? "highlighted" : ""
                            }`}
                            key={item.id}
                            onClick={() => onItemClick(item)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
