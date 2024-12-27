import { useNavigate } from "react-router-dom";

const useNavigateBack = (path) => {
    const navigate = useNavigate();

    const navigateBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate(path, { replace: true });
        }
    };

    return navigateBack;
};

export default useNavigateBack;
