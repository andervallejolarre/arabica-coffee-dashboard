import './App.css'
import CountryProd from './features/country/CountryProd'
import CountrySelect from './features/country/CountrySelect'
import ProductionGraphic from './features/production/ProductionGraphic'
import WorldMap from './components/WorldMap'
function App() {
  return (
    <>
      <div className="screen">
        <div className="background">
          <WorldMap />
        </div>
        <section className="mainPanel">
            <div className="content">
              <div className="part1">
                <ProductionGraphic />
                <CountryProd />
              </div>
              <CountrySelect />
          </div>
        </section >
      </div >

    </>
  )
}

export default App