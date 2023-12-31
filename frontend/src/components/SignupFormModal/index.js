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
          if (!res.ok) { //
            let jsonRes = await res.json();

            let errorMessage = jsonRes.error.errors[0].message;
            let errorOriginField = jsonRes.error.errors[0].path;

            if (errorMessage) return setErrors({[errorOriginField]: errorMessage});

            // res.text()
            //   .then((resText) => {
            //     console.log("resText from not ok: " + resText);
            //     const jsonResText = resText.json();
            //     console.log("jsonResText: " + jsonResText)
            //   })
            //   .catch((error) => {
            //     console.error("error from not ok: " + error);
            //   });
            return;
          } //

          const data = await res.json();

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
        {errors.email && <p>{errors.email}</p>}
        {errors.username && <p>{errors.username}</p>}
        {errors.firstName && <p>{errors.firstName}</p>}
        {errors.lastName && <p>{errors.lastName}</p>}
        {errors.password && <p>{errors.password}</p>}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

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
        <button type="submit" disabled={isDisabled} className={`signup-button ${isDisabled.toString()}`}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
