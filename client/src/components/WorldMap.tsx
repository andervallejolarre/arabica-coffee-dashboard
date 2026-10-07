import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useAppSelector } from '../hooks'
import type { CountryData } from '../../../server/src/types/catalogTypes'

//pre-bundled topojson world atlas, fetched once and cached by the browser
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WorldMap = () => {

    const catalog: CountryData[] = useAppSelector(state => state.catalog.data)
    const selected: string = useAppSelector(state => state.selection.country)

    const match: CountryData | undefined = catalog.find(item => item.slug == selected)

    return (
        /*Structure needed to use react-simple-maps */
        <ComposableMap
            className="worldMap"
            projection="geoEqualEarth"
            width={1200}
            height={600}
            projectionConfig={{ scale: 225 }}
        >
            {/*There are other attributes available for ComposableMap*/}
            <Geographies geography={geoUrl}>
                {/*Zoom In, Annotations, screens, etc are available as extra components*/}
                {({ geographies }) =>
                    geographies.map(geo => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={match?.geoId === geo.id
                                ? 'rgb(191, 216, 221)'
                                : 'rgb(236, 252, 240, 80%)'
                            }
                            stroke={'rgb(191, 216, 221)'}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}

export default WorldMap
