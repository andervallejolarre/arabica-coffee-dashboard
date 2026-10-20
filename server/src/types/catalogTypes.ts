type Continent = 'Central America' | 'South America' | 'Africa' | 'Asia' | 'Oceania'

//used in back-end
export type CountryData =
    {
        slug: string,
        name: string;
        continent: Continent;
        faostat: number;
        geoId: string
    }

    //Passed to our front-end, no need of faostat code
export type CountrySummary = {
    slug: string;
    name: string;
    continent: Continent;
    geoId: string;
};
