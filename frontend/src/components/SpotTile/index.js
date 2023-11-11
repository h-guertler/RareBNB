import React from "react";
import "./SpotTile.css";
import testImg from "./hobbitbnb.JPG";
import { useHistory } from "react-router-dom";

function SpotTile({spot}) {
    const { previewImage, city, state, price, avgRating, name, id } = spot;
    const history = useHistory();

    const directToSpotDetails = () => {
        return history.push(`/spots/${id}`);
    };

    let ratingString;
    if (typeof avgRating === "number" && avgRating > 0) {
        if (avgRating % 1 === 0) {
            ratingString = `${avgRating}.0`;
        } else {
            ratingString = avgRating.toString();
        }
    } else {
        ratingString = "new"
    }

    return (
        <div className="spot-tile clickable tooltip" onClick={directToSpotDetails}>
            <span className="tooltiptext">{name}</span>
            <img src={testImg} className="previewImage" alt="spot preview"/>
            <div className="tile-text">
                <div className="first-row">
                    <div className="city-and-state">{`${city}, ${state} `}</div>
                    <div className="rating-div">
                        <i class="fas fa-star"></i>
                        {ratingString}
                    </div>
                </div>
                <div classname="second-row">
                    <div className="price">{` $${price}/night `}</div>
                </div>
            </div>
        </div>
    )
}

export default SpotTile;
