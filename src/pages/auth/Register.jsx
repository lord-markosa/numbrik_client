import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { registerUser } from "../../service/userService";
import { selectUserStatus } from "../../selectors/userSelectors";
import Button from "../../components/Button";
import Input from "../../components/Input";

import "./Auth.scss";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = React.useState({
        username: { value: "", isValid: true },
        password: { value: "", isValid: true },
        confirmPassword: { value: "", isValid: true },
    });

    const [error, setError] = React.useState("");

    const inputChangeHandler = (e) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [e.target.name]: { value: e.target.value, isValid: true },
            };
        });
    };

    const userStatus = useSelector(selectUserStatus);
    const isLoading = userStatus === "loading";

    const handleRegister = async (e) => {
        e.preventDefault();
        if (inputs.username.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                username: { value: "", isValid: false },
            }));
            setError("Username cannot be empty!");
            return;
        }
        if (inputs.password.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                password: { value: "", isValid: false },
            }));
            setError("Password cannot be empty!");
            return;
        }
        if (inputs.password.value !== inputs.confirmPassword.value) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                password: { value: inputs.password.value, isValid: false },
                confirmPassword: { value: "", isValid: false },
            }));
            setError("Passwords do not match!");
            return;
        }

        await dispatch(
            registerUser({
                username: inputs.username.value,
                password: inputs.password.value,
            })
        );

        if (userStatus === "succeeded") {
            navigate("/home", { replace: true });
        }
    };

    const goToLogin = () => {
        navigate("/login", { replace: true });
    };

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <div className="auth-page">
            <div className="welcome-title">Register now!</div>

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

            <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={inputs.confirmPassword.value}
                onChange={inputChangeHandler}
                isInvalid={!inputs.confirmPassword.isValid}
            />

            <div className="buttons-container">
                <Button
                    className="user-sign-button"
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    {"Let's Begin"}
                </Button>
            </div>

            <div className="register-text">
                {"Already a user? "}
                <Button onClick={goToLogin} type="transparent" label="Login" />
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Register;
