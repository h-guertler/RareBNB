import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './CreateSpot.css';
import * as spotsActions from "../../store/spots";

function CreateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();

    const currUser = useSelector(state => state.session.user);
    //below causing issues
    //const createdSpot = useSelector(state => state.spots.currentSpot);
    //const savedId = createdSpot.id;

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImgUrl, setPreviewImgUrl] = useState("");
    const [spotImgOne, setSpotImgOne] = useState("");
    const [spotImgTwo, setSpotImgTwo] = useState("");
    const [spotImgThree, setSpotImgThree] = useState("");
    const [spotImgFour, setSpotImgFour] = useState("");
    const [errors, setErrors] = useState({});

    const checkUrl = (url) => {
        return (url.endsWith(".jpg")
        || url.endsWith(".png")
        || url.endsWith(".jpeg"))
    }

    // useEffect(() => {
    //     if (createdSpot && createdSpot.id !== savedId) {
    //         history.push(`/spots/${createdSpot.id}`);
    //     }
    // }, [createdSpot, history]);

    const handleSubmit = async (e) => {
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
        if (!lat) {
            currErrors.lat = "Latitude is required";
        }
        if (!lng) {
            currErrors.lng = "Longitude is required";
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
        if (!price || price < 1 || (typeof parseInt(price) !== "number")) {
            currErrors.price = "Price must be 1 or greater";
        }
        if (!previewImgUrl) {
            currErrors.previewImgUrl = "Preview Image URL is required";
        }

        if (previewImgUrl && !checkUrl(previewImgUrl)) {
            currErrors.previewImgUrl = "Image URL must end in .png, .jpg, or .jpeg"
        }

        if (spotImgOne && !checkUrl(spotImgOne)) {
            currErrors.spotImgOne = "Image URL must end in .png, .jpg, or .jpeg"
        }

        if (spotImgTwo && !checkUrl(spotImgTwo)) {
            currErrors.spotImgTwo = "Image URL must end in .png, .jpg, or .jpeg"
        }

        if (spotImgThree && !checkUrl(spotImgThree)) {
            currErrors.spotImgThree = "Image URL must end in .png, .jpg, or .jpeg"
        }

        if (spotImgFour && !checkUrl(spotImgFour)) {
            currErrors.spotImgFour = "Image URL must end in .png, .jpg, or .jpeg"
        }

        setErrors(currErrors);

        if (Object.keys(currErrors).length === 0) {
            let newSpotInfo = {
                country,
                address,
                city,
                state,
                lat,
                lng,
                description,
                name,
                price,
            }

            dispatch(spotsActions.createSpot(newSpotInfo))
                .then((data) => {
                    const newId = data.id;
                    dispatch(spotsActions.addSpotImage(newId, {url: previewImgUrl, preview: true}));

                    if (spotImgOne) {
                        dispatch(spotsActions.addSpotImage(newId, {url: spotImgOne, preview: false}));
                    }
                    if (spotImgTwo) {
                        dispatch(spotsActions.addSpotImage(newId, {url: spotImgTwo, preview: false}));
                    }
                    if (spotImgThree) {
                        dispatch(spotsActions.addSpotImage(newId, {url: spotImgThree, preview: false}));
                    }
                    if (spotImgFour) {
                        dispatch(spotsActions.addSpotImage(newId, {url: spotImgFour, preview: false}));
                    }
                })
                .catch((error) => {
                    setErrors(error);
                })

    //             history.push(`/spots/${createdSpot.id}`);
                // dispatch to create a new spotimage with all given urls
                // addSpotImage = (spotId, imgInfo)


        }

        setErrors(currErrors);
        return;
    };

    if (!currUser) return (<h1>Please log in to access this resource</h1>)

    return (
        <div className="new-spot-form-div">
              <form onSubmit={handleSubmit}>
                <h2>Create a New Spot</h2>

                <div className="location-div">
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div className="country">
                <label>
                    Country
                    {errors.country && <p className="errorsP">{errors.country}</p>}
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        >
                    </input>
                </label>
                </div>
                <div className="address">
                <label>
                {errors.address && <p className="errorsP">{errors.address}</p>}
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        >
                    </input>
                </label>
                </div>
                <div className="city-state-div">
                <div className="city">
                <label>
                    City
                    {errors.city && <p className="errorsP">{errors.city}</p>}
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="city-input"
                        >
                    </input>
                </label>
                </div>
                <div className="state">
                <label>
                    State
                    {errors.state && <p className="errorsP">{errors.state}</p>}
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="state-input"
                        >
                    </input>
                </label>
                </div>
                </div>
                <div className="lat-lng-div">
                <div className="lat">
                <label>
                    Latitude
                    {errors.lat && <p className="errorsP">{errors.lat}</p>}
                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder="Latitude"
                        className="lat-input"
                        >
                    </input>
                </label>
                </div>
                <div className="lng">
                <label>
                    Longitude
                    {errors.lng && <p className="errorsP">{errors.lng}</p>}
                    <input
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder="Longitude"
                        className="lng-input"
                        >
                    </input>
                </label>
                </div>
                </div>
                </div>
                <div className="description-div">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    {errors.description && <p className="errorsP">{errors.description}</p>}
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
                    {errors.name && <p className="errorsP">{errors.name}</p>}
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
                    {errors.price && <p className="errorsP">{errors.price}</p>}
                    <label>
                        $
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"

                    >
                    </input>
                    </label>
                </div>
                <div className="photos-div">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot</p>
                    {errors.previewImgUrl && <p className="errorsP">{errors.previewImgUrl}</p>}
                    <input
                        type="text"
                        value={previewImgUrl}
                        onChange={(e) => setPreviewImgUrl(e.target.value)}
                        placeholder="Preview Image URL"

                    >
                    </input>
                    {errors.spotImgOne && <p className="errorsP">{errors.spotImgOne}</p>}
                    <input
                        type="text"
                        value={spotImgOne}
                        onChange={(e) => setSpotImgOne(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                    {errors.spotImgTwo && <p className="errorsP">{errors.spotImgTwo}</p>}
                    <input
                        type="text"
                        value={spotImgTwo}
                        onChange={(e) => setSpotImgTwo(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                    {errors.spotImgThree && <p className="errorsP">{errors.spotImgThree}</p>}
                    <input
                        type="text"
                        value={spotImgThree}
                        onChange={(e) => setSpotImgThree(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                    {errors.spotImgFour && <p className="errorsP">{errors.spotImgFour}</p>}
                    <input
                        type="text"
                        value={spotImgFour}
                        onChange={(e) => setSpotImgFour(e.target.value)}
                        placeholder="Image URL"
                    >
                    </input>
                </div>
                <button type="submit" className="clickable">Create Spot</button>
            </form>
        </div>
    );
}

export default CreateSpot;
