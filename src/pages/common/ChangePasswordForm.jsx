import React from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../service/userService";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./ChangePasswordForm.scss";
import Spinner from "../../components/Spinner";

export default function ChangePasswordForm() {
    const [inputs, setInputs] = React.useState({
        password: { value: "", isValid: true },
        confirmPassword: { value: "", isValid: true },
    });

    const [error, setError] = React.useState("");

    const [formState, setFormState] = React.useState("Idle");

    const [showPasswordContainer, setShowPasswordContainer] =
        React.useState(false);

    const dispatch = useDispatch();

    const inputChangeHandler = (e) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [e.target.name]: { value: e.target.value, isValid: true },
            };
        });
    };

    const resetPassword = async () => {
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
        // Reset password logic

        setFormState("Loading");
        await dispatch(changePassword({ newPassword: inputs.password.value }));
        setFormState("Success");
    };

    return (
        <>
            <div className="password-container">
                <div className="msg">
                    {formState === "Loading" && (
                        <Spinner small={true} className="spinner" />
                    )}
                    {formState === "Success" &&
                        "Password changed successfully!"}
                </div>
                {formState === "Idle" && (
                    <>
                        {showPasswordContainer ? (
                            <>
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
                                        onClick={resetPassword}
                                        className="action-button"
                                        label={"Reset"}
                                    />
                                    <Button
                                        className="action-button"
                                        type="secondary"
                                        label={"Cancel"}
                                        onClick={() =>
                                            setShowPasswordContainer(false)
                                        }
                                    />
                                </div>
                            </>
                        ) : (
                            <Button
                                label="Change Password"
                                type="transparent"
                                className="change-password"
                                onClick={() => setShowPasswordContainer(true)}
                            />
                        )}
                    </>
                )}
            </div>
            {error && <div className="error">{error}</div>}
        </>
    );
}
