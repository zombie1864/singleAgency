import {combineReducers} from 'redux'
import {Reducer} from 'redux'
import {SET_DATA,UPDATE_OBJ} from '../actions/index'
import {InitialStateResults} from '../types/appTypes'

const initialStateResults:InitialStateResults =  {
    results: [], 
    obj: undefined
}

const setDataReducer:Reducer<InitialStateResults> = ( state = initialStateResults, action:any) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, results: action.results}
        case UPDATE_OBJ:
            return {...state, obj: action.payload}
        // case FETCH_ERR:
        //     return { results: [
        //         {dummy:"dummy"}
        //     ]}
        default:
            return state 
    }
}

const rootReducer = combineReducers({
    setDataReducer, 
})

export default rootReducer