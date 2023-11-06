import React from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import './Navigation.css';

function Navigation({isLoaded}) {
    const currUser = useSelector(state => state.session.user);

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={currUser}/>
                </li>
            )}
        </ul>
    );
}

export default Navigation;
