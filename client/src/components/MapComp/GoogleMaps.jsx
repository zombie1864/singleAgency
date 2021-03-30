import {connect} from 'react-redux'
import {GoogleApiWrapper} from 'google-maps-react'
import key from './GKey'
import {Map, Marker} from 'google-maps-react';
import React, { Component } from 'react'

const containerStyle = {
  position: 'relative',  
  width: '100%',
  height: '400px'
}
export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
   
    onMarkerClick = (props, marker, e) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
    
    render() {
      return (
        <div>
          <Map google={this.props.google}
              onClick={this.onMapClicked}
              containerStyle={containerStyle}
              initialCenter={{
                lat: 25.761681, 
                lng: -80.191788
              }}
              center={{
                lat: this.props.coord.lat, 
                lng: this.props.coord.lng
              }}
            >
            <Marker 
              position={{
                lat: this.props.coord.lat, 
                lng: this.props.coord.lng
              }}
              onClick={this.onMarkerClick} 
              name={'Current location'} 
            />
          </Map>
        </div>
      )
    }
}

const msp = (state) => ({
  coord: state.setCoordReducer
})

export default connect(msp, null)(GoogleApiWrapper({apiKey: key})(MapContainer))