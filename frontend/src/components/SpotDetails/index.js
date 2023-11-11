import React from "react";
import { useParams } from "react-router-dom";
import fetchOneSpot from "../../store/spots";

// to select the spot, do a fetch to get spot details

function SpotDetails() {
    const spotId = useParams();
    const spot = fetchOneSpot(spotId);
    const { name, city, state, country, description, Owner } = spot;

    return (
        <div className="spot-details">
            <h2>{name}</h2>
            <h4>{`${city}, ${state}, ${country}`}</h4>
            <div className="spot-detail-images">
                <h4>Images here</h4>
            </div>
            <h2>Hosted by {`${Owner.firstName} ${Owner.lastName}`}</h2>
            <p>{`${description}`}</p>
        </div>
    )
}

export default SpotDetails;

// On the spot's detail page, the following information should be present:
    // Images (1 large image and 4 small images),
    // and the callout information box on the right, below the images.
        // aligned right
        // on top: price/night, star icon, rating as decimal, number of reviews
        // below: big reserve button
