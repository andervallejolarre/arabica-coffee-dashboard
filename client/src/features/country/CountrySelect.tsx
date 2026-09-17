import { useAppDispatch } from '../../hooks/index'
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

    //we are triggering our country selector reducer with the clicked country value
    const handleClick = (countrySelection: string) => {
        const newCountry: Country = { country: countrySelection.toLowerCase() };
        dispatch(countrySelected(newCountry));
    }

    return (
        <section>
            <ul className="countrySelection">
                <h3>Choose a country:</h3>
                {/*Printing and setting onClick eventlistenners on each of the countries in our list*/}
                {allCountries.map(country => (
                    <li key={country}>
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