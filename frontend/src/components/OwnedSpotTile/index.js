import React from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import "./OwnedSpotTile.css";
import { useHistory, Redirect } from "react-router-dom";

function OwnedSpotTile({spot}) {
    const { previewImage, city, state, price, avgRating, name, id } = spot;
    const history = useHistory();

    const directToSpotDetails = () => {
        return history.push(`/spots/${id}`);
    };

    const handleUpdate = (e) => {
        e.stopPropagation();
        console.log("handle update clicked")
        return history.push(`/spots/${id}/edit`);
    }

    const handleDelete = () => {
        console.log("handle delete clicked")
    }

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
        <div className="owned-spot-tile spot-tile clickable tooltip" onClick={directToSpotDetails}>
            <span className="tooltiptext">{name}</span>
            <img src={previewImage} className="previewImage" alt="spot preview"/>
            <div className="tile-text">
                <div className="first-row">
                    <div className="city-and-state">{`${city}, ${state} `}</div>
                    <div className="rating-div">
                        <i className="fas fa-star"></i>
                        {ratingString}
                    </div>
                </div>
                <div className="second-row">
                    <div className="price">{` $${price}/night `}</div>
                </div>
                <div className="button-div">
                    <button onClick={handleUpdate} className="clickable management-button">Update</button>
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteSpotModal/>}
                        />
                </div>
            </div>
        </div>
    )
}

export default OwnedSpotTile;
