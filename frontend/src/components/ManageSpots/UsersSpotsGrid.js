import * as spotsActions from "../../store/spots";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../SpotsGrid/SpotsGrid.css";
import OwnedSpotTile from "../../components/OwnedSpotTile";

function UsersSpotsGrid({usersSpots}) {
    console.log("usersspots: " + usersSpots) // an obj
    console.log("Input Keys: " + Object.keys(usersSpots)) // a series of numbers
    console.log("Input Values: " + Object.values(usersSpots)) // a series of objects (spots)

    const spotsArray = Array.from(Object.values(usersSpots)); // spotsArray is the array of spots
    const innerArray = spotsArray[0]; // this is a spot obj

    console.log("inner: " + innerArray)// just the spot

    // useEffect(() => {
        // was passed in as prop
    //     handleUsersSpotsChange();
    // }, [innerArray]);

    for (let innerObj in innerArray) {
        console.log("inner obj: " + innerObj) // this lists keys
        console.log(innerArray[innerObj]) // this lists vals
    }

    return (
        <div className="spots-grid">
            {spotsArray.map((spot) => (
                <OwnedSpotTile spot={spot} key={spot.id} className="owned-spot-tile spot-tile"/>
            ))}
        </div>
    )
}

export default UsersSpotsGrid;
