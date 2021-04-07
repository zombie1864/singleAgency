import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropsFromState from '../types/PropsFromState'
import {connect} from 'react-redux'
import storeType from '../types/storeType'
import {fetchData} from '../actions/fetchDataAction'
import {Redirect} from 'react-router-dom'

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
    renderEnergy_breakdown: boolean
}

const breakDownLiCss:React.CSSProperties = {
    cursor: "pointer", 
    color: "blue"
}

const breakdownCss:React.CSSProperties = {
    width: "1500px", 
    overflowX: "scroll", 
}

const homeBtnCss:React.CSSProperties = {
    margin: "10px"
}

type Allprops = PropsFromState & Iprops

export class DetailsPage extends Component<Allprops, Istate> {
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

    private renderBreakdown = (state:any):JSX.Element => {
        return (
            <div style={breakdownCss}>{
                this.state.renderCo2eui_breakdown ?  this.iterateThrBreakdown('CO2 Breakdown',state): 
                this.state.renderEnergy_breakdown ? this.iterateThrBreakdown('Energy Breakdown',state) : 
                "Click on either breakdown to view details"
            }</div>
        )
    }

    private iterateThrBreakdown = (typeOfBreakdown:string, state:any):any => {
        let breakdownArr = // DT: [{},...,{}]
            typeOfBreakdown === 'CO2 Breakdown' ? 
            state.co2eui_breakdown : 
            state.energy_breakdown
            
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

    public componentDidMount() { 
        this.props.fetchData()
    }
    
    private sliceOfData = (id:number) => {
        return this.props.data.fixture.filter( (obj:any) => obj.bdbid === id ? obj : null)[0]
    }

    render() {     
        let slicedData = this.sliceOfData(+this.props.match.params.id)
        let {state} = this.props.location
        if (state === undefined) state = slicedData
        return (
            <div>
                {
                    state === undefined ? <Redirect to="/404"/>: 
                    <div>
                        <Link to={"/"}>
                            <button className="btn btn-primary" style={homeBtnCss}>Home Page</button>
                        </Link>
                        <h1 className="text-center">DETAILS PAGE</h1>
                        <table className="table table-bordered table-hover ">
                            <thead className="thead-dark">
                                <tr>
                                    <th colSpan={2}><h3>Viewing bdbid#: {state.bdbid}</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" style={{width:"450px"}}>
                                        <ul>
                                            {Object.entries(state).map( (pair, idx) => {
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
                                    <td>{this.renderBreakdown(state)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>  
                }
            </div>
        )
    }
}

const msp = (state:storeType) => ({
    data: state.setDataReducer
})

const mdp =(dispatch:any) => ({
    fetchData: () => dispatch(fetchData()), 
})

export default connect(msp, mdp)(DetailsPage)