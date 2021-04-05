import {FETCH_DATA} from '../actions/fetchDataAction'
import setDataReducer from '../reducers/setDataReducer'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import {setData} from '../actions/fetchDataAction'

// testing reducer for state change 
describe('setDataReducer', () => {
    it('should return default state', () => {
        const newState = setDataReducer(undefined, {}) // pure func, returns new piece of state 
        expect(newState).toEqual({fixture:[]})
    })

    it('Should return new state if receiving FETCH_DATA', () => {

        const data = {
            count: 100, 
            next: null, 
            previous: null, 
            results: [
                {test1: 'test'},
                {test2: 'test'},
                {test3: 'test'}
            ]
        }

        const result = {
            fixture: [
                {test1: 'test'},
                {test2: 'test'},
                {test3: 'test'}
            ]
        }

        const newState = setDataReducer(undefined, {
            type: FETCH_DATA, 
            fixture:data.results
        })

        expect(newState).toEqual(result)
    })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

export default test 