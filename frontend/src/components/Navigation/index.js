import React from "react";
// import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import './Navigation.css';
import { useHistory } from "react-router-dom";

function Navigation({isLoaded}) {
    const currUser = useSelector(state => state.session.user);

    const history = useHistory();
    const navigateToHome = () => {
        return history.push("/");
    }

    // <i className="fas fa-building"/>

    return (
        <div id="nav">
        <button
            id="logo-home-button"
            className="clickable"
            onClick={navigateToHome}
            >
        </button>
        <>
            { // <li>
                // <NavLink exact to="/">Home</NavLink>
            // </li>
             }
            {isLoaded && (
                <div id="profile-button">
                    <ProfileButton user={currUser}/>
                </div>
            )}
        </>
        </div>
    );
}

export default Navigation;
