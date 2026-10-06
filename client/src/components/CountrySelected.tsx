import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/index'
import { fetchCountryProduction } from '../features/production/productionSlice'
import type { SelectionState } from '../features/selection/selectionSlice';
import type { ModeState } from '../features/mode/modeSlice';

const CountryProd = () => {
    const dispatch = useAppDispatch()
    // We use the selector hook to get `state.country`
    const mode: ModeState = useAppSelector(state => state.mode.value)
    const selected: SelectionState = useAppSelector(state => state.selection);

    useEffect(() => {
        //Event Listenner. WHen ever country state changes fetchProduction is triggered
        mode === 'country' && dispatch(fetchCountryProduction())
    }, [selected.country, mode, dispatch])

    return (
        <section className="countryChart">
            {/*Displaying sountry State*/}
            <h2>{mode === 'global' ? "World" : selected.country}'s coffee production </h2>
        </section>
    )
}

export default CountryProd