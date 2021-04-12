import {combineReducers} from 'redux'
import {Reducer} from 'redux'
// import {obj} from '../types/storeType'
import {SET_DATA,FETCH_ERR,UPDATE_OBJ} from '../actions/index'
import {InitialStateResults,InitialStateObj} from '../types/appTypes'

const initialStateResults:InitialStateResults =  {
    results: []
}

const setDataReducer:Reducer<InitialStateResults> = ( state = initialStateResults, action:any) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, results: action.results}
        case FETCH_ERR:
            return { results: [
                {dummy:"dummy"}
            ]}
        default:
            return state 
    }
}

const initialStateObj:InitialStateObj = {}

const setObjReducer:Reducer<InitialStateObj> = (state = initialStateObj, action:any) => {
    
    switch (action.type) {
        case UPDATE_OBJ:
            return action.payload
        default:
            return {...state};
    }
}

const rootReducer = combineReducers({
    setDataReducer, 
    setObjReducer
})

export default rootReducer