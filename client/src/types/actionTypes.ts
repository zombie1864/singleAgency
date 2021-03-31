export interface fetchDataAction {
    type: "FETCH_DATA" 
}

export interface updateCoordAction {
    type: "UPDATE_LNG_LAT", 
    payload: {
        lat: number, 
        lng: number 
    }
}