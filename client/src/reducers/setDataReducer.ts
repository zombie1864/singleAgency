import { setData, SET_DATA } from '../actions/fetchDataAction'

const initialState =  {fixure: "init"}

const setDataReducer = ( state = initialState, action:any) => {
    switch (action.type) {
        case SET_DATA:
            const { response } = action
            return { ...state, fixture: response}
        default:
            return state 
    }
}

export default setDataReducer