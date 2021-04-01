import { FETCH_DATA,SET_DATA,FETCH_ERR } from '../actions/fetchDataAction'

const initialState =  {
    fixture: []
}

const setData = ( state = initialState, action:any) => {
    switch (action.type) {
        case SET_DATA:
            let newState = { ...state, fixture: action.fixture}
            console.log("set data",state, newState);
            return newState 
        case FETCH_DATA: 
            console.log("fetch data",state);
            return state 
        case FETCH_ERR:
            console.log("err!");
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