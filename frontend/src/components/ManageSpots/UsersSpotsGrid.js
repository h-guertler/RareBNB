import * as spotsActions from "../../store/spots";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../SpotsGrid/SpotsGrid.css";
import OwnedSpotTile from "../../components/OwnedSpotTile";
import "./UsersSpotsGrid.css"

// align manage spots text with edge of spotsGrid
// ensure they are aligned with left side of image
function UsersSpotsGrid({usersSpots}) {
    const dispatch = useDispatch();

    // console.log("users spots: " + usersSpots) // an obj
    // console.log("Input Keys: " + Object.keys(usersSpots)) // a series of numbers
    // console.log("Input Values: " + Object.values(usersSpots)) // a series of objects (spots)

    const spotsArray = Array.from(Object.values(usersSpots)); // spotsArray is the array of spots
    const singleSpot = spotsArray[0]; // this is a spot obj

    // console.log("spot: " + singleSpot)// just the spot

    // useEffect(() => {
        // was passed in as prop
    //     handleUsersSpotsChange();
    // }, [singleSpot]);

    // for (let innerInfo in singleSpot) {
    //     console.log("inner info: " + innerInfo) // this lists keys of the spot
    //     console.log(singleSpot[innerInfo]) // this lists vals of the spot
    // }

    return (
        <div>
        <div className="container-for-grid">
        <div className="spots-grid">
            {spotsArray.map((spot) => (
                <OwnedSpotTile spot={spot} key={spot.id} className="owned-spot-tile spot-tile"/>
            ))}
        </div>
        </div>
        </div>
    )
}

export default UsersSpotsGrid;
