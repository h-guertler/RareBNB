import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const handleCredential = (e) => setCredential(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        return dispatch(sessionActions.login({ credential, password})).catch(
            async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    if (sessionUser) return (<Redirect to="/" />);


    return (
        <section>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                    type="text"
                    value={credential}
                    onChange={handleCredential}
                    required
                    />
                </label>
                <label>
                    <input
                    type="text"
                    value={password}
                    onChange={handlePassword}
                    required
                    />
                </label>
                {errors.credential && <p>{errors.credential}</p>}
                {errors.password && <p>{errors.password}</p>}
                <button type="submit">Log In</button>
            </form>
        </section>
    )
}

export default LoginFormPage;
