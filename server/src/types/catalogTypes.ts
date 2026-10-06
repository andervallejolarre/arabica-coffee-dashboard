type Continent = 'Central America' | 'South America' | 'Africa' | 'Asia' | 'Oceania'

export type CountryData =
    {
        slug: string,
        name: string;
        continent: Continent;
        faostat: number;
        geoId: string
    }

export type CountrySummary = {
    slug: string;
    name: string;
    continent: Continent;
    geoId: string;
};
