import {SET_DATA,FETCH_ERR } from '../actions/fetchDataAction'

const initialState =  {
    fixture: []
}

const setData = ( state = initialState, action:any) => {
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

export default setData

// action = {type: SET_DATA, fixture:(100)[]}
// ⮑ comes from dispatch, ListComp line 151 