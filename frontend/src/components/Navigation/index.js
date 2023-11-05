import React from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
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
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
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
};

export default Navigation;
