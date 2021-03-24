import { combineReducers } from 'redux'
import setDataReducer from './setDataReducer' 
import setCoordReducer from './setCoordReducer'

const rootReducer = combineReducers({
    setDataReducer, 
    setCoordReducer
})

export default rootReducer