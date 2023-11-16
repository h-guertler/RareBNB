import { csrfFetch } from "./csrf";

const GET_REVIEWS_BY_SPOT = "reviews/getReviewsBySpot"

export const getReviewsBySpot = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOT,
        payload: reviews
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
        default:
            return state;
    }
}

export default reviewsReducer;
