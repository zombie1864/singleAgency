import { Ipayload } from './actionCreatorTypes'
export type fixture = any

export type Icoord = Ipayload 

interface storeType {
    setDataReducer: fixture
    setCoordReducer: Icoord
}

export default storeType