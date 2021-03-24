import { SET_DATA } from '../actions/fetchDataAction'

const initialState =  {
    fixture: []
}

const setData = ( state = initialState, action:any) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, fixture: action.fixture}
        default:
            return state 
    }
}

export default setData