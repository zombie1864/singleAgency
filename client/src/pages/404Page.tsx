import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import img404 from '../images/404.png'

const imgCSS:React.CSSProperties = {
    position: "fixed",
    top: "25%",
    left: "45%",
    marginTop: "-50px",
    marginLeft: "-100px"
}

const btnPositionCss:React.CSSProperties  ={
    position: "absolute",
    top: "58%", 
    left: "50%",
}

export class ErrPage extends Component {
    render() {
        return (
            <div>
                <div className="position-relative">
                    <img width="600px" style={imgCSS} src={img404} alt="404"/>
                </div>
                <Link to={'/'}>
                    <button className="btn btn-info" style={btnPositionCss}>
                        Click to go to Home page
                    </button>
                </Link>
            </div>
        )
    }
}

export default ErrPage
