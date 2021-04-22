import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store/store'
import {Ipayload} from '../types/appTypes'

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
    textAlign: "center",
}
const ulCss:React.CSSProperties = {
    position: "absolute", 
    top: "35vh",  
    left: "47.5vw",
    display: "inline-flex", 
    listStyle: 'none', 
    cursor: "pointer",
}

export class MaxMiniBLDGArea extends Component<any, Istate> {
    constructor(props:any) {
        super(props) 
        this.state = {
            hoverOnIdx: null, 
            hover: false
        }
    }

    private BLDGAddress = (idx:number): null | string => { // returns building address 
        return this.props.data[idx] === undefined ? null : this.props.data[idx].address
    }

    private maxMinTotalBLDGArea = (data:Ipayload[]):ImaxMiniInfo => { // returns the max or min BLDG area and index location 
        const arrOfNumbers = data.map( (obj:Ipayload) => obj.total_bldg_gross_sq_ft ) 
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
        const maxMiniInfo = this.maxMinTotalBLDGArea(this.props.data)
        const maxBLDGAddress = this.BLDGAddress( maxMiniInfo.maxIdx )
        const minBLDGAddress = this.BLDGAddress( maxMiniInfo.minIdx )
        const volumeBLDGInfoText = ['Biggest Building info', 'Smallest Building info']
        const BLDGSubInfoText = ['Building Area', 'Building Address']
        
        return (
            volumeBLDGInfoText.map( (volumeTypeText:string, outterIdx:number) => {
                let volumeTypeTextStyling:React.CSSProperties = {
                    position: "relative",
                    left: "85%",
                    backgroundColor: (this.state.hoverOnIdx === `${outterIdx}` && this.state.hover) ? " #add8e6" :'#d86969', 
                    width: "15vw", 
                    borderRadius: '5px', 
                    display: "block",
                    padding: "10px 30px",
                }

                let subInfoTextStyling:React.CSSProperties = {
                    position: "relative",
                    left: "85%",
                    display: (this.state.hoverOnIdx === `${outterIdx}` && this.state.hover) ? "block" : "none", 
                    marginTop: '50px', 
                    width: "15vw",
                    background: '#0f84e8',
                    borderRadius: '5px',
                    color: "white", 
                }
                
                return (
                    <div key={outterIdx} style={{width: "45%", padding: "10px 3vw",}}>
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
                <ul style={ulCss}>
                    {this.renderMaxMinBLDGInfo()}
                </ul>
            </div>
        )
    }
}

const msp = (state:AppState) => ({
    data: state.setDataReducer.results
})

export default connect(msp, null)(MaxMiniBLDGArea)
