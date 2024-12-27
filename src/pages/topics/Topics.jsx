import React from "react";
import { useNavigate } from "react-router-dom";
import TopicListItem from "./TopicListItem";
import TopicNavigationPrompt from "./TopicNavigationPrompt";
import { useDialog } from "../../hooks/useDialog";
import { useDispatch } from "react-redux";
import selectTopic from "../../actions/selectTopic";

const Topics = ({ topics, customTopicClickAction }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { dialogProps, requestDialog } = useDialog();

    const onTopicClick =
        customTopicClickAction ??
        ((topicId) =>
            selectTopic(
                topicId,
                dispatch,
                navigate,
                {
                    requestTopicNavDialog: requestDialog,
                },
                "normal"
            ));
    return (
        <>
            {topics.map((topic) => (
                <TopicListItem
                    key={topic.id}
                    topic={topic}
                    onTopicClick={onTopicClick}
                />
            ))}
            <TopicNavigationPrompt {...dialogProps} />
        </>
    );
};

export default Topics;
