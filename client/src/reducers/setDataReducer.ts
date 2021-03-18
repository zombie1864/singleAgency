import { setData, SET_DATA } from '../actions/fetchDataAction'

const setDataReducer = ( state = {}, action:any) => {
    switch (action.type) {
        case SET_DATA:
            const { response } = action
            return { ...state, fixture: response}
        default:
            return state 
    }
}

export default setDataReducer