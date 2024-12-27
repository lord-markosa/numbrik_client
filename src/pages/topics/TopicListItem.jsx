import React from "react";

import "./TopicListItem.scss";

export default function TopicListItem({ topic, onTopicClick }) {
    const { name, description, id, symbol } = topic;

    const topicClickHandler = () => onTopicClick(id);

    return (
        <div onClick={topicClickHandler} className="topic-list-item">
            <div className="left-section">
                <div className="symbol">{symbol ?? "📘"}</div>
                <div className="info">
                    <div className="name">{name}</div>
                    <div className="description">{description}</div>
                </div>
            </div>
        </div>
    );
}
