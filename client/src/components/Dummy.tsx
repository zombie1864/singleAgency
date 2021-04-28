import React, { Component } from 'react'

interface Istate {
    renderText: boolean
}

export class Dummy extends Component<{}, Istate> {
    constructor(props:any) {
        super(props)
        this.state = {
            renderText: false 
        }
    }

    private updateStateHandler = ():void => {
        let {renderText} = this.state
        this.setState({renderText: !renderText})
    }

    private returnText = () => "Some txt here"

    render() {
        return (
            <div>
                <button onClick={this.updateStateHandler}></button>
                <p>{this.state.renderText ? this.returnText : null }</p>
            </div>
        )
    }
}

export default Dummy
