import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Ipayload} from '../types/appTypes'
import {connect} from 'react-redux'
import {AppState} from '../store/store'
import {Redirect} from 'react-router-dom'

interface Iprops {
    store?:any,
    match:any, 
    location: {
        pathname: string, 
        state: {
            obj: Ipayload
        },
    }, 
}

interface IPropsFromStore {
    data: [] | Ipayload[], 
}

interface Istate { 
    renderBreakdownType: string,
    shouldCompRender404: boolean 
}

type Allprops = IPropsFromStore & Iprops

export class DetailsPage extends Component<Allprops, Istate> {
    constructor(props:any) {
        super(props) 
        this.state = {
            renderBreakdownType: "",
            shouldCompRender404: false 
        }
    }

    private toggle = (event:any):void => this.setState({ renderBreakdownType: event.target.dataset.breakdowntype })

    private renderBreakdown = (obj:Ipayload):JSX.Element => (
        <div className='breakdownCss'>{
            this.state.renderBreakdownType.length !== 0 ? this.iterateThrBreakdown(obj): "Click on either breakdown to view details"
        }</div>
    )
    
    private iterateThrBreakdown = (obj:Ipayload):JSX.Element => {
        let breakdownArr = this.state.renderBreakdownType === "co2eui_breakdown" ? obj.co2eui_breakdown : obj.energy_breakdown // DT: [{},...,{}]
            
        return (
            <div>
                { 
                breakdownArr.length === 0 ? <p>No data</p> : 
                <table>
                    <thead>
                        <tr>
                            <th colSpan={Object.keys(breakdownArr[0]).length}>
                            <h5>{`${this.state.renderBreakdownType}`}</h5> 
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

    private getObjFromReduxStore = (id:number):Ipayload => this.props.data.filter( (obj:Ipayload) => obj.bdbid === id)[0] // gets obj from redux store

    private isIdFoundInData = (id:string):boolean => Object.values(this.props.data).map( (objFromData:Ipayload) => objFromData.bdbid).includes(+id) 

    public componentDidUpdate():null | void { // does final checking of two conditionals on line 84
        if ( 
            ( this.props.location.state === undefined && !this.isIdFoundInData(this.props.match.params.id) ) || 
            this.props.location.pathname.length > 13
        ) {
            return this.setState({ shouldCompRender404: true })
        } else {
            return null 
        }
    } // checking if user puts url address and if /:id !isIdFoundInData(id)

    render() {             
        const {id} = this.props.match.params
        const objFromReduxStore = this.getObjFromReduxStore(+id) 
        let obj
        (this.props.location.state === undefined) ? obj = objFromReduxStore : {obj} = this.props.location.state
        // user injects details/:id directly to url bar <=> this.props.location.state === undefined
        
        return (
            <div>
                {
                this.state.shouldCompRender404 ? <Redirect to={"/404"}/> : 
                obj === undefined ? null: 
                <div>
                    <Link to={"/"}>
                        <button className="btn btn-primary homeBtnCss">Home Page</button>
                    </Link>
                    <h1 className="text-center">DETAILS PAGE</h1>
                    <div className='DetailsPageDivWrapper'>
                        <table className="table table-bordered table-hover tableCSS">
                            <thead className="thead-dark">
                                <tr>
                                    <th colSpan={2}><h3>Viewing bdbid#: {obj.bdbid}</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className='DetailsPageRow'>
                                        <ul>
                                            {Object.entries(obj).map( (pair, idx) => {
                                                return pair[0] === "co2eui_breakdown" ? null :
                                                pair[0] === "energy_breakdown" ? null : 
                                                <li key={idx}>{pair[0]} : {pair[1]}</li>
                                            })}
                                            <li 
                                                className='breakDownLiCss'
                                                data-breakdowntype={"co2eui_breakdown"}
                                                onClick={this.toggle}
                                            >co2eui_breakdown</li>
                                            <li 
                                                className='breakDownLiCss'
                                                data-breakdowntype={"energy_breakdown"}
                                                onClick={this.toggle}
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
