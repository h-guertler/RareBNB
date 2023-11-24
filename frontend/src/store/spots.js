import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_ONE_SPOT = "spots/getOneSpot";
const GET_USERS_SPOTS = "spots/getUsersSpots";

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

export const getOneSpot = (spot) => {
    console.log("get one spot tiny function")
    return {
        type: GET_ONE_SPOT,
        payload: spot
    }
}

export const getUsersSpots = (spots) => {
    console.log("in get users spots")
    return {
        type: GET_USERS_SPOTS,
        payload: spots
    }
}

export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
};

export const fetchUsersSpots = () => async (dispatch) => {
    console.log("in fetchUsersSpots")
    const response = await csrfFetch("/api/spots/current");
    const data = await response.json();
    console.log(data.keys)
    dispatch(getUsersSpots(data));
    return response;
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
    // should dispatch something here?
    const data = await response.json();

    if (response.ok) {
        dispatch(getOneSpot(data));
     } else {
        console.log("bad data: " + data)
     } // if (response.ok)  this may not be right, shoudl redirect in cmponent?

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
            console.log("get one dispatched in reducer")
            newState = Object.assign({}, state);
            newState.currentSpot = action.payload;
            return newState;
        }
        case GET_USERS_SPOTS: {
            newState = Object.assign({}, state);
            newState.currentUsersSpots = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
