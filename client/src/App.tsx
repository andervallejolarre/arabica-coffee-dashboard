import './App.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/index'
import { fetchCatalog } from './features/catalog/catalogSlice.ts'

import CountryProd from './components/CountryProd'
import CountrySelect from './features/selection/VariableSelection'
import ProductionGraphic from './features/production/ProductionGraphic'
import WorldMap from './components/WorldMap'
function App() {

  const dispatch = useAppDispatch()
      //catalog is fetched once, when the app mounts
    useEffect(() => {
        dispatch(fetchCatalog())
    }, [dispatch])

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