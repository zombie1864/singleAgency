import {SET_DATA} from '../actions/fetchDataAction'
import setData from '../reducers/setDataReducer'

describe('setDataReducer', () => {
    it('should return default state', () => {
        const newState = setData(undefined, {}) // pure func, returns new piece of state 
        expect(newState).toEqual({fixture:[]})
    })

    it('Should return new state if receiving SET_DATA', () => {
        const result = {}
        // for (let i = 0; i < 100; i++) {
        //     result.fixture.push()
        // }
        const newState = setData(undefined, {
            type: SET_DATA, 
            response:result
        })

        expect(newState).toEqual(result)
    })
})

export default test 