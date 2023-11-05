import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleFirstName = e => setFirstName(e.target.value);
    const handleLastName = e => setLastName(e.target.value);
    const handleEmail = e => setEmail(e.target.value);
    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value);
    const handleConfirmPassword = e => setConfirmPassword(e.target.value);

    if (currentUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors({});

      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }

    return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input
                    type="text"
                    value={firstName}
                    onChange={handleFirstName}
                    required
                    />
                </label>
                <label>
                    Last Name
                    <input
                    type="text"
                    value={lastName}
                    onChange={handleLastName}
                    required
                    />
                </label>
                <label>
                    Email
                    <input
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    required
                    />
                </label>
                <label>
                    Username
                    <input
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    required
                    />
                </label>
                <label>
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    required
                    />
                </label>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button
                type="submit"
                disabled={username.length < 4 || password.length < 6}
                >Sign Up</button>
            </form>
        </>
    )
}

export default SignupFormPage;

// display any errors from the think
