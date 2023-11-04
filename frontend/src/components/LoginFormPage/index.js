import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    const handleCredential = e => setCredential(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    useEffect(() => {
        const currErrors = {};

        // why is submit not disabled?
        if (credential.length < 4) {
            currErrors.credential = "Username or email should contain 4 or more characters.";
        }
        if (password.length < 6) {
            currErrors.password = "Password should contain 6 or more characters.";
        }

        setErrors(currErrors);

        if (Object.keys(currErrors).length === 0) setIsValid(true);
    }, [credential, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValid) {
            setErrors({});

            return await dispatch(sessionActions.login({ credential, password })).catch(
                async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                }
            );
        }
    }

    if (currentUser) return <Redirect to="/"/>

    return (
        <section>
            <h1>Log In</h1>
            <form
            onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                    value={credential}
                    onChange={handleCredential}
                    required
                    />
                </label>
                <label>
                    Password
                    <input
                    value={password}
                    type="password"
                    onChange={handlePassword}
                    required
                    />
                </label>
                {errors.credential && <p>{errors.credential}</p>}
                {errors.password && <p>{errors.password}</p>}
                <button
                type="submit"
                disabled={!isValid}
                >Log In</button>
            </form>
        </section>
    )
};

export default LoginFormPage;
