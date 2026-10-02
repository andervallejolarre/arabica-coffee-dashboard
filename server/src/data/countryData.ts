type Continent = 'Central America' | 'South America' | 'Africa' | 'Asia' | 'Oceania'

type CountryData = {
    name: string;
    continent: Continent;
    faostat: number;
    geoId: string
}

export const countryData: Record<string, CountryData> = {
    brazil: {
        name: 'Brazil',
        continent: 'South America',
        faostat: 21,
        geoId: '076'
    },
    colombia: {
        name: 'Colombia',
        continent: 'South America',
        faostat: 44,
        geoId: '170'
    },
    peru: {
        name: 'Peru',
        continent: 'South America',
        faostat: 170,
        geoId: '604'
    },
    venezuela: {
        name: 'Venezuela',
        continent: 'South America',
        faostat: 236,
        geoId: '862'
    },
    ecuador: {
        name: 'Ecuador',
        continent: 'South America',
        faostat: 58,
        geoId: '218'
    },
    bolivia: {
        name: 'Bolivia',
        continent: 'South America',
        faostat: 19,
        geoId: '068'
    },
    mexico: {
        name: 'Mexico',
        continent: 'Central America',
        faostat: 13,
        geoId: '484'
    },
    guatemala: {
        name: 'Guatemala',
        continent: 'Central America',
        faostat: 89,
        geoId: '320'
    },
    honduras: {
        name: 'Honduras',
        continent: 'Central America',
        faostat: 95,
        geoId: '340'
    },
    nicaragua: {
        name: 'Nicaragua',
        continent: 'Central America',
        faostat: 157,
        geoId: '558'
    },
    costaRica: {
        name: 'Costa Rica',
        continent: 'Central America',
        faostat: 48,
        geoId: '188'
    },
    elSalvador: {
        name: 'El Salvador',
        continent: 'Central America',
        faostat: 60,
        geoId: '222'
    },
    panama: {
        name: 'Panama',
        continent: 'Central America',
        faostat: 166,
        geoId: '591'
    },
    cuba: {
        name: 'Cuba',
        continent: 'Central America',
        faostat: 49,
        geoId: '192'
    },
    haiti: {
        name: 'Haiti',
        continent: 'Central America',
        faostat: 93,
        geoId: '332'
    },
    dominicanRepublic: {
        name: 'Dominican Republic',
        continent: 'Central America',
        faostat: 56,
        geoId: '214'
    },
    jamaica: {
        name: 'Jamaica',
        continent: 'Central America',
        faostat: 109,
        geoId: '388'
    },
    ethiopia:
    {
        name: 'Ethiopia', 
        continent: 'Africa',
        faostat: 238,
        geoId: '231'
    },
    uganda:
    {
        name: 'Uganda', 
        continent: 'Africa',
        faostat: 226,
        geoId: '800'
    },
    tanzania:
    {
        name: 'Tanzania', 
        continent: 'Africa',
        faostat: 215,
        geoId: '834'
    },
    kenya:
    {
        name: 'Kenya', 
        continent: 'Africa',
        faostat: 114,
        geoId: '404'
    },
    rwanda:
    {
        name: 'Rwanda', 
        continent: 'Africa',
        faostat: 184,
        geoId: '646'
    },
    burundi:
    {
        name: 'Burundi', 
        continent: 'Africa',
        faostat: 29,
        geoId: '108'
    },
    drCongo: {
        name: 'DR Congo', 
        continent: 'Africa',
        faostat: 250,
        geoId: '180'
    },
    cameroon: {
        name: 'Cameroon', 
        continent: 'Africa',
        faostat: 32,
        geoId: '120'
    },
    madagascar: {
        name: 'Madagascar', 
        continent: 'Africa',
        faostat: 129,
        geoId: '450'
    },
    malawi: {
        name: 'Malawi', 
        continent: 'Africa',
        faostat: 130,
        geoId: '454'
    },
    zambia: {
        name: 'Zambia', 
        continent: 'Africa',
        faostat: 251,
        geoId: '894'
    },
    india: {
        name: 'India', 
        continent: 'Asia',
        faostat: 100,
        geoId: '356'
    },
    indonesia: {
        name: 'Indonesia', 
        continent: 'Asia',
        faostat: 101,
        geoId: '360'
    },
    vietnam: {
        name: 'Vietnam', 
        continent: 'Asia',
        faostat: 237,
        geoId: '704'
    },
    china: {
        name: 'China', 
        continent: 'Asia',
        faostat: 351,
        geoId: '156'
    },
    papuaNewGuinea: {
        name: 'Papua New Guinea', 
        continent: 'Oceania',
        faostat: 168,
        geoId: '598'
    },
}