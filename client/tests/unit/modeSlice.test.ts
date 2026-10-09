import { describe, expect, test } from 'vitest'
import modeReducer, { modeSelected } from '../../src/features/mode/modeSlice'
import { store } from '../../src/store' //this runs store.ts and calls configureStore. The store exists for the whole file

describe('modeSlice', () => {
    test('starts in global mode in the app store', () => {
        expect(store.getState().mode.value).toBe('global')
    })

    test('switches to country mode and back', () => {
        const countryState = modeReducer(undefined, modeSelected('country'))
        const state = modeReducer(countryState, modeSelected('global'))

        expect(state.value).toBe('global')
    })
})