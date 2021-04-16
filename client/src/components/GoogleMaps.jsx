import {connect} from 'react-redux'
import {GoogleApiWrapper} from 'google-maps-react'
import key from './GKey'
import {Map, Marker, InfoWindow} from 'google-maps-react';
import React, { Component } from 'react'

const containerStyle = {
  position: 'relative',  
  width: '110%',
  height: '925px'
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
        <div>
          <Map google={this.props.google}
              onClick={this.onMapClicked}
              containerStyle={containerStyle}
              initialCenter={{
                lat: 40.818417, 
                lng: -73.950318
              }}
              center={{ 
                lat: this.props.store.obj === null ? 40.818417 : this.props.store.obj.latitude,
                lng: this.props.store.obj === null ? -73.950318 : this.props.store.obj.longitude
              }}
              >
              <Marker 
                position={{
                  lat: this.props.store.obj === null ? null: this.props.store.obj.latitude, 
                  lng: this.props.store.obj === null ? null: this.props.store.obj.longitude
                }}
                onClick={this.onMarkerClick} 
                name={'Current location'} 
              />
              {this.state.showingInfoWindow ? (
                <InfoWindow
                visible={this.state.showingInfoWindow}
                position={{
                  lat: this.props.store.obj.latitude, 
                  lng: this.props.store.obj.longitude
                }}
                onClose={this.InfoWindowClose}
                >
                  <div>
                    <h5>{Object.entries(this.props.store.obj).map( (pair, idx) => {
                      return (
                        <div key={idx}>
                          {
                            pair.includes("co2eui_breakdown" ) || 
                            pair.includes("energy_breakdown") || 
                            pair.includes("latitude") || 
                            pair.includes("longitude") || 
                            pair.includes("oper_agency_acronym") || 
                            pair.includes("outofservice") || 
                            pair.includes("parent_record_id") ? 
                            null : 
                            <span>{`${pair[0]}: ${pair[1]}`}</span> 
                          }
                        </div>
                      )
                    })}</h5>
                  </div>
                </InfoWindow> 
              ) : null }
          </Map>
        </div>
      )
    }
}

const msp = (state) => ({
  store: state.setDataReducer, 
})

export default connect(msp, null)(GoogleApiWrapper({apiKey: key})(MapContainer))