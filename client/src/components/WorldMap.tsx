import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

//pre-bundled topojson world atlas, fetched once and cached by the browser
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WorldMap = () => {
    return (
        <ComposableMap className="worldMap" projection="geoNaturalEarth1">
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map(geo => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}

export default WorldMap
