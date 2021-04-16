import {Route,Switch} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import ErrPage from './pages/404Page'

const appCss:React.CSSProperties = {
    background: "linear-gradient(#d7fadc, #85bed4)",
    height:"100vh",
}

const App = () => (
    <div style={appCss}>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/details/:id" component={DetailsPage}/>
            <Route path="/404" component={ErrPage}/>
            <Route component={ErrPage}/>
        </Switch>
    </div>
)

export default App 