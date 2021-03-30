import React, { Component } from 'react'
import { Link } from 'react-router-dom'

interface Iprops {
    match:any, 
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
    renderEnergy_breakdown: boolean, 
    data: any 
}

const breakDownLiCss:React.CSSProperties = {
    cursor: "pointer", 
    color: "blue"
}

const breakdownCss:React.CSSProperties = {
    width: "1500px", 
    overflowX: "scroll", 
}

export class DetailsPage extends Component<Iprops, Istate> {
    constructor(props:any) {
        super(props) 
        this.state = {
            renderCo2eui_breakdown: false,
            renderEnergy_breakdown: false, 
            data: null
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params 
        fetch(`http://127.0.0.1:5000/${id}`)
            .then( (response:any) => {
                return response.json()
            })
            .then( (data:any) => {
                this.setState({ ...this.state, data})
            })
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
            <div style={breakdownCss}>{
                this.state.renderCo2eui_breakdown ?  this.iterateThrBreakdown('CO2 Breakdown'): 
                this.state.renderEnergy_breakdown ? this.iterateThrBreakdown('Energy Breakdown') : 
                "Click on either breakdown to view details"
            }</div>
        )
    }

    private iterateThrBreakdown = (typeOfBreakdown:string):any => {
        let breakdownArr = // DT: [{},...,{}]
            typeOfBreakdown === 'CO2 Breakdown' ? 
            this.state.data.co2eui_breakdown : 
            this.state.data.energy_breakdown
            
        return (
            <div>
                { 
                    breakdownArr.length === 0 ? <p>No data</p> : 
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={Object.keys(breakdownArr[0]).length}>
                                <h5>{`${typeOfBreakdown}`}</h5> 
                                </th>
                            </tr>
                        </thead> 
                        <tbody>
                        <tr className="table-danger">
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
                    </table>
                }
            </div>
        )
    }

    render() {     
        let bdbid = this.state.data  
        const data = this.state.data
        
        if (!bdbid) {
            return null 
        } else {
            bdbid = this.state.data.bdbid
        }
        if (!data) {
            return null 
        }
        return (
            <div>
                <Link to={"/!"}>
                    <button>Home Page</button>
                </Link>
                <h1>DETAILS PAGE</h1>
                <table className="table table-bordered table-hover ">
                    <thead className="thead-dark">
                        <tr>
                            <th colSpan={2}><h3>Viewing bdbid#: {bdbid}</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" style={{width:"450px"}}>
                                <ul>
                                    {Object.entries(data).map( (pair, idx) => {
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
