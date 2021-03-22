import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMaps from './components/GoogleMaps'
import ListComp from './components/ListComp/ListCompContainer'
import appPropType from './types/appPropType'
import storeType from './types/storeType'
import {fetchData} from './actions/fetchDataAction'

const tableCss:React.CSSProperties = {
  borderCollapse:'collapse',
  border:'1px solid #000000',  
  padding:'0 50px', 
  height:"80vh", 
  width:"100vw"
}

interface connectDispatchProps{ // intestigate into why this works 
  fetchData: any
}

type props = appPropType & connectDispatchProps

class HomePage extends Component<props>{
  
  render() {
    const comps = [<GoogleMaps/>, <ListComp/>]
    return (
      <div className="HomePage">
        <h2>Single Agency</h2>
        <table>
          <tbody>
            <tr>
              {comps.map( (comp, idx) => {
                return <td key={idx}style={tableCss}>{comp}</td>
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );

  }
}

const msp = (state:storeType) => ({
  fixture: state.setDataReducer
})

export default connect(msp, {fetchData})(HomePage);
