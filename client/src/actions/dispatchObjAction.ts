import {Ipayload} from '../types/actionCreatorTypes'

export const UPDATE_OBJ = 'UPDATE_OBJ'

export const updateObj = (payload:Ipayload) => ({
    type: UPDATE_OBJ, 
    payload
})

export default updateObj