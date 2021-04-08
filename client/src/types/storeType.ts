import { Ipayload } from './actionTypes'

export type fixture = any

interface storeType {
    setDataReducer: fixture
    setObjReducer: Ipayload
}

export default storeType