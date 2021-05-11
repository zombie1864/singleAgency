import {SET_DATA} from '../actions/index'
import setDataReducer from '../reducers/rootReducer'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch'
import {setData} from '../actions/index'
import ListComp from '../components/ListComp'
import DetailsPage from '../pages/DetailsPage'
import { testStore, initialState, mockData } from '../../Utils'
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
const fetchData = () => async (dispatch:any) => {
    const response = await fetch("http://127.0.0.1:5000/")
    const json = await response.json()
    dispatch(setData(json))
}

describe('testing async action creator', () => {
  let store:any;

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

const setUpListComp = (initialState={}) => {
    const store = testStore(initialState)
    const wrapper = shallow(<ListComp store={store}/>).childAt(0).dive()
    // console.log(wrapper.debug()); // 
    return wrapper
}

const searchInputTest = {
    case: {
        _1 : 'MX3', 
        _2 : '  ', 
        _3 : 'address  Test4', 
        _4 : '0000', 
        _5 : '2089', 
        _6 : 'true',
        _7 : '@addressTest2',
        _8 : 'AddressTest1',
        _9 : 'addRESStest1',
        _10 : 'addressTe',
        _11 : ' address', 
        _12 : 'address Test4 ',
        _13 : '123 4', 
        _14 : '1234E', 
        _15: ' ', 
        _16: ' (',
    }
}

describe("ListComp", () => {
    let wrapper,
        classInstance:any

    beforeEach( () => {
        wrapper = setUpListComp(initialState)
        classInstance = wrapper.instance()
    })   

    describe("filterSearchResult", () => {
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._1}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._1} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._2}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._2} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._3}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._3} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._4}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._4} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._5}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._5} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._6}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._6} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._7}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._7} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._8}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._8} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([initialState.setDataReducer.results[0]])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._9}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._9} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([initialState.setDataReducer.results[0]])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._10}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._10} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual( initialState.setDataReducer.results.slice(0,3) )
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._11}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._11} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._12}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._12} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._13}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._13} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._14}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._14} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual([])
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._15}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._15} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual( initialState.setDataReducer.results.slice(1) )
        }) 
        test(`filterSearchResult, should return an empty array for searchTerm ${searchInputTest.case._16}`, () => {
            classInstance.searchBarOnChangeHandler({target: { value: searchInputTest.case._16} })
            const returnedArray = classInstance.filterSearchResult()
            expect(returnedArray).toEqual( initialState.setDataReducer.results.slice(1,3) )
        }) 
    })

})
const setUpDetailsPage = (initialState:any={}, props={
        match: {
            params: {
                id: "1234"
            }
        }, 
        location: {
            pathname: '/test',
            state: {
                obj: initialState.setDataReducer.results[0]
            }
        },
        data: []
    }) => {
    const store = testStore(initialState)
    const wrapper = shallow(<DetailsPage store={store} {...props}/>).childAt(0).dive()
    return wrapper
}

describe('DetailsPage', () => {
    let wrapper, 
        classInstance:any 
    
    beforeEach( () => {
        wrapper = setUpDetailsPage(initialState)
        classInstance = wrapper.instance()
    })
    
    describe("getObjFromReduxStore", () => {
        test('getObjFromReduxStore takes in a valid bdbid as an argument and returns an object from props.data that matches the id', () => {
            const returnedObj = classInstance.getObjFromReduxStore(1234)
            expect(returnedObj).toEqual(initialState.setDataReducer.results[0])
        })
        test('getObjFromReduxStore takes in an invalid bdbid as an argument and returns undefined', () => {
            const returnedObj = classInstance.getObjFromReduxStore(0o00)
            expect(returnedObj).toBeUndefined()
        })
    })

    describe("isIdFoundInData", () => {
        test("isIdFoundInData, takes in a string id argument and should return a boolean indicating if the id is found in the data from this.props.data", () => {
            const returnedValue = classInstance.isIdFoundInData("1234")
            expect(returnedValue).toBe(true)
        })
        test("isIdFoundInData, should return a false if the id is not found in the data from this.props.data", () => {
            const returnedValue = classInstance.isIdFoundInData("0123")
            expect(returnedValue).toBe(false)
        })
    })
})
export default test 