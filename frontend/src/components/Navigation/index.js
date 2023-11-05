import React from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import './Navigation.css';

// is there a user?
// if no... include links to log in and sign up
// if yes... include link to log out


function Navigation({isLoaded}) {

    const currUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
      };

      let sessionLinks;

      if (currUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={currUser}/>
                <button onClick={logout}>Log Out</button>
            </li>
        );
      } else {
        sessionLinks (
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
