import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_ONE_SPOT = "spots/getOneSpot"

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

export const getOneSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        payload: spot
    }
}

export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
};

export const fetchOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(getOneSpot(data));
    return response;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS: {
            newState = Object.assign({}, state);
            newState.spots = action.payload;
            return newState;
        }
        case GET_ONE_SPOT: {
            newState = Object.assign({}, state);
            newState.currentSpot = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
