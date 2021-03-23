import {Ipayload} from '../types/actionCreatorTypes'

export const UPDATE_COORD = 'UPDATE_COORD'

export const updateCoords = (payload:Ipayload) => ({
    type: UPDATE_COORD, 
    payload
})