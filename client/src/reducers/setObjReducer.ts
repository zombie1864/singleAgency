import {UPDATE_OBJ} from '../actions/dispatchObjAction'

const initialState = {}

const setObjReducer = (state = initialState, action:any) => {
    
    switch (action.type) {
        case UPDATE_OBJ:
            return action.payload
        default:
            return {...state};
    }
}

export default setObjReducer