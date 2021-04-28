import {SET_DATA} from '../actions/index'
import setDataReducer from '../reducers/rootReducer'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch'
import {setData} from '../actions/index'
import Dummy from '../components/Dummy'
import ListComp from '../components/ListComp'
import {shallow, configure} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

//testing reducer for state change 
describe('setDataReducer', () => {
    it('should return default state', () => {
        const reduxStoreState = {
            setDataReducer: {
                obj: null,
                results: [] 
            }
        }
        const action = {type:""}

        expect(setDataReducer(undefined, action)).toEqual(reduxStoreState)
    })

    it('Should return new state if receiving SET_DATA', () => {
        const reduxStoreState = {
            setDataReducer: {
                obj: null,
                results: [
                    {
                        address: "test", 
                        bdbid: 1234, 
                        building_name: "test", 
                        co2eui_breakdown: "test", 
                        energy_breakdown: "test", 
                        epapm_primary_function: "test", 
                        latitude: 0.0, 
                        longitude: 0.0, 
                        oper_agency_acronym: "test", 
                        outofservice: false, 
                        parent_record_id: "test", 
                        total_bldg_gross_sq_ft: 1900, 
                        year_built: "test" , 
                    }
                ]
            }
        }

        const mockData = {
            count: 1, 
            next: null, 
            previous: null, 
            results: [
                {
                    address: "test", 
                    bdbid: 1234, 
                    building_name: "test", 
                    co2eui_breakdown: "test", 
                    energy_breakdown: "test", 
                    epapm_primary_function: "test", 
                    latitude: 0.0, 
                    longitude: 0.0, 
                    oper_agency_acronym: "test", 
                    outofservice: false, 
                    parent_record_id: "test", 
                    total_bldg_gross_sq_ft: 1900, 
                    year_built: "test" , 
                }
            ]
        }

        expect(setDataReducer(undefined, {
            type: SET_DATA, 
            results: mockData.results
        })).toEqual(reduxStoreState)
    })
})

//testing api calls 
const mockStore = configureMockStore([thunk])

// different from fetchData in fetchDataActions.ts
// requires THIS function signature 
const fetchData = () => async (dispatch) => {
    const response = await fetch("http://127.0.0.1:5000/")
    const json = await response.json()
    dispatch(setData(json))
}

describe('testing async action creator', () => {
  let store;
  const mockData = {
      count: 1, 
      next: null, 
      previous: null, 
      results: [
          {
            address: "test", 
            bdbid: 1234, 
            building_name: "test", 
            co2eui_breakdown: "test", 
            energy_breakdown: "test", 
            epapm_primary_function: "test", 
            latitude: 0.0, 
            longitude: 0.0, 
            oper_agency_acronym: "test", 
            outofservice: false, 
            parent_record_id: "test", 
            total_bldg_gross_sq_ft: 1900, 
            year_built: "test" , 
          }
        ]
    }

    const mockSetData = [{
        type: "SET_DATA", 
        results: mockData.results
    }]
  beforeEach(() => store = mockStore({ // initial store 
      obj: null,
      results: [] 
    }));
  afterEach(() => nock.cleanAll()) // clear all HTTP mocks after each test

  it('dispatch setData on succesful api call', () => {
    // Simulate a successful response
    nock("http://127.0.0.1:5000/")
      .get('/') // Route to catch and mock
      .reply(200, mockData); // Mock reponse code and data

    // Dispatch action to fetch data
    return store.dispatch(fetchData())
      .then(() => expect(store.getActions()).toEqual(mockSetData) // return of async actions
    )
  })
});

const setUpDemo = (props={}) => shallow(<Dummy {...props}/>)


describe('dummy comp', () => {
    let wrapper 
    beforeEach(() => {
        wrapper = setUpDemo()
    })
    
    test ('updateStateHandler method should update state', () => {
        const classInstance = wrapper.instance()
        classInstance.updateStateHandler()
        const updatedState = classInstance.state.renderText
        expect(updatedState).toBe(true)
        
    })
    
    test('returnText method should returns a str', () => {
        const classInstance = wrapper.instance()
        const strValue = classInstance.returnText()
        expect(strValue).toBe('Some txt here')
    })
})

// const setUpListComp = (props={}) => shallow(<ListComp {...props}/>)

// describe('ListComp', () => {
//     let wrapper 
//     beforeEach( () => {
//         wrapper = setUpListComp()
//     })
//     test("filterSearchResult should return an array of objetcs", () => {

//     })
// })

export default test 