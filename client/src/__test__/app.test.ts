import {SET_DATA} from '../actions/fetchDataAction'
import setDataReducer from '../reducers/setDataReducer'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch'
import {setData} from '../actions/fetchDataAction'

//testing reducer for state change 
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
            type: SET_DATA, 
            fixture:data.results
        })

        expect(newState).toEqual(result)
    })
})

//testing api calls 
const mockStore = configureMockStore([thunk])

// different from fetchData in fetchDataActions.ts
// requires THIS function signature 
const fetchData = () => async (dispatch:any) => {
    const response = await fetch("http://127.0.0.1:5000/")
    const json = await response.json()
    dispatch(setData(json))
}

describe('testing async action creator', () => {
  let store:any;
  let fetchDataDemoData = [
        {
            count: 100, 
            next: null, 
            previous:null, 
            results: [
                {test1: 'test'},
            ]
        }
    ]
  beforeEach(() => store = mockStore({}));
  afterEach(() => nock.cleanAll() // clear all HTTP mocks after each test
  );

  it('dispatch setData on succesful api call', () => {
    // Simulate a successful response
    nock("http://127.0.0.1:5000/")
      .get('/') // Route to catch and mock
      .reply(200, fetchDataDemoData); // Mock reponse code and data

    // Dispatch action to fetch to-dos
    return store.dispatch(fetchData())
      .then(() => expect(store.getActions()).toMatchSnapshot() // return of async actions
    )
  })
});

export default test 