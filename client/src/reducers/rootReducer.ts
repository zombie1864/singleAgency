import { combineReducers } from 'redux'
import setDataReducer from './setDataReducer' 
import setObjReducer from './setObjReducer'

const rootReducer = combineReducers({
    setDataReducer, 
    setObjReducer
})

export default rootReducer