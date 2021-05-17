import {connect} from 'react-redux'
import {GoogleApiWrapper} from 'google-maps-react'
import {Map, Marker, InfoWindow} from 'google-maps-react';
import React, { Component } from 'react'

const containerStyle = {
  position: 'relative',  
  width:"30vw", 
  height: '90vh', 
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

    InfoWindowClose = () => {
      this.setState({
        ...this.state, 
        showingInfoWindow: !this.state.showingInfoWindow
      })
    }
    
    render() {
      return (
        <div style={{padding: "0 20px"}}>
          <Map google={this.props.google}
              onClick={this.onMapClicked}
              containerStyle={containerStyle}
              initialCenter={{
                lat: 40.818417, 
                lng: -73.950318
              }}
              center={{ 
                lat: this.props.obj === null ? 40.818417 : this.props.obj.latitude,
                lng: this.props.obj === null ? -73.950318 : this.props.obj.longitude
              }}
              >
              <Marker 
                position={{
                  lat: this.props.obj === null ? null: this.props.obj.latitude, 
                  lng: this.props.obj === null ? null: this.props.obj.longitude
                }}
                onClick={this.onMarkerClick} 
                name={'Current location'} 
              />
              {this.state.showingInfoWindow ? (
                <InfoWindow
                visible={this.state.showingInfoWindow}
                position={{
                  lat: this.props.obj.latitude, 
                  lng: this.props.obj.longitude
                }}
                onClose={this.InfoWindowClose}
                > 
                  <div> 
                    <h5> 
                      {
                        Object.entries(this.props.obj)
                          .filter( function(pairs, idx) { return this.indexOf(idx) < 0 }, [3, 4, 6, 7, 8, 9, 10] ) 
                          .map( (pair, idx) => <div key={idx}>{<span>{`${pair[0]}: ${pair[1]}`}</span> }</div> )
                      }
                    </h5>
                  </div>
                </InfoWindow> 
              ) : null }
          </Map>
        </div>
      )
    }
}

const msp = (state) => ({
  obj: state.setDataReducer.objFromResults, 
})

export default connect(msp, null)(GoogleApiWrapper({apiKey:process.env.REACT_APP_API_KEY})(MapContainer))