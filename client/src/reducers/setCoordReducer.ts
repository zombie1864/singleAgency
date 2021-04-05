import {UPDATE_COORD} from '../actions/updateCoordAction'

const initialState = {
    lat: 40.818417, 
    lng: -73.950318
}

const setCoordReducer = (state = initialState, action:any) => {
    
    switch (action.type) {
        case UPDATE_COORD:
            return {
                ...state, 
                lat: action.payload.lat, 
                lng: action.payload.lng
            }
        default:
            return {...state};
    }
}

export default setCoordReducer