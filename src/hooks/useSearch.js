import React from "react";

export const useSearch = (rawItems, props) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [items, setTopics] = React.useState(rawItems);

    React.useEffect(() => {
        setTopics(
            rawItems.filter((item) =>
                Object.values(item)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery]);

    return {
        items,
        searchQuery,
        reset: () => setSearchQuery(""),
        searchBarProps: {
            items,
            searchQuery,
            setSearchQuery,
            ...props,
        },
    };
};
