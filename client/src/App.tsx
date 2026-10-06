import './App.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/index'
import { fetchCatalog } from './features/catalog/catalogSlice.ts'
import { fetchGlobalProduction } from './features/production/productionSlice.ts'

import CountrySelected from './components/CountrySelected.tsx'
import ModeSelection from './features/mode/ModeSelection.tsx'
import VariableSelection from './features/selection/VariableSelection'
import ProductionGraphic from './features/production/ProductionGraphic'
import WorldMap from './components/WorldMap'

function App() {

  const dispatch = useAppDispatch()
      //catalog is fetched once, when the app mounts
    useEffect(() => {
        dispatch(fetchCatalog())
        dispatch(fetchGlobalProduction())
    }, [dispatch])

  return (
    <>
      <div className="screen">
        <ModeSelection />
        <VariableSelection />
        <div className="background">
          <WorldMap />
        </div>
        <section className="mainPanel">
            <div className="content">
                <ProductionGraphic />
                <CountrySelected />              
          </div>
        </section >
      </div >
    </>
  )
}

export default App