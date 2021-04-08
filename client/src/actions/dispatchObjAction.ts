import {Ipayload} from '../types/actionTypes'

export const UPDATE_OBJ = 'UPDATE_OBJ'

export const updateObj = (payload:Ipayload) => ({
    type: UPDATE_OBJ, 
    payload
})

export default updateObj