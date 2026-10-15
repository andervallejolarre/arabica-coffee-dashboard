import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import catalogReducer from '../../src/features/catalog/catalogSlice'
import modeReducer from '../../src/features/mode/modeSlice'
import selectionReducer from '../../src/features/selection/selectionSlice'
import productionReducer from '../../src/features/production/productionSlice'
import VariableSelection from '../../src/features/selection/VariableSelection'
import TargetData from '../../src/components/TargetData'
import { catalogFixture } from '../fixtures/catalogFixture'
import { renderWithStore } from '../helpers/renderWithStore'

//we replace axios so we can read the requested URLs without a running server
vi.mock('axios', () => ({ default: { get: vi.fn() } }))

const renderPage = () =>
    renderWithStore(
        <>
            <VariableSelection />
            <TargetData />
        </>,
        {
            reducer: {
                catalog: catalogReducer,
                mode: modeReducer,
                selection: selectionReducer,
                production: productionReducer,
            },
            preloadedState: {
                catalog: { data: catalogFixture, status: 'succeeded', error: null },
                mode: { value: 'country' as const },
            },
        }
    )

const choose = (label: string, value: string) =>
    fireEvent.change(screen.getByRole('combobox', { name: label }), { target: { value } })

beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: [{ year: 2020, value: 100 }] })
})

afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})

describe('VariableSelection and TargetData requests', () => {

    test('entering country mode without a country makes no request and leaves the chart empty', () => {
        const store = renderPage()

        expect(axios.get).not.toHaveBeenCalled()
        expect(store.getState().production.country.production).toEqual([])
    })

    test('choosing a country requests that country', async () => {
        renderPage()

        choose('Country', 'brazil')

        await waitFor(() => expect(axios.get).toHaveBeenLastCalledWith('/api/production/brazil'))
    })

    test('changing the continent clears the country and the chart without a request', async () => {
        const store = renderPage()
        choose('Country', 'vietnam')
        await waitFor(() => expect(store.getState().production.country.production).toHaveLength(1))

        choose('Continent', 'Central America')

        expect(store.getState().production.country.production).toEqual([])
        expect(screen.getByRole('combobox', { name: 'Country' })).toHaveValue('')
        expect(axios.get).toHaveBeenCalledTimes(1)
    })

    test('choosing a different country requests the new one', async () => {
        renderPage()
        choose('Country', 'india')
        await waitFor(() => expect(axios.get).toHaveBeenLastCalledWith('/api/production/india'))

        choose('Country', 'honduras')

        await waitFor(() => expect(axios.get).toHaveBeenLastCalledWith('/api/production/honduras'))
    })
})

describe('TargetData rendering', () => {
    test('shows the world heading in global mode and does not request a country', () => {
        renderWithStore(<TargetData />, {
            reducer: {
                catalog: catalogReducer,
                mode: modeReducer,
                selection: selectionReducer,
                production: productionReducer,
            },
            preloadedState: { mode: { value: 'global' as const } },
        })

        expect(screen.getByRole('heading', { name: "World's coffee production" })).toBeInTheDocument()
        expect(axios.get).not.toHaveBeenCalled()
    })

    test('asks the user to choose a country when none is selected', () => {
        renderWithStore(<TargetData />, {
            reducer: {
                catalog: catalogReducer,
                mode: modeReducer,
                selection: selectionReducer,
                production: productionReducer,
            },
            preloadedState: { mode: { value: 'country' as const } },
        })

        expect(screen.getByRole('heading', { name: "Choose a country from the list" })).toBeInTheDocument()
    })

    test('shows the selected country in the heading', () => {
        renderWithStore(<TargetData />, {
            reducer: {
                catalog: catalogReducer,
                mode: modeReducer,
                selection: selectionReducer,
                production: productionReducer,
            },
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
            reducer: {
                catalog: catalogReducer,
                mode: modeReducer,
                selection: selectionReducer,
                production: productionReducer,
            },
            preloadedState: {
                mode: { value: 'country' as const },
                selection: { country: 'brazil', continent: 'South America', worldComparison: true },
            },
        })

        expect(screen.getByRole('heading', { name: "brazil's coffee production" })).toBeInTheDocument()
    })
})
