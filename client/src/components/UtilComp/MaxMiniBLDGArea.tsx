import React, { Component } from 'react'

interface Iprops {
    fixture: any 
}

const utilCompCss:React.CSSProperties = {
    position: "relative",
    top: "-100px", 
    left: "25px"
}

export class MaxMiniBLDGArea extends Component<Iprops> {

    private BLDGAddress = (idx:number): null | string => {
        return this.props.fixture[idx] === undefined ? null : 
        this.props.fixture[idx].address
    }

    private maxMinTotalBLDGArea = (fixture:any):number[] => {
        const arrOfNumbers = fixture.map( (obj:any) => obj.total_bldg_gross_sq_ft ) 
        const minArea = Math.min.apply(null, arrOfNumbers.filter((number:any) => number !== 0 ));
        const maxArea = Math.max.apply(null, arrOfNumbers.filter((number:any) => number !== 0 ));
        const maxIdx = arrOfNumbers.indexOf(maxArea)
        const minIdx = arrOfNumbers.indexOf(minArea)
        return [maxArea, minArea, maxIdx, minIdx]
    }

    render() {
        const maxBLDGAddress = this.BLDGAddress( this.maxMinTotalBLDGArea(this.props.fixture)[2] )
        const minBLDGAddress = this.BLDGAddress( this.maxMinTotalBLDGArea(this.props.fixture)[3] )
        return (
            <div style={utilCompCss}>
                <h4>Biggest and Smallest Building Area</h4>
                <h5>by sq ft</h5>
                <p>Max Building Area: {this.maxMinTotalBLDGArea(this.props.fixture)[0]} sq ft</p>
                <p>Max Building Address: {maxBLDGAddress}</p>
                <p>Min Building Area: {this.maxMinTotalBLDGArea(this.props.fixture)[1]} sq ft</p>
                <p>Min Building Address: {minBLDGAddress}</p>
            </div>
        )
    }
}

export default MaxMiniBLDGArea
