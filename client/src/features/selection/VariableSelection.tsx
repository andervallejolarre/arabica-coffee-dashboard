import type { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { countrySelected, continentSelected } from './selectionSlice.ts'


const CountrySelect = () => {

    //our reducer trigger
    const dispatch = useAppDispatch()

    //the currently selected country, used to highlight the active button
    const selectedContinent = useAppSelector(state => state.selection.continent)
    const selectedCountry = useAppSelector(state => state.selection.country)

    const catalogData = useAppSelector(state => state.catalog.data)

    //unique list of continents derived from the catalog
    const continents = Array.from(new Set(catalogData.map(item => item.continent)))
    const countriesInContinent = catalogData.filter(item => item.continent === selectedContinent)

    const handleContinentChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(continentSelected(event.target.value))
    }

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(countrySelected(event.target.value))
    }

    return (
        <section className="part2">
            <div>
                <label>Continent:</label>
                <select
                    name="continents"
                    id="continent-select"
                    value={selectedContinent ?? ''}
                    onChange={handleContinentChange}
                >
                    <option value="" disabled>Select a continent</option>
                    {continents.map(continent => (
                        <option key={continent} value={continent}>{continent}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Country:</label>
                <select
                    name="countries"
                    id="country-select"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                >
                    {countriesInContinent.map(country => (
                        <option key={country.slug} value={country.slug}>{country.name}</option>
                    ))}
                </select>
            </div>
        </section>
    )
}

export default CountrySelect