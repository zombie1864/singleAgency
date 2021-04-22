import {combineReducers} from 'redux'
import {Reducer} from 'redux'
import {SET_DATA,UPDATE_OBJ} from '../actions/index'
import {InitialState,updateObjAction,SetDataAction} from '../types/appTypes'

const initialState:InitialState = {
    results: [], 
    obj: null
} 

type Action= updateObjAction | SetDataAction

const setDataReducer:Reducer<InitialState, Action> = ( state = initialState, action):InitialState => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, results: action.results}
        case UPDATE_OBJ:
            return {...state, obj: action.payload}
        default:
            return state 
    }
}

const rootReducer = combineReducers({
    setDataReducer, 
})

export default rootReducer