import * as spotsActions from "../../store/spots";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotTile from "../SpotTile";

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
                allSpots.Spots.map((spot) => (
                    <SpotTile spot={spot} key={spot.id} />
                ))}
        </ul>
    )
}

export default SpotsGrid;
