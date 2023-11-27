import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_ONE_SPOT = "spots/getOneSpot";
const GET_USERS_SPOTS = "spots/getUsersSpots";
const REMOVE_SPOT = "spots/removeSpot";

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

export const getUsersSpots = (spots) => {
    return {
        type: GET_USERS_SPOTS,
        payload: spots
    }
}

export const removeSpot = () => {
    return {
        type: REMOVE_SPOT,
    }
}

export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
};

export const fetchUsersSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current");
    const data = await response.json();
    dispatch(getUsersSpots(data));
    return response;
}

// pass in preview and url
export const addSpotImage = (spotId, imgInfo) => async (dispatch) => {
    const { preview, url } = imgInfo;

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify({
            url,
            preview
        })
    });

    const data = await response.json();
    // do i need to do anything else for store to update?

}

export const fetchOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(getOneSpot(data));
    return response;
};

export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch("/api/spots/", {
        method: "POST",
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(getOneSpot(data));
     }

    return data;
}

export const updateSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "POST",
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    });

    const data = await response.json();

    dispatch(getOneSpot(data));
    return data;
}

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });

    dispatch(removeSpot());
    return response;
}

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
        case GET_USERS_SPOTS: {
            newState = Object.assign({}, state);
            newState.currentUsersSpots = action.payload;
            return newState;
        }
        case REMOVE_SPOT: {
            newState = Object.assign({}, state);
            // do stuff to delete the spot from the state here
            // newState.currentUsersSpots.Spots is an array of all the user's spots. each item in the array is an object with a unique identifier at the key id
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
