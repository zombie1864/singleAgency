import {connect} from 'react-redux'
import {GoogleApiWrapper} from 'google-maps-react'
import key from './GKey'
import {Map, Marker, InfoWindow} from 'google-maps-react';
import React, { Component } from 'react'

const containerStyle = {
  position: 'relative',  
  width: '110%',
  height: '750px'
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
                lat: 40.818417, 
                lng: -73.950318
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
                title={'tooltip.'}
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