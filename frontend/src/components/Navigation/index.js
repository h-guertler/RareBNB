import React from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({isLoaded}) {

    const currUser = useSelector(state => state.session.user);

    let sessionLinks;

      if (currUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={currUser}/>
            </li>
        );
      } else {
        sessionLinks = (
            <li>
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
            </li>
        );
      }

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
