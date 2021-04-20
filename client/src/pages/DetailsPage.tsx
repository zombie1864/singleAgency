import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Ipayload, PropsFromState} from '../types/appTypes'
import {connect} from 'react-redux'
import {AppState} from '../store/store'
import {Redirect} from 'react-router-dom'

interface Iprops {
    match:any, 
    location: {
        state: {
            obj: Ipayload
        }
    }, 
}

interface Istate { 
    renderCo2eui_breakdown: boolean,
    renderEnergy_breakdown: boolean, 
    shouldCompRender404: boolean 
}

const breakDownLiCss:React.CSSProperties = {
    cursor: "pointer", 
    color: "blue"
}

const breakdownCss:React.CSSProperties = {
    maxWidth: "1400px", 
    overflowX: "scroll", 
}

const homeBtnCss:React.CSSProperties = {
    marginLeft: "50px", 
    marginTop: "10px"
}

const tableCSS:React.CSSProperties = {
    width: "95%"
}

type Allprops = PropsFromState & Iprops 

export class DetailsPage extends Component<Allprops, Istate> {
    constructor(props:any) {
        super(props) 
        this.state = {
            renderCo2eui_breakdown: false,
            renderEnergy_breakdown: false, 
            shouldCompRender404: false 
        }
    }

    private toggle = (breakDown:string):null | void => {
        return breakDown === "co2eui_breakdown" ? this.setState({
            renderEnergy_breakdown: false,
            renderCo2eui_breakdown: true
        }) : 
        breakDown === "energy_breakdown" ? this.setState({
            renderCo2eui_breakdown: false,
            renderEnergy_breakdown: true
        }) : null 
    }

    private renderBreakdown = (obj:Ipayload):JSX.Element => {
        return (
            <div style={breakdownCss}>{
                this.state.renderCo2eui_breakdown ?  this.iterateThrBreakdown('CO2 Breakdown',obj): 
                this.state.renderEnergy_breakdown ? this.iterateThrBreakdown('Energy Breakdown',obj) : 
                "Click on either breakdown to view details"
            }</div>
        )
    }
     
    private getObjFromReduxStore = (id:number):Ipayload => this.props.data.filter( (obj:Ipayload) => obj.bdbid === id)[0] // gets obj from redux store

    private isIdFoundInData = (id:string):boolean => Object.values(this.props.data).map( (objFromData:Ipayload) => objFromData.bdbid).includes(+id) 

    public componentDidUpdate():null | void { // does final checking of two conditionals on line 84
        if ( this.props.location.state === undefined && !this.isIdFoundInData(this.props.match.params.id) ) {
            return this.setState({...this.state, shouldCompRender404: true})
        } else {
            return null 
        }
    } // checking if user puts url address and if /:id !isIdFoundInData(id)

    private iterateThrBreakdown = (typeOfBreakdown:string, obj:Ipayload):JSX.Element => {
        let breakdownArr = // DT: [{},...,{}]
            typeOfBreakdown === 'CO2 Breakdown' ? 
            obj.co2eui_breakdown : 
            obj.energy_breakdown
            
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
        const {id} = this.props.match.params
        const objFromReduxStore = this.getObjFromReduxStore(+id) 
        let obj
        (this.props.location.state === undefined) ? obj = objFromReduxStore : {obj} = this.props.location.state
        // user injects details/:id directly to url bar <=> this.props.location.state === undefined
        
        return (
            <div>
                {
                    this.state.shouldCompRender404 ? <Redirect to="/404"/> : 
                    obj === undefined ? null: 
                    <div>
                        <Link to={"/"}>
                            <button className="btn btn-primary" style={homeBtnCss}>Home Page</button>
                        </Link>
                        <h1 className="text-center">DETAILS PAGE</h1>
                        <div style={{paddingLeft: "50px"}}>
                            <table className="table table-bordered table-hover" style={tableCSS}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th colSpan={2}><h3>Viewing bdbid#: {obj.bdbid}</h3></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" style={{width:"450px"}}>
                                            <ul>
                                                {Object.entries(obj).map( (pair, idx) => {
                                                    return pair[0] === "co2eui_breakdown" ? null :
                                                    pair[0] === "energy_breakdown" ? null : 
                                                    <li key={idx}>{pair[0]} : {pair[1]}</li>
                                                })}
                                                <li 
                                                    style={breakDownLiCss}
                                                    onClick={()=> this.toggle("co2eui_breakdown")}
                                                >co2eui_breakdown</li>
                                                <li 
                                                    style={breakDownLiCss}
                                                    onClick={()=> this.toggle("energy_breakdown")}
                                                >energy_breakdown</li>
                                            </ul>
                                        </th>
                                        <td>{this.renderBreakdown(obj)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>  
                }
            </div>
        )
    }
}

const msp = (state:AppState) => ({
    data: state.setDataReducer.results, 
})

export default connect(msp, null)(DetailsPage)
