import {SET_DATA} from '../actions/index'
import setDataReducer from '../reducers/rootReducer'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch'
import {setData} from '../actions/index'
import Dummy from '../components/Dummy'
import ListComp from '../components/ListComp'
import App from '../app'
import React from 'react'
import {findByTestAttr, testStore} from '../../Utils'
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
    beforeEach(() => wrapper = setUpDemo() )

    it('should render w.o err', () => {
        const component = findByTestAttr(wrapper, 'dummyComp')
        expect(component.length).toBe(1)
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

const setUpApp = (initialState={}) => {
    const store = testStore(initialState)
    const wrapper = shallow(<App store={store}/>).childAt(0).dive()
    // console.log(wrapper.debug());
    return wrapper
}

// for connected comp .childAt(0) rm <Context Provider/> 
/**
 * <Context Provider value ={{...}}>
 *      <App store={{...}} msp={{...}} mdp={{...}}/>
 * </Context Provider> 
 */

// .dive() allows to access content inside comp 

// to test connect comp you have to mock the store and dive into the connected comp 

describe('App', () => {
    let wrapper 
    beforeEach( () => {
        const initialState = {
            setDataReducer: {
                obj: null, 
                results: []
            }
        }
        wrapper = setUpApp(initialState)
    })
    it("should render w.o err", () => {
        const component = findByTestAttr(wrapper, "App")
        expect(component.length).toBe(1)
    })
})


const setUpListComp = (initialState={}) => {
    const store = testStore(initialState)
    const wrapper = shallow(<ListComp store={store}/>).childAt(0).dive()
    // console.log(wrapper.debug()); // you can see the testData being rendered 
    return wrapper
}


describe("ListComp", () => {
    let wrapper 
    let initialState
    beforeEach( () => {
        initialState = {
            setDataReducer: {
                obj: null, 
                results: [
                    {
                        address: "addressTest1", 
                        bdbid: 1234, 
                        building_name: "buildingNameTest1", 
                        co2eui_breakdown: [
                            {
                            "bdbid": 1217,
                            "bldg_sqft": 192000,
                            "co2emissions_kg_sqft_site": 4.6839056,
                            "co2emissions_kg_sqft_source": 7.383769,
                            "fiscal_year": 2019,
                            "id": 145000,
                            "site_eui": 80.69169,
                            "source_eui": 117.46657,
                            "total_co2emissions_kg_site": 899309.8,
                            "total_co2emissions_kg_source": 1417683.6,
                            "total_site_energy_kbtu": 15492804,
                            "total_source_energy_kbtu": 22553582,
                            "updated_on": "2021-02-10T10:24:53.575000-05:00"
                            }
                            ], 
                        energy_breakdown: "energyBreakdownTest1", 
                        epapm_primary_function: "epapmTest1", 
                        latitude: 0.0, 
                        longitude: 0.0, 
                        oper_agency_acronym: "operTest1", 
                        outofservice: false, 
                        parent_record_id: "parentTest1", 
                        total_bldg_gross_sq_ft: 1901, 
                        year_built: "yearBuiltTest1" , 
                    }, 
                    {
                        address: "addressTest2", 
                        bdbid: 5678, 
                        building_name: "buildingNameTest2", 
                        co2eui_breakdown: [
                            {
                            "bdbid": 1217,
                            "bldg_sqft": 192000,
                            "co2emissions_kg_sqft_site": 4.6839056,
                            "co2emissions_kg_sqft_source": 7.383769,
                            "fiscal_year": 2019,
                            "id": 145000,
                            "site_eui": 80.69169,
                            "source_eui": 117.46657,
                            "total_co2emissions_kg_site": 899309.8,
                            "total_co2emissions_kg_source": 1417683.6,
                            "total_site_energy_kbtu": 15492804,
                            "total_source_energy_kbtu": 22553582,
                            "updated_on": "2021-02-10T10:24:53.575000-05:00"
                            }
                            ], 
                        energy_breakdown: "energyBreakdownTest2", 
                        epapm_primary_function: "epapmTest2", 
                        latitude: 0.0, 
                        longitude: 0.0, 
                        oper_agency_acronym: "operTest2", 
                        outofservice: false, 
                        parent_record_id: "parentTest2", 
                        total_bldg_gross_sq_ft: 1902, 
                        year_built: "yearBuiltTest2" , 
                    }, 
                    {
                        address: "addressTest3", 
                        bdbid: 9012, 
                        building_name: "buildingNameTest3", 
                        co2eui_breakdown: [
                            {
                            "bdbid": 1217,
                            "bldg_sqft": 192000,
                            "co2emissions_kg_sqft_site": 4.6839056,
                            "co2emissions_kg_sqft_source": 7.383769,
                            "fiscal_year": 2019,
                            "id": 145000,
                            "site_eui": 80.69169,
                            "source_eui": 117.46657,
                            "total_co2emissions_kg_site": 899309.8,
                            "total_co2emissions_kg_source": 1417683.6,
                            "total_site_energy_kbtu": 15492804,
                            "total_source_energy_kbtu": 22553582,
                            "updated_on": "2021-02-10T10:24:53.575000-05:00"
                            }
                            ], 
                        energy_breakdown: "energyBreakdownTest3", 
                        epapm_primary_function: "epapmTest3", 
                        latitude: 0.0, 
                        longitude: 0.0, 
                        oper_agency_acronym: "operTest3", 
                        outofservice: false, 
                        parent_record_id: "parentTest3", 
                        total_bldg_gross_sq_ft: 1903, 
                        year_built: "yearBuiltTest3" , 
                    }, 
                ]
            }
        }
        wrapper = setUpListComp(initialState)
    })

    it('Should render w.o err', () => {
        const component = findByTestAttr(wrapper, "ListComp")
        expect(component.length).toBe(1)
    })

    test('searchBarOnChangeHandler, should update searchTerm', () => {
        const classInstance = wrapper.instance()
        classInstance.searchBarOnChangeHandler({target: { value: 'addressTest3'} })
        const updatedSearchTerm = classInstance.state.searchTerm 
        expect(updatedSearchTerm).toBe('addressTest3')

    })

    test('filterSearchResult, should return an array w a single object that match the searchTerm addressTest3', () => {
        const classInstance = wrapper.instance()
        classInstance.searchBarOnChangeHandler({target: { value: 'addressTest3'} })
        const returnedArray = classInstance.filterSearchResult()
        expect(returnedArray).toEqual([ initialState.setDataReducer.results[2] ])
    })

    test('filterSearchResult, should return an array of objects that match the searchTerm addressTest', () => {
        const classInstance = wrapper.instance()
        classInstance.searchBarOnChangeHandler({target: { value: 'addressTest'} })
        const returnedArray = classInstance.filterSearchResult()
        expect(returnedArray).toEqual(initialState.setDataReducer.results)
    })

    test('filterSearchResult, should return an empty array for searchTerm MX3', () => {
        const classInstance = wrapper.instance()
        classInstance.searchBarOnChangeHandler({target: { value: 'MX3'} })
        const returnedArray = classInstance.filterSearchResult()
        expect(returnedArray).toEqual([])
    })
})
export default test 