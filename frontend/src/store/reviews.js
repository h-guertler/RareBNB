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
    return {
        type: ADD_A_REVIEW,
        payload: review
    }
}

export const addReview = (spotId, reviewObj) => async (dispatch) => {

    const { review, stars } = reviewObj;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        }),
    })

    const data = await response.json();

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add review: ${errorData.message}`);
    } else {
    dispatch(addAReview(data));
    return data;  // maybe res
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
            newState = Object.assign({}, state);
            newState.currentSpotReviews.Reviews = [action.payload, ...newState.currentSpotReviews.Reviews];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
