import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import UsersSpotsGrid from "./UsersSpotsGrid";
// import "./UsersSpotsGrid.css";


function ManageSpots() {
    const dispatch = useDispatch();
    const currentUsersSpots = useSelector(state => state.spots.currentUsersSpots);

    const [spotsArray, setSpotsArray] = useState([]);

    useEffect(() => {
        dispatch(spotsActions.fetchUsersSpots());
    }, [dispatch]);

    // useEffect(() => {
    //     if (currentUsersSpots) {
    //         setSpotsArray(currentUsersSpots.Spots);
    //     }
    // }, [currentUsersSpots]);

    const handleUsersSpotsChange = async () => {
        dispatch(spotsActions.fetchUsersSpots());
    }

    if (!currentUsersSpots) {
        return (
            <h1>Loading your spots...</h1>
        );
     }
     else {
        const spotsPlaceholder = currentUsersSpots.Spots;
        return (
            //
            spotsPlaceholder.length >= 1 ? (
                <div className="manage-spots">
                    <UsersSpotsGrid usersSpots={currentUsersSpots.Spots}/>
                </div>
            ) : (
                <NavLink to="/spots/new">Create a New Spot</NavLink>
            )

        )
    }
}

export default ManageSpots;
