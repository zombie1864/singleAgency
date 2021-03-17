import GoogleMaps from './components/GoogleMaps'
import ListComp from './components/ListComp'

const tableCss:React.CSSProperties = {
  borderCollapse:'collapse',
  border:'1px solid #000000',  
  padding:'0 50px', 
  height:"80vh", 
  width:"100vw"
}

function HomePage() {
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

export default HomePage;
