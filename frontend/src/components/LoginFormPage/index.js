import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    if (currentUser) return <Redirect to="/"/>

    const handleCredential = e => setCredential(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        // may need to update if only displaying 1 err at a time
        if (credential.length < 4) {
            setErrors({credential: "Username or email should contain 4 or more characters."});
        }
        if (password.length < 6) {
            setErrors({password: "Password should contain 6 or more characters."});
        }



        if (Object.keys(errors).length === 0) {
            return dispatch(sessionActions.login({ credential, password })).catch(
                async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                }
            );
        }
    }

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
                disabled={Object.values(errors).length > 0}
                >Log In</button>
            </form>
        </section>
    )
};

export default LoginFormPage;
