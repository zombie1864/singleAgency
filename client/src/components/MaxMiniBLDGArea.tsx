import React, { Component } from 'react'
import {Ipayload} from '../types/appTypes'

interface Iprops {
    results: Ipayload[]
}

interface Istate {
    hoverOnIdx: string | null, 
    hover: boolean
}

const utilCompCss:React.CSSProperties = {
    position: "relative",
    top: "-200px",  
    left: '10vh',
    textAlign: "center",
}
const ulCss:React.CSSProperties = {
    position: "absolute", 
    left: "-125px",
    display: "inline-flex", 
    listStyle: 'none', 
    cursor: "pointer"
}

export class MaxMiniBLDGArea extends Component<Iprops, Istate> {
    constructor(props:any) {
        super(props) 
        this.state = {
            hoverOnIdx: null, 
            hover: false
        }
    }

    private BLDGAddress = (idx:number): null | string => { // returns building address 
        return this.props.results[idx] === undefined ? null : this.props.results[idx].address
    }

    private maxMinTotalBLDGArea = (results:Ipayload[]):number[] => { // returns the max or min BLDG area and index location 
        const arrOfNumbers = results.map( (obj:Ipayload) => obj.total_bldg_gross_sq_ft ) 
        const minArea = Math.min.apply(null, arrOfNumbers.filter((number:number) => number !== 0 ));
        const maxArea = Math.max(...arrOfNumbers)
        const maxIdx = arrOfNumbers.indexOf(maxArea)
        const minIdx = arrOfNumbers.indexOf(minArea)
        return [maxArea, minArea, maxIdx, minIdx]
    }

    private toggleHover = (event:any):any => {
        (this.state.hoverOnIdx !== null) && (this.state.hoverOnIdx !== event.target.className) ? this.setState({hoverOnIdx: event.target.className, hover: true}) :
        this.setState({hoverOnIdx: event.target.className, hover: !this.state.hover}) 
    }

    private renderMaxMinBLDGInfo = ():JSX.Element[] => {
        const maxBLDGAddress = this.BLDGAddress( this.maxMinTotalBLDGArea(this.props.results)[2] )
        const minBLDGAddress = this.BLDGAddress( this.maxMinTotalBLDGArea(this.props.results)[3] )
        const volumeBLDGInfoText = ['Biggest Building info', 'Smallest Building info']
        const BLDGSubInfoText = ['Building Area', 'Building Address']
        
        return (
            volumeBLDGInfoText.map( (volumeTypeText:string, outterIdx:number) => {
                let volumeTypeTextStyling:React.CSSProperties = {
                    backgroundColor: (this.state.hoverOnIdx === `${outterIdx}` && this.state.hover) ? " #add8e6" :'#d86969', 
                    width: "200px", 
                    borderRadius: '5px', 
                    display: "block",
                    padding: "10px 30px"
                }

                let subInfoTextStyling:React.CSSProperties = {
                    display: (this.state.hoverOnIdx === `${outterIdx}` && this.state.hover) ? "block" : "none", 
                    marginTop: '50px', 
                    width: "250px",
                    background: '#0f84e8',
                    borderRadius: '5px',
                    color: "white"
                }
                
                return (
                    <div key={outterIdx} style={{width: "300px",padding: "10px 40px"}}>
                        <li style={volumeTypeTextStyling} className={`${outterIdx}`} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>{volumeTypeText}</li> 
                        {BLDGSubInfoText.map( (subInfoText:string, innerIdx:number) => {
                            return (
                                <li key={innerIdx} style={subInfoTextStyling}>{subInfoText} : {
                                    outterIdx === 0 && innerIdx === 0 ? this.maxMinTotalBLDGArea(this.props.results)[innerIdx] : 
                                    outterIdx === 1 && innerIdx === 0 ? this.maxMinTotalBLDGArea(this.props.results)[outterIdx] : 
                                    outterIdx === 0 && innerIdx === 1 ? maxBLDGAddress: minBLDGAddress} {innerIdx === 0 ? 'sq ft' : null
                                    }
                                </li>
                            )
                        })}
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div style={utilCompCss}>
                <h5 style={{padding: "10px 40px"}}>Hover over to show more information</h5>
                <ul style={ulCss}>
                    {this.renderMaxMinBLDGInfo()}
                </ul>
            </div>
        )
    }
}

export default MaxMiniBLDGArea
