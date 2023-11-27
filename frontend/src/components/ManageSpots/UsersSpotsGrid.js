// import * as spotsActions from "../../store/spots";
import React from "react";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../SpotsGrid/SpotsGrid.css";
import OwnedSpotTile from "../../components/OwnedSpotTile";
import "./UsersSpotsGrid.css"

// align manage spots text with edge of spotsGrid
// ensure they are aligned with left side of image
function UsersSpotsGrid({usersSpots}) {
    const history = useHistory();

    const spotsArray = Array.from(Object.values(usersSpots)); // spotsArray is the array of spots

    // useEffect(() => {
        // was passed in as prop
    //     handleUsersSpotsChange();
    // }, [singleSpot]);

    // for (let innerInfo in singleSpot) {
    //     console.log("inner info: " + innerInfo) // this lists keys of the spot
    //     console.log(singleSpot[innerInfo]) // this lists vals of the spot
    // }

    const navToCreateSpot = (e) => {
        e.stopPropagation();
        history.push("/spots/new");
    }

    return (
        <div className="h1-and-grid">
            <h1>Manage Spots</h1>
            <button className="create-spot-button clickable" onClick={navToCreateSpot}>Create a New Spot</button>
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
