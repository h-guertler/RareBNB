import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const { closeModal } = useModal();

  useEffect(() => {
    if (username.length >= 4
      && password.length >= 6
      && email
      && firstName
      && lastName
      && confirmPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password, email, firstName, lastName, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          console.log("fetching data...")

          if (!res.ok) { //
            res.text()
              .then((resText) => {
                console.log("resText: " + resText);
              })
              .catch((error) => {
                console.error(error);
              });
            return;
          } //

          const data = await res.json();

          if (!res.ok) {
            console.log("response to str: " + Object.keys(res) + Object.values(res))
            return
          }
          // getting Uncaught (in promise) SyntaxError: JSON.parse: unexpected character at line 1 column 1 of the JSON data
          console.log("data message: " + data.message)
          console.log("keys: " + Object.keys(data) + " vals: " + Object.values(data))
          console.log("errors before: " + errors)
          if (data && data.errors) {
            setErrors(data.errors);
            console.log("errors: " + errors)
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id="signup-modal-div">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        {errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        {errors.username && <p>{errors.username}</p>}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        {errors.firstName && <p>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        {errors.lastName && <p>{errors.lastName}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        {errors.password && <p>{errors.password}</p>}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={isDisabled}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
