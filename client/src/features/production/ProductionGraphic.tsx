import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/index'
import type { ModeState } from '../mode/modeSlice';
import Graph, { type GraphSeries } from '../../components/Graph'
import type { ProductionPoint } from '../../../../server/src/types/faostatTypes'

//one row per year with the world and/or country value
export const mergeByYear = (world: ProductionPoint[], country: ProductionPoint[]) => {
    const rows = new Map<number, { year: number, world?: number, country?: number }>()
    world.forEach(point => rows.set(point.year, { ...rows.get(point.year), year: point.year, world: point.value }))
    country.forEach(point => rows.set(point.year, { ...rows.get(point.year), year: point.year, country: point.value }))
    return [...rows.values()].sort((a, b) => a.year - b.year)
}

const ProductionGraphic = () => {
    const selectedMode: ModeState = useAppSelector(state => state.mode.value)
    const selectedCountry: string = useAppSelector(state => state.selection.country)
    const catalog = useAppSelector(state => state.catalog.data)
    const worldProduction: ProductionPoint[] = useAppSelector(state => state.production.global.production)
    const countryProduction: ProductionPoint[] = useAppSelector(state => state.production.country.production)
    const showWorldComparison = useAppSelector(state => state.selection.worldComparison)//toggle option for countryMode

    const countryName = catalog.find(item => item.slug === selectedCountry)?.name ?? selectedCountry
    
    //the country line only appears in country mode, once its data has loaded
    const showCountry = selectedMode === 'country' && selectedCountry !== '' && countryProduction.length > 0
    
    //global mode always shows the world line
    const showWorld = selectedMode === 'global' || showWorldComparison

    //recalculated only when the datasets or the visible lines change
    const data = useMemo(
        () => mergeByYear(showWorld ? worldProduction : [], showCountry ? countryProduction : []),
        [worldProduction, countryProduction, showWorld, showCountry]
    )

    //each name is the key of a value in the merged rows
    const series: GraphSeries[] = []
    if (showWorld) {
        series.push({ name: 'world', label: 'World (1k x 60kg)', color: 'rgba(186, 215, 219, 1)' })
    }
    if (showCountry) {
        series.push({ name: 'country', label: `${countryName} (1k x 60kg)`, color: 'rgba(225, 241, 152, 1)' })
    }

    return (
        <section className="chart">
            <Graph data={data} series={series} />
        </section>
    )
}

export default ProductionGraphic
