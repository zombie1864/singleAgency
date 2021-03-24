import React, { Component } from 'react'

interface Iprops {
    location: {
        state: {
            address: string,
            bdbid: number,
            building_name: string,
            co2eui_breakdown: any[],
            energy_breakdown: any[],
            epapm_primary_function: string,
            latitude: number,
            longitude: number,
            oper_agency_acronym: string,
            outofservice: boolean,
            parent_record_id: number,
            total_bldg_gross_sq_ft: number,
            year_built: string
        }
    }
}

export class DetailsPage extends Component<Iprops> {
    render() {
        console.log( Object.entries(this.props.location.state) );
        
        return (
            <div>
                <h1>DETAILS PAGE</h1>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <td colSpan={2}>header</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <ul>
                                    {Object.entries(this.props.location.state).map( (pair, idx) => {
                                        return pair[0] === "co2eui_breakdown" ? null :
                                         pair[0] === "energy_breakdown" ? null : 
                                         <li key={idx}>{pair[0]} : {pair[1]}</li>
                                    })}
                                </ul>
                            </th>
                            <td> render details </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DetailsPage
