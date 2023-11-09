// Each tile will have:
    // a square image, which is the spot's previewImage
    // below the image, spot's "city, state" -- aligned w edge of photo
    // below city and state, "price" / night -- aligned w edge of photo
    // below the image, at the same height as city and state: rating as a decimal
    // to the left of rating: a star icon

// the spots state-- an object with an array of spots -- will be used here
import * as spotsActions from "../../store/spots";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// get the result of getAllSpots from the store
// create an array from the results of getAllSpots
// map through this, creating a tile for each one

function SpotsGrid() {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots.spots);

    useEffect(() => {
        dispatch(spotsActions.fetchAllSpots())
    }, [dispatch])

    // <li key={index}>{spot.name}</li> replace this w tile

    return (
        <ul>
            {allSpots && allSpots.Spots &&
                allSpots.Spots.map((spot, index) => (
                    <li key={index}>{spot.name}</li>
                ))}
        </ul>
    )
}

export default SpotsGrid;

// function SpotTile({spotId}) {
//     const currSpot = spotsArray.find(id == spotId)
//     const { previewImage, city, state, price, avgRating, name } = currSpot;
//     return (
//         <div className="spot-tile">
//             <img src="previewImage" alt={`${name}`}/>
//             <span>{`${city}, ${state}`}</span>
//             <span>{`$${price}/night`}</span>
//         </div>
//     )
// }
