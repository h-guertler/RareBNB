import * as spotsActions from "../../store/spots";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotTile from "../SpotTile";
import "./SpotsGrid.css";

function SpotsGrid() {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots.spots);

    useEffect(() => {
        dispatch(spotsActions.fetchAllSpots())
    }, [dispatch])

    return (
        <div className="spots-grid">
            {allSpots && allSpots.Spots &&
                allSpots.Spots.map((spot) => (
                    <SpotTile spot={spot} key={spot.id} className="spot-tile"/>
                ))}
        </div>
    )
}

export default SpotsGrid;
