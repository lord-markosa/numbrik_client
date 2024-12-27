let userInfo;

export const getUserInfo = () => {
    if (userInfo) {
        return userInfo;
    }

    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo;
};

export const setUserInfo = (newUserInfo) => {
    if (!newUserInfo) {
        return;
    }

    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    userInfo = newUserInfo;
};

export const incrementDiamonds = (count) => {
    userInfo.diamonds += count;
    setUserInfo(userInfo);
};
