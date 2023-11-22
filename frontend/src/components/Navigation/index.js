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

    const navigateToCreateSpot = () => {
        return history.push("/spots/new");
    }

    return (
        <div id="nav">
        <button
            id="logo-home-button"
            className="clickable"
            onClick={navigateToHome}
            >
        </button>
        <>

        </>
        <>
            {isLoaded && (
                <div className="create-new-spot-profile-button">
                    {currUser && (
                        <div>
                            <button
                            id="create-spot-button"
                            className="clickable"
                            onClick={navigateToCreateSpot}
                            >Create a New Spot</button>
                        </div>
                    )}
                    <div id="profile-button">
                        <ProfileButton user={currUser}/>
                    </div>
                </div>
            )}
        </>
        </div>
    );
}

export default Navigation;
