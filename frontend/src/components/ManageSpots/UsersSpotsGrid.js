import * as spotsActions from "../../store/spots";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../SpotsGrid/SpotsGrid.css";
import OwnedSpotTile from "../../components/OwnedSpotTile";

function UsersSpotsGrid(usersSpots) {
    console.log("usersspots: " + usersSpots) // an obj
    console.log("Input Keys: " + Object.keys(usersSpots))
    console.log("Input Values: " + Object.values(usersSpots))

    const spotsArray = Array.from(Object.values(usersSpots));
    const innerArray = spotsArray[0]; // this is an array

    console.log("inner: " + innerArray)// an array of objects

    for (let innerObj in innerArray) {
        console.log(innerArray[innerObj]) // here is the spot
    }

    return (
        <div className="spots-grid">
            {innerArray.map((spot) => (
                <OwnedSpotTile spot={spot} key={spot.id} className="owned-spot-tile spot-tile"/>
            ))}
        </div>
    )
}

export default UsersSpotsGrid;
