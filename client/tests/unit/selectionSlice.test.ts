import { describe, expect, test } from 'vitest'
import type { UnknownAction } from '@reduxjs/toolkit'
import selectionReducer, { continentSelected, countrySelected, worldComparison } from '../../src/features/selection/selectionSlice'
import { store } from '../../src/store'

//applies each action in order, starting from the reducer's initial state
const run = (...actions: UnknownAction[]) =>
    actions.reduce(selectionReducer, selectionReducer(undefined, { type: 'init' }))

describe('selectionSlice', () => {
    test('default values in our state', () => {
        expect(store.getState().selection.country).toBe('')
        expect(store.getState().selection.continent).toBe('')
        expect(store.getState().selection.worldComparison).toBe(true)
    })

    test('switching continents resets the selected country', () => {
        const state = run(countrySelected('brazil'), continentSelected('asia'))

        expect(state.country).toBe('')
    })

    test('selecting a country sets it', () => {
        expect(run(countrySelected('peru')).country).toBe('peru')
    })

    test('selecting the placeholder clears the country', () => {
        expect(run(countrySelected('peru'), countrySelected('')).country).toBe('')
    })

    test('selecting a continent sets it', () => {
        expect(run(continentSelected('asia')).continent).toBe('asia')
    })

    test('clearing the continent sets it to null', () => {
        expect(run(continentSelected('asia'), continentSelected(null)).continent).toBeNull()
    })

    test('turning the world comparison off and on', () => {
        expect(run(worldComparison(false)).worldComparison).toBe(false)
        expect(run(worldComparison(false), worldComparison(true)).worldComparison).toBe(true)
    })

    test('toggling the world comparison leaves country and continent alone', () => {
        const state = run(continentSelected('asia'), countrySelected('japan'), worldComparison(false))

        expect(state.continent).toBe('asia')
        expect(state.country).toBe('japan')
    })

    test('changing the continent leaves the world comparison alone', () => {
        const state = run(worldComparison(false), continentSelected('asia'))

        expect(state.worldComparison).toBe(false)
    })
})
