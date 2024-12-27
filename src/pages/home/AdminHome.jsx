import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Users from "../users/Users";
import Spinner from "../../components/Spinner";
import TopHeader from "../common/TopHeader";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useSearch } from "../../hooks/useSearch";
import { fetchUserByAlias } from "../../service/adminServices";
import { selectUsersForAdmin } from "../../selectors/adminSelectors";
import { selectUserData } from "../../selectors/userSelectors";

import "./AdminHome.scss";

export default function AdminHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoadingUsers, setIsLoadingUser] = React.useState(false);

    const { username } = useSelector(selectUserData);
    const users = useSelector(selectUsersForAdmin);

    const { searchQuery, searchBarProps } = useSearch([], {
        placeholder: "alias",
        className: "user-search-bar",
        shouldHideMenu: true,
    });

    const goToHome = useNavigateBack("/");

    const goToCreateQuestionPage = () => navigate("/create");

    const onSearch = async () => {
        if (
            searchQuery === "" ||
            users.some((user) => user.username === searchQuery)
        ) {
            return;
        }

        setIsLoadingUser(true);
        await dispatch(fetchUserByAlias(searchQuery));
        setIsLoadingUser(false);
    };

    return (
        <div className="admin-home">
            <TopHeader username={username} customRightButton={<></>} />
            <div className="user-ops">
                <div className="label">User operations</div>
                <SearchBar {...searchBarProps} />
                {!isLoadingUsers ? (
                    <Button
                        label="Get Users"
                        className="action-button"
                        onClick={onSearch}
                    />
                ) : (
                    <Spinner small={true} className="spinner" />
                )}
                <Users users={users} />
            </div>
            <div className="question-ops">
                <div className="label">Question operations</div>
                <div className="buttons-container">
                    <Button
                        label="Create questions"
                        className="action-button"
                        onClick={goToCreateQuestionPage}
                    />
                    <Button
                        label="Go to Home"
                        type="secondary"
                        className="action-button"
                        onClick={goToHome}
                    />
                </div>
            </div>
        </div>
    );
}
