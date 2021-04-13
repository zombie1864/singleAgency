import {Ipayload} from './appTypes'

interface storeType {
    setDataReducer: {
        results: Ipayload[] | {}, 
        obj: Ipayload
    }
}

export default storeType