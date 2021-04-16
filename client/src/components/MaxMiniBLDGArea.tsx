import React, { Component } from 'react'
import {Ipayload} from '../types/appTypes'

interface Iprops {
    results: Ipayload[]
}

interface Istate {
    hoverOnIdx: string | null, 
    hover: boolean
}

interface ImaxMiniInfo {
    maxArea: number,
    minArea: number,
    maxIdx: number,
    minIdx: number
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

    private maxMinTotalBLDGArea = (results:Ipayload[]):ImaxMiniInfo => { // returns the max or min BLDG area and index location 
        const arrOfNumbers = results.map( (obj:Ipayload) => obj.total_bldg_gross_sq_ft ) 
        return {
            maxArea: Math.max(...arrOfNumbers), // Math.max(...arrOfNumbers)
            minArea: Math.min.apply(null, arrOfNumbers.filter((number:number) => number !== 0 )),
            maxIdx: arrOfNumbers.indexOf(Math.max(...arrOfNumbers)),
            minIdx: arrOfNumbers.indexOf(Math.min.apply(null, arrOfNumbers.filter((number:number) => number !== 0 )))
        }
    }

    private toggleHover = (event:any):void | null => {
        (this.state.hoverOnIdx !== null) && (this.state.hoverOnIdx !== event.target.className) ? this.setState({hoverOnIdx: event.target.className, hover: true}) :
        this.setState({hoverOnIdx: event.target.className, hover: !this.state.hover}) 
    }

    private renderMaxMinBLDGInfo = ():JSX.Element[] => {
        const maxMiniInfo = this.maxMinTotalBLDGArea(this.props.results)
        const maxBLDGAddress = this.BLDGAddress( maxMiniInfo.maxIdx )
        const minBLDGAddress = this.BLDGAddress( maxMiniInfo.minIdx )
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
                                    outterIdx === 0 && innerIdx === 0 ? maxMiniInfo.maxArea : 
                                    outterIdx === 1 && innerIdx === 0 ? maxMiniInfo.minArea : 
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
