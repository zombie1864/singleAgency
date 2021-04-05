import {SET_DATA,FETCH_ERR } from '../actions/fetchDataAction'

const initialState =  {
    fixture: []
}

const setDataReducer = ( state = initialState, action:any) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, fixture: action.fixture}
        case FETCH_ERR:
            return { fixture: [
                {dummy:"dummy"}
            ]}
        default:
            return state 
    }
}

export default setDataReducer

