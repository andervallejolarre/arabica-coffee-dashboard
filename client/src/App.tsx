import './App.css'
import { useEffect } from 'react'
import { useAppDispatch} from './hooks/index'
import { fetchCatalog } from './features/catalog/catalogSlice.ts'
import { fetchGlobalProduction } from './features/production/productionSlice.ts'
import { useAppSelector } from './hooks/index'


import TargetData from './components/TargetData.tsx'
import Navbar from './components/Navbar.tsx'
import ProductionGraphic from './features/production/ProductionGraphic'
import WorldMap from './components/WorldMap'

function App() {

  const continent = useAppSelector(state => state.selection.continent)
  const country = useAppSelector(state => state.selection.country)
  const catalog = useAppSelector(state => state.catalog.data)

  const matchContinent = catalog.find(item => item.slug === country);

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
        <section className="mainPanel" data-continent={continent} data-country-continent={matchContinent?.continent}>
          <ProductionGraphic />
          <TargetData />
        </section >
      </div >
    </>
  )
}

export default App