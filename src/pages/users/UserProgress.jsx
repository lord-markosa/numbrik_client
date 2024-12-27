import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Topics from "../topics/Topics";
import SearchBar from "../../components/SearchBar";
import topicsData from "../../constants/topics.json";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import TopHeader from "../common/TopHeader";
import selectTopic from "../../actions/selectTopic";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useSearch } from "../../hooks/useSearch";

import "./UserProgress.scss";

export default function UserProgress() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const navigateToAdminHome = useNavigateBack("/admin-home");

    const user = location.state;

    const backButton = (type) => (
        <Button label="Back" onClick={navigateToAdminHome} type={type} />
    );

    if (!user) {
        return (
            <EmptyState
                message={"User not found"}
                customElements={backButton()}
            />
        );
    }

    const username = user.username;
    const progressInfo = user.progressInfo;

    // incorporate this into a search hook
    const { items: topics, searchBarProps } = useSearch(
        topicsData.filter((topic) => progressInfo[topic.id])
    );

    // refactor this and incorporate it into the Topics
    const onTopicClick = (topicId) =>
        selectTopic(
            topicId,
            dispatch,
            navigate,
            { progressInfo },
            "user-response"
        );

    return (
        <div className="users-progress-page">
            <TopHeader
                username={username}
                diamonds={10}
                customRightButton={backButton("transparent")}
                title={"User Progress"}
                shouldShowDate={false}
                disablePersonaClick={true}
            />
            <SearchBar {...searchBarProps} />
            <Topics topics={topics} customTopicClickAction={onTopicClick} />
        </div>
    );
}
