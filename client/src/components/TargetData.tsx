import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/index'
import { countryCleared, fetchCountryProduction } from '../features/production/productionSlice'
import type { SelectionState } from '../features/selection/selectionSlice';
import type { ModeState } from '../features/mode/modeSlice';
import type { CatalogState } from '../features/catalog/catalogSlice';
import type { CountryData } from '../../../server/src/types/catalogTypes'

const TargetData = () => {
    const dispatch = useAppDispatch()
    // We use the selector hook to get `state.country`
    const mode: ModeState = useAppSelector(state => state.mode.value)
    const selected: SelectionState = useAppSelector(state => state.selection);
    const catalog: CatalogState = useAppSelector(state => state.catalog )

    //undefined until the catalog has loaded, so we fall back to the slug
    const countryShown: CountryData | undefined = catalog.data.find(item => item.slug === selected.country)

    useEffect(() => {
        //Event Listenner. WHen ever country state changes fetchProduction is triggered
        //without a country there is nothing to fetch, so we only clear the chart
        if (mode !== 'country') return
        if (selected.country === '') dispatch(countryCleared())
        else dispatch(fetchCountryProduction())
    }, [selected.country, mode, dispatch])

    return (
        <section className="countryChart">
            {/*Displaying sountry State*/}
            <h2>{mode === 'global'
                ? "World's coffee production"
                : selected.country === ''
                    ? 'Choose a country from the list'
                    : (countryShown?.name ?? selected.country) + `'s coffee production` }</h2>
        </section>
    )
}

export default TargetData