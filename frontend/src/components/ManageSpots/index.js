import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import UsersSpotsGrid from "./UsersSpotsGrid";
// model thunk after get all spots, fetchUsersSpots()
// make a list of current spots in the state, maybe in the step above
// if the length is 0:
// make a link to Create a new spot
// if not 0:
// get all a user's spots; make it similar to the home page
// add an update button below city/state
// add a delete button below city/state
// like home, clicking a spotTile should nav to its detail page

function ManageSpots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotsActions.fetchUsersSpots());
    }, [dispatch]);

    const currentUsersSpots = useSelector(state => state.spots.currentUsersSpots);

    if (!currentUsersSpots) {
        return (
            <h1>Loading current spots...</h1>
        );
     }
     else {
        const spotsArray = currentUsersSpots.Spots;

        return (
            spotsArray.length >= 1 ? (
                <div>
                    <h1>Manage Spots</h1>
                    <UsersSpotsGrid usersSpots={spotsArray}/>
                </div>
            ) : (
                <><h1>hello, you have no spots yet</h1></>
                // add the link to create a spot here
            )

        )
    }
}

export default ManageSpots;
