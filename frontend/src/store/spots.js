// get all spots
import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

// change to one that returns all spots
export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
  };

// should there be all spots in the initial state?
const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS: {
            newState = Object.assign({}, state);
            newState.spots = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
