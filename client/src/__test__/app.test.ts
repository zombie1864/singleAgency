import {FETCH_DATA} from '../actions/fetchDataAction'
import setData from '../reducers/setDataReducer'

describe('setDataReducer', () => {
    it('should return default state', () => {
        const newState = setData(undefined, {}) // pure func, returns new piece of state 
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

        const newState = setData(undefined, {
            type: FETCH_DATA, 
            fixture:data.results
        })

        expect(newState).toEqual(result)
    })
})

export default test 