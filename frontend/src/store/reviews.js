import { csrfFetch } from "./csrf";

const GET_REVIEWS_BY_SPOT = "reviews/getReviewsBySpot";
const ADD_A_REVIEW = "reviews/addReview";

export const getReviewsBySpot = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOT,
        payload: reviews
    }
}

export const addAReview = (review) => {
    console.log("add a review tiny")
    return {
        type: ADD_A_REVIEW,
        payload: review
    }
}

export const addReview = (spotId, reviewObj) => async (dispatch) => {

    const { review, stars } = reviewObj;
    console.log("inside addReview, before response")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        }),
    })
    console.log("made it past response in addReview")
    const data = await response.json();
    console.log("data addReview keys: " + Object.keys(data));
    console.log("data addReview values: " + Object.values(data))

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add review: ${errorData.message}`);
    } else {
    dispatch(addAReview(data));
    return response;
    }
}

export const fetchReviewsBySpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await response.json();
    dispatch(getReviewsBySpot(data));
    return response;
}


const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_REVIEWS_BY_SPOT: {
            newState = Object.assign({}, state);
            newState.currentSpotReviews = action.payload;
            return newState;
        }
        case ADD_A_REVIEW: {
            console.log("in the rev reducer")
            newState = Object.assign({}, state);
            newState.currentSpotReviews.Reviews = [action.payload, ...newState.currentSpotReviews.Reviews];
            console.log("rev state should be updated")
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
