import './App.css'
import { useEffect } from 'react'
import { useAppDispatch} from './hooks/index'
import { fetchCatalog } from './features/catalog/catalogSlice.ts'
import { fetchGlobalProduction } from './features/production/productionSlice.ts'

import TargetData from './components/TargetData.tsx'
import Navbar from './components/Navbar.tsx'
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
        <Navbar />
        <div className="background">
          <WorldMap />
        </div>
        <section className="mainPanel">
          <ProductionGraphic />
          <TargetData />
        </section >
      </div >
    </>
  )
}

export default App