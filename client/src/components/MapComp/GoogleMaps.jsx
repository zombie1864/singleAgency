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
      reRender: false 
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
    
    componentDidUpdate(prevProps, prevState) {
      return prevProps.coord.lat !== this.props.coord.lat ? this.setState({...this.state, reRender: !this.state.reRender}) : null 
    }
    

    render() {
      return (
        <div>
          <p>currCoords: {this.props.coord.lat}, {this.props.coord.lng}</p>
          <Map google={this.props.google}
              onClick={this.onMapClicked}
              containerStyle={containerStyle}
              initialCenter={{
                lat: this.props.coord.lat,
                lng: this.props.coord.lng
              }}
            >
            <Marker onClick={this.onMarkerClick} name={'Current location'} />
          </Map>
        </div>
      )
    }
}

export default MapContainer