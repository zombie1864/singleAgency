import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import img404 from '../images/404.png'

export class ErrPage extends Component {
    render() {
        return (
            <div>
                <div className="position-relative">
                    <img width="600px" className='imgCSS' src={img404} alt="404"/>
                </div>
                <Link to={'/'}>
                    <button className="btn btn-info btnPositionCss">
                        Click to go to Home page
                    </button>
                </Link>
            </div>
        )
    }
}

export default ErrPage
