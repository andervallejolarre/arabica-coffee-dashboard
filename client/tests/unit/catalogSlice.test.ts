import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import catalogReducer from '../../src/features/catalog/catalogSlice'
import { fetchCatalog } from '../../src/features/catalog/catalogSlice'
import { catalogFixture } from '../fixtures/catalogFixture'
import { makeStore } from '../helpers/makeStore'
import axios from 'axios'

vi.mock('axios', () => ({ default: { get: vi.fn() } }))


beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] })
})

afterEach(() => {
    vi.clearAllMocks()
})

describe('catalogSlice', () => {
    test('starts with empty data and default status/error', () => {
        const store = makeStore({ reducer: { catalog: catalogReducer } })

        const { catalog } = store.getState()
        expect(catalog).toEqual({ data: [], status: 'idle', error: null })
    })

    test('fetchCatalog stores the country data catalog', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: catalogFixture })
        const store = makeStore({ reducer: { catalog: catalogReducer } })

        await store.dispatch(fetchCatalog())

        expect(axios.get).toHaveBeenCalledWith('/api/catalog')
        expect(store.getState().catalog).toEqual({
            data: catalogFixture,
            status: 'succeeded',
            error: null,
        })
    })

    test('fetchCatalog is pending while the request runs', () => {
        vi.mocked(axios.get).mockReturnValue(new Promise(() => {}))
        const store = makeStore({ reducer: { catalog: catalogReducer } })

        store.dispatch(fetchCatalog())

        expect(store.getState().catalog).toEqual({
            data: [],
            status: 'pending',
            error: null,
        })
    })

    test('fetchCatalog fails with the request error', async () => {
        vi.mocked(axios.get).mockRejectedValue(new Error('Network down'))
        const store = makeStore({ reducer: { catalog: catalogReducer } })

        await store.dispatch(fetchCatalog())

        expect(store.getState().catalog).toEqual({
            data: [],
            status: 'failed',
            error: 'Network down',
        })
    })
})