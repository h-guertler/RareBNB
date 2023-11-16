import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './CreateSpot.css';

function CreateSpot() {
    const dispatch = useDispatch();

    const currUser = useSelector(state => state.session.user);
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
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

        const currErrors = {};

        if (!country) {
            currErrors.country = "Country is required";
        }
        if (!city) {
            currErrors.city = "City is required";
        }
        if (!state) {
            currErrors.state = "State is required";
        }
        if (!address) {
            currErrors.address = "Address is required";
        }
        if (!description || description.length < 30) {
            currErrors.description = "Description needs 30 or more characters";
        }
        if (!name) {
            currErrors.name = "Title is required";
        }
        if (!price || price < 1 || (typeof price !== "number")) {
            currErrors.price = "Price must be 1 or greater";
        }
        if (!previewImgUrl) {
            currErrors.previewImgUrl = "Preview Image URL is required";
        }

        setErrors(currErrors);

        if (Object.keys(errors) === 0) {
            // submit the form
            // log submitting form
            // if ok: copy paste from create user
            // if res.ok: redirect to new page and return
            // else: set errors to data.errors
        }

        return;
    };

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
                    {errors.country && <p>{errors.country}</p>}
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        >
                    </input>
                </label>
                <label>
                {errors.address && <p>{errors.address}</p>}
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        >
                    </input>
                </label>
                <div className="city-state-div">
                <label>
                    City
                    {errors.city && <p>{errors.city}</p>}
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        >
                    </input>
                </label>
                <label>
                    State
                    {errors.state && <p>{errors.state}</p>}
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        >
                    </input>
                </label>
                </div>
                </div>
                <div className="description-div">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    {errors.description && <p>{errors.description}</p>}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                        >
                    </textarea>
                </div>
                <div className="title-div">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    {errors.name && <p>{errors.name}</p>}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name of your spot"

                    >
                    </input>
                </div>
                <div className="pricing-div">
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    {errors.price && <p>{errors.price}</p>}
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"

                    >
                    </input>
                </div>
                <div className="photos-div">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    {errors.previewImgUrl && <p>{errors.previewImgUrl}</p>}
                    <input
                        type="text"
                        value={previewImgUrl}
                        onChange={(e) => setPreviewImgUrl(e.target.value)}
                        placeholder="Preview Image URL"

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
