import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../src/reducers/rootReducer'
import {middlewares} from '../src/store/store'

export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`)
    return wrapper
};

export const testStore = (initialStore) => {
    const testStore = createStore(rootReducer, initialStore, applyMiddleware(...middlewares))
    return testStore
} // createStore( reducer, initialState, func )
