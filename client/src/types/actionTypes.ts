export interface fetchDataAction {
    type: "FETCH_DATA" 
}

export interface dispatchObjAction {
    type: "UPDATE_Obj", 
    payload: {
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
        total_bldg_gross_sg_ft: number, 
        year_built: string 
    }
}