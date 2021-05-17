//actionTypes

export interface updateObjAction {
    type: "UPDATE_OBJ", 
    payload: Ipayload
}

export interface SetDataAction {
    type: "SET_DATA", 
    results: Ipayload[]
}

export interface Ifixture {
    count: number, 
    next:null, 
    previous:null, 
    results: Ipayload[], 
}

export type Ipayload = {
    address: string, 
    bdbid: number, 
    building_name: string, 
    co2eui_breakdown: any, 
    energy_breakdown: any, 
    epapm_primary_function: string, 
    latitude: number, 
    longitude: number, 
    oper_agency_acronym: string, 
    outofservice: boolean, 
    parent_record_id: any, 
    total_bldg_gross_sq_ft: number, 
    year_built: string , 
}

//actionCreatorTypes 

export type fetchDataActionCreator = () => void // dispatch(thunk)

export type setDataActionCreator = (data:Ifixture) => SetDataAction

export type updateObjActionCreator = (payload:Ipayload) => updateObjAction 

//stateShapeType 

export interface InitialState { // used for defining initial and after of state in reducer 
    results: [] | Ipayload[], 
    objFromResults: null | Ipayload
} 

export interface PropsFromState {
    data: [] | Ipayload[], // data.results => (100)[{...},...,{...}]
    objFromResults: null | Ipayload, 
    fetchData: fetchDataActionCreator, 
    updateObj: updateObjActionCreator
} // state shape of app 