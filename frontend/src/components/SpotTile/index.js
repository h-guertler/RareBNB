import React from "react";
import "./SpotTile.css";
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
            let longRatingString = avgRating.toString();
            ratingString = longRatingString.slice(0, 3);
        }
    } else {
        ratingString = "New";
    }

    return (
        <div className="spot-tile clickable tooltip" onClick={directToSpotDetails}>
            <span className="tooltiptext">{name}</span>
            <img src={previewImage ? previewImage : "https://img2.cgtrader.com/items/3310379/5158213a16/large/fantasy-stylized-medieval-house-b8-3d-model-obj-fbx-blend-gltf.jpg"} className="previewImage" alt="spot preview"/>
            <div className="tile-text">
                <div className="first-row">
                    <div className="city-and-state">{`${city}, ${state} `}</div>
                    <div className="rating-div">
                        <i className="fas fa-star"></i>
                        {ratingString}
                    </div>
                </div>
                <div className="second-row">
                    <div className="price">{` $${price} night `}</div>
                </div>
            </div>
        </div>
    )
}

export default SpotTile;
