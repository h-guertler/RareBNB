// import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './CreateSpot.css';

function CreateSpot() {
    const dispatch = useDispatch();

    const currUser = useSelector(state => state.session.user);
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [previewImgUrl, setPreviewImgUrl] = useState("");
    const [spotImgOne, setSpotImgOne] = useState("");
    const [spotImgTwo, setSpotImgTwo] = useState("");
    const [spotImgThree, setSpotImgThree] = useState("");
    const [spotImgFour, setSpotImgFour] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!country) {
            errors.country = "Country is required"
        }
        if (!city) {
            errors.city = "City is required"
        }
        if (!state) {
            errors.state = "State is required"
        }
        if (!address) {
            errors.address = "Address is required"
        }
        if (!description || description.length < 30) {
            errors.description = "Description needs 30 or more characters"
        }
        if (!title) {
            errors.title = "Title is required"
        }
        if (!price || price < 1 || (typeof price !== "number")) {
            errors.price = "Price must be 1 or greater"
        }
        if (!previewImgUrl) {
            errors.previewImgUrl = "Preview Image URL is required"
        }


    }

    return (



        <>
            <h1>Hello from CreateSpot</h1>
            <form onSubmit={handleSubmit}>
                <h2>Create a New Spot</h2>
                <div className="location-div">
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        required>
                    </input>
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        required>
                    </input>
                </label>
                <div className="city-state-div">
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        required>
                    </input>
                </label>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        required>
                    </input>
                </label>
                </div>
                </div>
                <div className="description-div">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                        required>
                    </textarea>
                </div>
                <div className="title-div">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Name of your spot"
                        required
                    >
                    </input>
                </div>
                <div className="pricing-div">
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"
                        required
                    >
                    </input>
                </div>
                <div className="photos-div">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    <input
                        type="text"
                        value={previewImgUrl}
                        onChange={(e) => setPreviewImgUrl(e.target.value)}
                        placeholder="Preview Image URL"
                        required
                    >
                    </input>
                    <input
                        type="text"
                        value={spotImgOne}
                        onChange={(e) => setSpotImgOne(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                    <input
                        type="text"
                        value={spotImgTwo}
                        onChange={(e) => setSpotImgTwo(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                    <input
                        type="text"
                        value={spotImgThree}
                        onChange={(e) => setSpotImgThree(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                    <input
                        type="text"
                        value={spotImgFour}
                        onChange={(e) => setSpotImgFour(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </>
    );
}

export default CreateSpot;
