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

    return (
        <div id="nav">
        <button
            id="logo-home-button"
            onClick={navigateToHome}
            >
                <i className="fas fa-building"/>
            </button>
        <ul>
            { // <li>
                // <NavLink exact to="/">Home</NavLink>
            // </li>
             }
            {isLoaded && (
                <li id="profile-button">
                    <ProfileButton user={currUser}/>
                </li>
            )}
        </ul>
        </div>
    );
}

// find a sandwich icon for the menu
// this will be grouped in a div with profilebutton component
// they will then have a border, black, 1px, rounded edges around them
//

export default Navigation;
