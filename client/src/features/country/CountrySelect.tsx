import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { type Country, countrySelected } from './countrySlice.ts'

const CountrySelect = () => {

    //Countries that are going to be available
    const allCountries = [
        'Ecuador',
        'Peru',
        'Brazil',
        'Colombia',
        'Venezuela',
        'Bolivia'
    ];

    //our reducer trigger
    const dispatch = useAppDispatch()

    //the currently selected country, used to highlight the active button
    const selectedCountry = useAppSelector(state => state.country.country)

    //we are triggering our country selector reducer with the clicked country value
    const handleClick = (countrySelection: string) => {
        const newCountry: Country = { country: countrySelection.toLowerCase() };
        dispatch(countrySelected(newCountry));
    }

    return (
        <section className="part2">
            <ul className="countrySelection">
                <h3>Choose a country:</h3>
                {/*Printing and setting onClick eventlistenners on each of the countries in our list*/}
                {allCountries.map(country => (
                    <li key={country} className={selectedCountry === country.toLowerCase() ? 'active' : ''}>
                        <button type="button" onClick={() => handleClick(country)}>
                            {country}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default CountrySelect