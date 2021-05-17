import {Reducer, combineReducers} from 'redux'
import {SET_DATA,UPDATE_OBJ} from '../actions/index'
import {InitialState,updateObjAction,SetDataAction} from '../types/appTypes'

const initialState:InitialState = {
    objFromResults: null,
    results: [] 
} 

interface IemptyAction {
    type: string, 
    results?:any, 
    payload?:any
}

type Action = updateObjAction | SetDataAction | IemptyAction

const setDataReducer:Reducer<InitialState, Action> = ( state = initialState, action):InitialState => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, results: action.results}
        case UPDATE_OBJ:
            return {...state, objFromResults: action.payload}
        default:
            return state 
    }
}

const rootReducer = combineReducers({
    setDataReducer, 
})

export default rootReducer