import React from "react";
import { useSelector } from "react-redux";
import Topics from "../topics/Topics";
import SearchBar from "../../components/SearchBar";
import topicsData from "../../constants/topics.json";
import TopHeader from "../common/TopHeader";
import PersonaCard from "../common/PersonaCard";
import { useSearch } from "../../hooks/useSearch";
import { selectUserData } from "../../selectors/userSelectors";

import "./Home.scss";

const Home = () => {
    const [showPersona, setShowPersona] = React.useState(false);

    const { username, diamonds } = useSelector(selectUserData);

    // incorporate this into a search hook
    const { items: topics, searchBarProps } = useSearch(topicsData);

    return (
        <div className="home-page">
            <TopHeader
                username={username}
                diamonds={diamonds}
                personaClickHandler={() => setShowPersona(true)}
            />
            <SearchBar {...searchBarProps} />
            <Topics topics={topics} />
            {showPersona && (
                <PersonaCard
                    closePersona={() => setShowPersona(false)}
                    username={username}
                />
            )}
        </div>
    );
};

export default Home;
