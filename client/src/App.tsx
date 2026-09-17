import './App.css'
import CountryProd from './features/country/CountryProd'
import CountrySelect from './features/country/CountrySelect'
import ProductionGraphic from './features/production/ProductionGraphic'
function App() {
  return (
    <>
      <div className="screen">
        <div className="background">
          <p>COFFEE</p>
          <p>CHARTS</p>
        </div>
        <section className="mainPanel">
          <div className="frame">
            <div className="content">
              <div>
                <ProductionGraphic />
                <CountryProd />
              </div>
              <CountrySelect />
            </div>
          </div>
        </section >
      </div >

    </>
  )
}

export default App