import {UPDATE_COORD} from '../actions/updateCoordAction'

const initialState = {
    lat: 25.761681, 
    lng: -80.191788
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