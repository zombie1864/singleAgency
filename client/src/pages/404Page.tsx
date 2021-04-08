import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const imgCSS:React.CSSProperties = {
    position: "fixed",
    top: "25%",
    left: "45%",
    marginTop: "-50px",
    marginLeft: "-100px"
}

const btnPositionCss:React.CSSProperties  ={
    position: "absolute",
    top: "55%", 
    left: "50%",
}

export class ErrPage extends Component {
    render() {
        return (
            <div>
                <div className="position-relative">
                    <img width="600px" style={imgCSS} src="https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Crying-Baby-Page.png" alt="404"></img>
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
