import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, screen } from '@testing-library/react'
import axios from 'axios'
import modeReducer from '../../src/features/mode/modeSlice'
import selectionReducer from '../../src/features/selection/selectionSlice'
import productionReducer from '../../src/features/production/productionSlice'
import catalogReducer from '../../src/features/catalog/catalogSlice'
import TargetData from '../../src/components/TargetData'
import { renderWithStore } from '../helpers/renderWithStore'
import { catalogFixture } from '../fixtures/catalogFixture'

//TargetData fetches in country mode, so we replace axios and keep the test off the network
vi.mock('axios', () => ({ default: { get: vi.fn() } }))

const reducers = {
    catalog: catalogReducer,
    mode: modeReducer,
    selection: selectionReducer,
    production: productionReducer,
}

beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] })
})

afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})

describe('TargetData', () => {

    test('shows the world heading in global mode and does not request a country', () => {
        renderWithStore(<TargetData />, {
            reducer: reducers,
            preloadedState: { mode: { value: 'global' as const } },
        })

        expect(screen.getByRole('heading', { name: "World's coffee production" })).toBeInTheDocument()
        expect(axios.get).not.toHaveBeenCalled()
    })

    test('asks the user to choose a country when none is selected', () => {
        renderWithStore(<TargetData />, {
            reducer: reducers,
            preloadedState: { mode: { value: 'country' as const } },
        })

        expect(screen.getByRole('heading', { name: /Choose a country from the list/ })).toBeInTheDocument()
    })

    test('shows the selected country in the heading', () => {
        renderWithStore(<TargetData />, {
            reducer: reducers,
            preloadedState: {
                catalog: { data: catalogFixture, status: 'succeeded', error: null },
                mode: { value: 'country' as const },
                selection: { country: 'brazil', continent: 'South America', worldComparison: true },
            },
        })

        expect(screen.getByRole('heading', { name: "Brazil's coffee production" })).toBeInTheDocument()
    })

    test('falls back to the slug when the catalog has no matching country', () => {
        renderWithStore(<TargetData />, {
            reducer: reducers,
            preloadedState: {
                mode: { value: 'country' as const },
                selection: { country: 'brazil', continent: 'South America', worldComparison: true },
            },
        })

        expect(screen.getByRole('heading', { name: "brazil's coffee production" })).toBeInTheDocument()
    })
})
