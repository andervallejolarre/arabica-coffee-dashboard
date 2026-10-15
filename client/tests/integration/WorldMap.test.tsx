import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import selectionReducer from '../../src/features/selection/selectionSlice'
import catalogReducer from '../../src/features/catalog/catalogSlice'
import { catalogFixture } from '../fixtures/catalogFixture'
import { renderWithStore } from '../helpers/renderWithStore'
import WorldMap from '../../src/components/WorldMap'

const { geographySpy } = vi.hoisted(() => ({ geographySpy: vi.fn() }))

vi.mock('react-simple-maps', () => ({
    ComposableMap: ({ children }: any) => <>{children}</>,
    Geographies: ({ children }: any) =>
        children?.({ geographies: [
            { id: '076', rsmKey: 'brazil' },
            { id: '356', rsmKey: 'india' },
        ]}),
    Geography: (props: any) => {
        geographySpy(props)
        return null
    },
}))

const reducers = {
    selection: selectionReducer,
    catalog: catalogReducer,
}

const renderMap = ({
    country = 'brazil',
}: {
    country?: string
} = {}) =>
    renderWithStore(<WorldMap />, {
        reducer: reducers,
        preloadedState: {
            selection: { country, continent: 'South America', worldComparison: true },
            catalog: { data: catalogFixture, status: 'succeeded', error: null },
        },
    })

//get all calls to Geography to check the fill color for each one
const allGeographyCalls = () => geographySpy.mock.calls.map(call => call[0])

afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})

describe('WorldMap', () => {
    test('highlights the selected country by geoId', () => {
        renderMap({ country: 'brazil' })

        const calls = allGeographyCalls()
        expect(calls[0].fill).toBe('rgb(225, 241, 152, 90%)')
        expect(calls[1].fill).toBe('rgb(113, 147, 104, 80%)')
    })

    test('shows the default color when no country is selected', () => {
        renderMap({ country: '' })

        const calls = allGeographyCalls()
        expect(calls[0].fill).toBe('rgb(113, 147, 104, 80%)')
        expect(calls[1].fill).toBe('rgb(113, 147, 104, 80%)')
    })

    test('highlights the correct country when a different country is selected', () => {
        renderMap({ country: 'india' })

        const calls = allGeographyCalls()
        expect(calls[0].fill).toBe('rgb(113, 147, 104, 80%)')
        expect(calls[1].fill).toBe('rgb(225, 241, 152, 90%)')
    })
})