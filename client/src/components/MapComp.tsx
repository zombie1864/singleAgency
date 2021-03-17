import React, { Component } from 'react'

// function initMap() {
//     let options = {
//         zoom: 10, 
//         center: { lat:40.818417, lng: -73.950318 }
//     };
//     let map = new google.maps.Map(document.getElementById("map"), options);
// }

const mapCss:React.CSSProperties = { 
    width: "50%", 
    height: "400px"
}
export class MapComp extends Component {
    render() {

        return (
            <div id="map" style={mapCss}>
                <h1>MAP COMP</h1>
                <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACIaoXM5khxJYc827L7Eq74OtnmPffMA0&callback=initMap"></script>
            </div>
        )
    }
}

export default MapComp


/**
 * <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyACIaoXM5khxJYc827L7Eq74OtnmPffMA0&callback=initMap"></script>
 * 
 */