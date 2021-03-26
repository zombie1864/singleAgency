import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

const breakDownLiCss:React.CSSProperties = {
    cursor: "pointer", 
    color: "blue"
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
            renderEnergy_breakdown: false,
            renderCo2eui_breakdown: true
        }) : 
        value === "energy" ? this.setState({
            renderCo2eui_breakdown: false,
            renderEnergy_breakdown: true
        }) : null 
    }

    private renderBreakdown = ():JSX.Element => {
        return (
            <div>{
                this.state.renderCo2eui_breakdown ?  this.iterateThrBreakdown('CO2 Breakdown'): 
                this.state.renderEnergy_breakdown ? this.iterateThrBreakdown('Energy Breakdown') : 
                "Click on either breakdown to view details"
            }</div>
        )
    }

    private iterateThrBreakdown = (typeOfBreakdown:string):any => {
        let breakdownArr = // DT: [{},...,{}]
            typeOfBreakdown === 'CO2 Breakdown' ? 
            this.props.location.state.co2eui_breakdown : 
            this.props.location.state.energy_breakdown
            
        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan={Object.keys(breakdownArr[0]).length}>
                            <h5>{`${typeOfBreakdown}`}</h5> 
                        </th>
                    </tr>
                </thead>
                { 
                    breakdownArr.length === 0 ?  <tbody><tr><td>No data</td></tr></tbody> : 
                    <tbody>
                        <tr>
                            {Object.keys(breakdownArr[0]).map( (key:string, idx:number) => {
                                return <th key={idx}>{`${key}`}</th>
                            })}
                        </tr>
                        {
                            breakdownArr.map( (obj:any, idx:number) => {
                                return <tr key={idx}>{
                                        Object.values(obj).map((value:any, idx:number) => {
                                            return <td key={idx}>{`${value}`}</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                }
            </table>
        )
    }

    render() {        
        return (
            <div>
                <Link to={"/!"}>
                    <button>Home Page</button>
                </Link>
                <h1>DETAILS PAGE</h1>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <td colSpan={2}><h3>Viewing bdbid#: {this.props.location.state.bdbid}</h3></td>
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
                                        style={breakDownLiCss}
                                        onClick={()=> this.toggleBTWNbreakdown("co2")}
                                    >co2eui_breakdown</li>
                                    <li 
                                        style={breakDownLiCss}
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
