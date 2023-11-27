import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"; // usHistory
import "./UpdateSpotForm.css";
import * as spotsActions from "../../store/spots";

function UpdateSpotForm() {
    const dispatch = useDispatch();
    // const history = useHistory();

    const { spotId } = useParams();

    // eslint-disable-next-line
    const currUser = useSelector(state => state.session.user);

    const [loading, setLoading] = useState(true);

    // find a spot with the id spotId by fetching one spot
    useEffect(() => {
        dispatch(spotsActions.fetchOneSpot(spotId));
    }, [dispatch, spotId]);

    const currSpot = useSelector(state => state.spots.currentSpot);

    useEffect(() => {
        setLoading(!currSpot);
    }, [currSpot]);

    // eslint-disable-next-line
    const [country, setCountry] = useState(currSpot ? currSpot.country : "");
    // eslint-disable-next-line
    const [address, setAddress] = useState(currSpot ? currSpot.address : "");
    // eslint-disable-next-line
    const [city, setCity] = useState(currSpot ? currSpot.city : "");
    // eslint-disable-next-line
    const [state, setState] = useState(currSpot ? currSpot.state : "");
    // eslint-disable-next-line
    const [lat, setLat] = useState(currSpot ? currSpot.lat : "");
    // eslint-disable-next-line
    const [lng, setLng] = useState(currSpot ? currSpot.lng : "");
    // eslint-disable-next-line
    const [description, setDescription] = useState(currSpot ? currSpot.description : "");
    // eslint-disable-next-line
    const [name, setName] = useState(currSpot ? currSpot.name : "");
    // eslint-disable-next-line
    const [price, setPrice] = useState(currSpot ? currSpot.price : "");
    // eslint-disable-next-line
    const [errors, setErrors] = useState({});

    if (loading) return (<h1>Loading...</h1>)

    // // const [previewImgUrl, setPreviewImgUrl] = useState(spot.previewImgUrl);
    // // const [spotImgOne, setSpotImgOne] = useState(spot.spotImgOne ? spot.spotImgOne : "");
    // // const [spotImgTwo, setSpotImgTwo] = useState(spot.spotImgTwo ? spot.spotImgTwo : "");
    // // const [spotImgThree, setSpotImgThree] = useState(spot.spotImgThree ? spot.spotImgThree : "");
    // // const [spotImgFour, setSpotImgFour] = useState(spot.spotImgFour ? spot.spotImgFour : "");
    // const [errors, setErrors] = useState({});

    const handleSubmit = () => console.log("handle submit clicked");
    // // const handleSubmit = async (e) => {
    // //     e.preventDefault();
    // //     setErrors({});

    // //     const currErrors = {};

    // //     if (!country) {
    // //         currErrors.country = "Country is required";
    // //     }
    // //     if (!city) {
    // //         currErrors.city = "City is required";
    // //     }
    // //     if (!state) {
    // //         currErrors.state = "State is required";
    // //     }
    // //     if (!lat) {
    // //         currErrors.lat = "Latitude is required";
    // //     }
    // //     if (!lng) {
    // //         currErrors.lng = "Longitude is required";
    // //     }
    // //     if (!address) {
    // //         currErrors.address = "Address is required";
    // //     }
    // //     if (!description || description.length < 30) {
    // //         currErrors.description = "Description needs 30 or more characters";
    // //     }
    // //     if (!name) {
    // //         currErrors.name = "Title is required";
    // //     }
    // //     if (!price || price < 1 || (typeof price !== "number")) {
    // //         currErrors.price = "Price must be 1 or greater";
    // //     }
    // //     // if (!previewImgUrl) {
    // //     //     currErrors.previewImgUrl = "Preview Image URL is required";
    // //     // }

    // //     setErrors(currErrors);

    // //     if (Object.keys(errors).length === 0) {

    // //         let updatedSpotInfo = {
    // //             country,
    // //             address,
    // //             city,
    // //             state,
    // //             lat,
    // //             lng,
    // //             description,
    // //             name,
    // //             price,
    // //             // previewImgUrl
    // //         }

    // //         // const { address, city, state, country, lat, lng, name, description, price } = spot; <= from API route

    // //         dispatch(spotsActions.updateSpot(updatedSpotInfo))
    // //             .then((data) => {
    // //                 console.log("res keys: " + Object.keys(data));
    // //                 console.log("res.vals: " + Object.values(data))
    // //             })
    // //             .catch((error) => {
    // //                 console.error("Error:", error);
    // //                 setErrors(error);
    // //             });
    // //     }

    // //     return;
    // // };

    // // const updatedSpot = useSelector(state => state.spots.currentSpot);
    // // history.push(`/spots/${updatedSpot.id}`);

    // if (!currUser) return (<h1>Please log in to access this resource</h1>)

    return (
        <div className="update-spot-form-div">
            <form onSubmit={handleSubmit}>
                <h2>Update Your Spot</h2>
                <div className="location-div">
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div className="country">
                <label>
                    Country
                    {errors.country && <p>{errors.country}</p>}
                    <input
                        type="text"
                        value={currSpot.country}
                        onChange={(e) => setCountry(e.target.value)}
                        >
                    </input>
                </label>
                </div>
                <div className="address">
                <label>
                {errors.address && <p>{errors.address}</p>}
                    Street Address
                 <input
                        type="text"
                        value={currSpot ? currSpot.address : ""}
                        onChange={(e) => setAddress(e.target.value)}
                        >
                 </input>
                </label>
                </div>
                <div className="city-state-div">
                <div className="city">
                <label>
                    City
                    {errors.city && <p>{errors.city}</p>}
                    <input
                        type="text"
                        value={currSpot ? currSpot.city : ""}
                        onChange={(e) => setCity(e.target.value)}
                        className="city-input"
                        >
                    </input>
                </label>
                </div>
                <div className="state">
                <label>
                    State
                    {errors.state && <p>{errors.state}</p>}
                    <input
                        type="text"
                        value={currSpot ? currSpot.state : ""}
                        onChange={(e) => setState(e.target.value)}
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
                    {errors.lat && <p>{errors.lat}</p>}
                    <input
                        type="text"
                        value={currSpot ? currSpot.lat : ""}
                        onChange={(e) => setLat(e.target.value)}
                        >
                    </input>
                </label>
                </div>
                <div className="lng">
                <label>
                    Longitude
                    {errors.lng && <p>{errors.lng}</p>}
                    <input
                        type="text"
                        value={currSpot ? currSpot.lng : ""}
                        onChange={(e) => setLng(e.target.value)}
                        >
                    </input>
                </label>
                </div>
                </div>
                </div>
                <div className="description-div">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    {errors.description && <p>{errors.description}</p>}
                    <textarea
                        value={currSpot ? currSpot.description : ""}
                        onChange={(e) => setDescription(e.target.value)}
                        >
                    </textarea>
                </div>
                <div className="title-div">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    {errors.name && <p>{errors.name}</p>}
                    <input
                        type="text"
                        value={currSpot ? currSpot.name : ""}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>
                <div className="pricing-div">
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    {errors.price && <p>{errors.price}</p>}
                    <input
                        type="number"
                        value={currSpot ? currSpot.price : ""}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                    </input>
                </div>

                <button type="submit" className="clickable">Update Your Spot</button>
            </form>
        </div>
    );
}

export default UpdateSpotForm;
