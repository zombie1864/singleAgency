import MapComp from './components/MapComp'
import SearchComp from './components/SearchComp'
import ListComp from './components/ListComp'
function HomePage() {
  return (
    <div className="HomePage">
      <MapComp/>
      <SearchComp/>
      <ListComp/>
    </div>
  );
}

export default HomePage;
