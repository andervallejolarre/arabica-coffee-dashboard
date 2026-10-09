import type { CountryData } from '../../../server/src/types/catalogTypes'

//a small, fixed catalog so the counts in our tests never depend on the real data
//Asia appears twice on purpose: the continent list must still show it once
export const catalogFixture: CountryData[] = [
    { slug: 'vietnam', name: 'Vietnam', continent: 'Asia', faostat: 1, geoId: '704' },
    { slug: 'india', name: 'India', continent: 'Asia', faostat: 2, geoId: '356' },
    { slug: 'honduras', name: 'Honduras', continent: 'Central America', faostat: 3, geoId: '340' },
    { slug: 'guatemala', name: 'Guatemala', continent: 'Central America', faostat: 4, geoId: '320' },
    { slug: 'brazil', name: 'Brazil', continent: 'South America', faostat: 5, geoId: '076' },
]
