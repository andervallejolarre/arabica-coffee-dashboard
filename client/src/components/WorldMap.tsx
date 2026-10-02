import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

//pre-bundled topojson world atlas, fetched once and cached by the browser
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WorldMap = () => {
    return (
        /*Structure needed to use react-simple-maps */
        <ComposableMap className="worldMap" projection="geoEqualEarth">
            {/*There are other attributes available for ComposableMap*/}
            <Geographies geography={geoUrl}>
                {/*Zoom In, Annotations, screens, etc are available as extra components*/}
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
