import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import productionReducer, { countryCleared } from '../../src/features/production/productionSlice'
import { fetchGlobalProduction, fetchCountryProduction } from '../../src/features/production/productionSlice'
import selectionReducer from '../../src/features/selection/selectionSlice'
import { makeStore } from '../helpers/makeStore'
import { globalProductionFixture, countryProductionFixture } from '../fixtures/productionFixture'
import axios from 'axios'

vi.mock('axios', () => ({ default: { get: vi.fn() } }))


beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] })
})

afterEach(() => {
    vi.clearAllMocks()
})

describe('productionSlice ', () => {
    test('starts with country and global idle and empty', () => {
        const store = makeStore({ reducer: { production: productionReducer } })

        const { production } = store.getState()
        expect(production.country).toEqual({ production: [], status: 'idle', error: null })
        expect(production.global).toEqual({ production: [], status: 'idle', error: null })
    })

    test('fetchGlobalProduction stores the global data', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: globalProductionFixture })
        const store = makeStore({ reducer: { production: productionReducer } })

        await store.dispatch(fetchGlobalProduction())

        expect(axios.get).toHaveBeenCalledWith('/api/production/global')
        expect(store.getState().production.global).toEqual({
            production: globalProductionFixture,
            status: 'succeeded',
            error: null,
        })
    })

    test('fetchCountryProduction stores the country data', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: countryProductionFixture })
        const store = makeStore({
            reducer: {
                production: productionReducer,
                selection: selectionReducer
            },
            preloadedState: {
                selection: { country: 'brazil', continent: 'South America', worldComparison: true }
            }
        })

        await store.dispatch(fetchCountryProduction())

        expect(axios.get).toHaveBeenCalledWith('/api/production/brazil')
        expect(store.getState().production.country).toEqual({
            production: countryProductionFixture,
            status: 'succeeded',
            error: null,
        })
    })

    test('countryCleared sets country data to its default mode and leaves global data untouched', async () => {
        const store = makeStore({
            reducer: {
                production: productionReducer,
            },
            preloadedState: {
                production: {
                    global: {
                        production: globalProductionFixture,
                        status: 'succeeded',
                        error: null
                    },
                    country: {
                        production: countryProductionFixture,
                        status: 'succeeded',
                        error: null
                    }
                }
            }
        })

        store.dispatch(countryCleared())

        expect(store.getState().production.country).toEqual({
            production: [],
            status: 'idle',
            error: null,
        })
        expect(store.getState().production.global).toEqual({
            production: globalProductionFixture,
            status: 'succeeded',
            error: null,
        })
    })

    test('fetchGlobalProduction is pending while the request runs', () => {
        vi.mocked(axios.get).mockReturnValue(new Promise(() => {}))
        const store = makeStore({ reducer: { production: productionReducer } })

        store.dispatch(fetchGlobalProduction())

        expect(store.getState().production.global).toEqual({
            production: [],
            status: 'pending',
            error: null,
        })
    })

    test('fetchGlobalProduction fails with the request error', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('Network down'))
        const store = makeStore({ reducer: { production: productionReducer } })

        await store.dispatch(fetchGlobalProduction())

        expect(store.getState().production.global).toEqual({
            production: [],
            status: 'failed',
            error: 'Network down',
        })
    })

    test('fetchCountryProduction is pending and empties the previous country data', () => {
        vi.mocked(axios.get).mockReturnValue(new Promise(() => {}))
        const store = makeStore({
            reducer: {
                production: productionReducer,
                selection: selectionReducer
            },
            preloadedState: {
                production: {
                    global: {
                        production: globalProductionFixture,
                        status: 'succeeded',
                        error: null
                    },
                    country: {
                        production: countryProductionFixture,
                        status: 'succeeded',
                        error: null
                    }
                },
                selection: { country: 'brazil', continent: 'South America', worldComparison: true }
            }
        })

        store.dispatch(fetchCountryProduction())

        expect(store.getState().production.country).toEqual({
            production: [],
            status: 'pending',
            error: null,
        })
    })

    test('fetchCountryProduction fails with the request error and keeps no country data', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('Network down'))
        const store = makeStore({
            reducer: {
                production: productionReducer,
                selection: selectionReducer
            },
            preloadedState: {
                selection: { country: 'brazil', continent: 'South America', worldComparison: true }
            }
        })

        await store.dispatch(fetchCountryProduction())

        expect(store.getState().production.country).toEqual({
            production: [],
            status: 'failed',
            error: 'Network down',
        })
    })
})