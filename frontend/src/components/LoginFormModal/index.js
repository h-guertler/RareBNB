import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data.message === "Invalid credentials") {
          setErrors({credential: "The provided credentials were invalid"});
        }

        else if (data && data.errors) { // added else
          setErrors(data.errors);
        }
      });
  };

  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) setIsDisabled(false);

    return;
  }, [credential, password]);

  const demoLogin = () => {
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
      .then(closeModal);
  }

  return (
    <div className="login-modal-div">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        {}
        <button type="submit" disabled={isDisabled}>Log In</button>
      </form>
      <button onClick={demoLogin}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
