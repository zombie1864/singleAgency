import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import key from './GKey'

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
   
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
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
        <Map google={this.props.google}
            onClick={this.onMapClicked}
            containerStyle={containerStyle}
            initialCenter={{
              lat: 40.818417,
              lng: -73.950318
            }}
          >
          <Marker onClick={this.onMarkerClick} name={'Current location'} />
        </Map>
      )
    }
}

export default GoogleApiWrapper({
apiKey: (key)
})(MapContainer)