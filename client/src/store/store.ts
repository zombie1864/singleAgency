import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

export type AppState = ReturnType<typeof rootReducer>;
export const middlewares = [thunk]

export const store = createStore(rootReducer, applyMiddleware(...middlewares)); 
