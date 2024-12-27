import React from "react";
import { useSelector } from "react-redux";
import Topics from "../topics/Topics";
import SearchBar from "../../components/SearchBar";
import topicsData from "../../constants/topics.json";
import TopHeader from "../common/TopHeader";
import { useSearch } from "../../hooks/useSearch";
import { selectUserData } from "../../selectors/userSelectors";

import "./Home.scss";

const Home = () => {
    const { username, diamonds } = useSelector(selectUserData);

    // incorporate this into a search hook
    const { items: topics, searchBarProps } = useSearch(topicsData);

    return (
        <div className="home-page">
            <TopHeader username={username} diamonds={diamonds} />
            <SearchBar {...searchBarProps} />
            <Topics topics={topics} />
        </div>
    );
};

export default Home;
