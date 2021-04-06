import { Ipayload } from './actionCreatorTypes'

export type fixture = any
export type Iobj = Ipayload 

interface storeType {
    setDataReducer: fixture
    setObjReducer: Iobj
}

export default storeType