import React, { Component } from 'react'

interface Iprops {
    // address: string,
    // bdbid: number,
    // building_name: string,
    // co2eui_breakdown: any[],
    // energy_breakdown: any[],
    // epapm_primary_function: string,
    // latitude: number,
    // longitude: number,
    // oper_agency_acronym: string,
    // outofservice: boolean,
    // parent_record_id: number,
    // total_bldg_gross_sq_ft: number,
    // year_built: string
    location: any 
}

export class DetailsPage extends Component<Iprops> {
    render() {
        console.log(this.props.location.state);
        
        return (
            <div>
                <h1>DETAILS PAGE</h1>
                <h2>{this.props.location.state.address}</h2>
            </div>
        )
    }
}

export default DetailsPage
