import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import type { GraphProps } from '../../src/components/Graph'
import ProductionGraphic, { mergeByYear } from '../../src/features/production/ProductionGraphic'
import modeReducer from '../../src/features/mode/modeSlice'
import selectionReducer from '../../src/features/selection/selectionSlice'
import catalogReducer from '../../src/features/catalog/catalogSlice'
import productionReducer from '../../src/features/production/productionSlice'
import { catalogFixture } from '../fixtures/catalogFixture'
import { countryProductionFixture, globalProductionFixture } from '../fixtures/productionFixture'
import { renderWithStore } from '../helpers/renderWithStore'

//we capture the props ProductionGraphic sends to the chart instead of drawing it
//This is typically used when you need to mock something before it's imported or used by components
const { graphSpy } = vi.hoisted(() => ({ graphSpy: vi.fn() }))

//here instead of an URL we have a foler/file direction
vi.mock('../../src/components/Graph', () => ({
    default: (props: unknown) => {
        graphSpy(props)
        return null
    },
}))

const reducers = {
    mode: modeReducer,
    selection: selectionReducer,
    catalog: catalogReducer,
    production: productionReducer,
}

const renderGraphic = ({
    mode = 'country',
    country = 'brazil',
    worldComparison = true,
    countryData = countryProductionFixture,
}: {
    mode?: 'global' | 'country'
    country?: string
    worldComparison?: boolean
    countryData?: typeof countryProductionFixture
} = {}) =>
    renderWithStore(<ProductionGraphic />, {
        reducer: reducers,
        preloadedState: {
            mode: { value: mode },
            selection: { country, continent: 'South America', worldComparison },
            catalog: { data: catalogFixture, status: 'succeeded', error: null },
            production: {
                global: { production: globalProductionFixture, status: 'succeeded', error: null },
                country: { production: countryData, status: 'succeeded', error: null },
            },
        },
    })

//the props from the most recent render of the chart or last call of graphSpy
const lastProps = () => graphSpy.mock.lastCall?.[0] as GraphProps

afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})

describe('mergeByYear', () => {
    test('puts the world and country values of the same year on one row, sorted by year', () => {
        const rows = mergeByYear(
            [{ year: 2024, value: 100 }, { year: 2023, value: 90 }],
            [{ year: 2024, value: 10 }, { year: 2023, value: 9 }]
        )

        expect(rows).toEqual([
            { year: 2023, world: 90, country: 9 },
            { year: 2024, world: 100, country: 10 },
        ])
    })

    test('keeps a year that only one dataset has and leaves the other value undefined', () => {
        const rows = mergeByYear(
            [{ year: 2022, value: 100 }],
            [{ year: 2023, value: 10 }]
        )

        expect(rows).toEqual([
            { year: 2022, world: 100, country: undefined },
            { year: 2023, world: undefined, country: 10 },
        ])
    })

    test('returns an empty list when there is no data', () => {
        expect(mergeByYear([], [])).toEqual([])
    })
})

describe('ProductionGraphic', () => {
    test('global mode shows only the world line', () => {
        renderGraphic({ mode: 'global' })

        //series and data are the props we are passing to our Graph component 
        expect(lastProps().series.map(s => s.name)).toEqual(['world'])
        expect(lastProps().data[0]).toEqual({ year: 2021, world: 979788 })
    })

    test('global mode hides the country line even when a country is selected and loaded', () => {
        renderGraphic({ mode: 'global', country: 'brazil' })

        expect(lastProps().series.map(s => s.name)).toEqual(['world'])
        expect(lastProps().data.every(row => row.country === undefined)).toBe(true)
    })

    test('country mode with a loaded country shows the world and country lines', () => {
        renderGraphic({ mode: 'country', country: 'brazil' })

        expect(lastProps().series.map(s => s.name)).toEqual(['world', 'country'])
        expect(lastProps().data[4]).toEqual({ year: 2025, world: 798798, country: 65456 })
    })

    test('the country line is labelled with the catalog name', () => {
        renderGraphic({ mode: 'country', country: 'brazil' })

        expect(lastProps().series).toContainEqual({
            name: 'country',
            label: 'Brazil (1k x 60kg)',
            color: 'rgba(225, 241, 152, 1)',
        })
    })

    test('a country missing from the catalog is labelled with its slug', () => {
        renderGraphic({ mode: 'country', country: 'peru' })

        expect(lastProps().series).toContainEqual(
            expect.objectContaining({ name: 'country', label: 'peru (1k x 60kg)' })
        )
    })

    test('country mode without a selected country shows only the world line', () => {
        renderGraphic({ mode: 'country', country: '' })

        expect(lastProps().series.map(s => s.name)).toEqual(['world'])
    })

    test('country mode waits for the country data before showing the country line', () => {
        renderGraphic({ mode: 'country', country: 'brazil', countryData: [] })

        expect(lastProps().series.map(s => s.name)).toEqual(['world'])
    })

    test('turning off the world comparison in country mode hides the world line', () => {
        renderGraphic({ mode: 'country', country: 'brazil', worldComparison: false })

        expect(lastProps().series.map(s => s.name)).toEqual(['country'])
        expect(lastProps().data.every(row => row.world === undefined)).toBe(true)
    })

    test('the world comparison toggle does not hide the world line in global mode', () => {
        renderGraphic({ mode: 'global', worldComparison: false })

        expect(lastProps().series.map(s => s.name)).toEqual(['world'])
    })
})
