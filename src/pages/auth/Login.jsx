import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { loginUser } from "../../service/userService";
import { selectUserStatus } from "../../selectors/userSelectors";
import Input from "../../components/Input";
import Button from "../../components/Button";

import "./Auth.scss";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = React.useState({
        username: { value: "", isValid: true },
        password: { value: "", isValid: true },
    });

    const [error, setError] = React.useState("");

    const inputChangeHandler = (e) => {
        setInputs((currentInputs) => ({
            ...currentInputs,
            [e.target.name]: { value: e.target.value, isValid: true },
        }));
    };

    const userStatus = useSelector(selectUserStatus);
    const isLoading = userStatus === "loading";

    const handleLogin = async (e) => {
        e.preventDefault();
        if (inputs.username.value.length == 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                username: { value: "", isValid: false },
            }));
            setError("Username is required");
            return;
        }
        if (inputs.password.value.length == 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                password: { value: "", isValid: false },
            }));
            setError("Password is required");
            return;
        }

        await dispatch(
            loginUser({
                username: inputs.username.value,
                password: inputs.password.value,
            })
        );

        if (userStatus === "succeeded") {
            navigate("/home", { replace: true });
        }
    };

    const goToRegister = () => {
        navigate("/register", { replace: true });
    };

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <div className="auth-page">
            <div className="welcome-title">Welcome Back!</div>

            <Input
                name="username"
                type="text"
                placeholder="Username"
                value={inputs.username.value}
                onChange={inputChangeHandler}
                isInvalid={!inputs.username.isValid}
            />

            <Input
                name="password"
                type="password"
                placeholder="Password"
                value={inputs.password.value}
                onChange={inputChangeHandler}
                isInvalid={!inputs.password.isValid}
            />

            <div className="buttonsContainer">
                <Button
                    className="user-sign-button"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {"Let's Begin"}
                </Button>
            </div>

            <div className="register-text">
                {"New here? "}
                <Button
                    type="transparent"
                    onClick={goToRegister}
                    label="Register"
                />
                {" to begin"}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Login;
