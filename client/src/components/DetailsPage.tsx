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

interface Istate {
    renderCo2eui_breakdown: boolean,
    renderEnergy_breakdown: boolean
}

export class DetailsPage extends Component<Iprops, Istate> {
    constructor(props:any) {
        super(props) 
        this.state = {
            renderCo2eui_breakdown: false,
            renderEnergy_breakdown: false
        }
    }

    private toggleBTWNbreakdown = (value:string):any => {
        return value === "co2" ? this.setState({
            ...this.state, renderCo2eui_breakdown: !this.state.renderCo2eui_breakdown
        }) : 
        value === "energy" ? this.setState({
            ...this.state, renderEnergy_breakdown: !this.state.renderEnergy_breakdown
        }) : null 
    }

    private renderBreakdown = ():JSX.Element => {
        return (
            <p>{
                this.state.renderCo2eui_breakdown ? 'co2 breakdown' : 
                this.state.renderEnergy_breakdown ? 'energy breakdown' : 
                "no data"
            }</p>
        )
    }

    render() {        
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
                                    <li 
                                        onClick={()=> this.toggleBTWNbreakdown("co2")}
                                    >co2eui_breakdown</li>
                                    <li 
                                        onClick={()=> this.toggleBTWNbreakdown("energy")}
                                    >energy_breakdown</li>
                                </ul>
                            </th>
                            <td>{this.renderBreakdown()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DetailsPage
