import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import catalogReducer from '../../src/features/catalog/catalogSlice'
import selectionReducer from '../../src/features/selection/selectionSlice'
import VariableSelection from '../../src/features/selection/VariableSelection'
import { catalogFixture } from '../fixtures/catalogFixture'
import { renderWithStore } from '../helpers/renderWithStore'

//the catalog is preloaded so the component never calls the API
const renderSelectors = () =>
    renderWithStore(<VariableSelection />, {
        reducer: { catalog: catalogReducer, selection: selectionReducer },
        preloadedState: {
            catalog: { data: catalogFixture, status: 'succeeded', error: null },
        },
    })

const optionLabels = (name: string) =>
    within(screen.getByRole('combobox', { name }))
        .getAllByRole('option')
        .map(option => option.textContent)

afterEach(() => {
    cleanup()
})

describe('VariableSelection', () => {

    test('lists each continent once, after the placeholder', () => {
        renderSelectors()

        expect(optionLabels('Continent:')).toEqual([
            'Select a continent', 'Asia', 'Central America', 'South America',
        ])
    })

    test('lists every country when no continent is chosen', () => {
        renderSelectors()

        expect(optionLabels('Country:')).toEqual([
            'Select a country', 'Vietnam', 'India', 'Honduras', 'Guatemala', 'Brazil',
        ])
    })

    test('shows only the countries of the chosen continent', () => {
        renderSelectors()

        fireEvent.change(screen.getByRole('combobox', { name: 'Continent:' }), { target: { value: 'Asia' } })

        expect(optionLabels('Country:')).toEqual(['Select a country', 'Vietnam', 'India'])
    })

    test('changing the continent updates the country list and clears the selected country', () => {
        const store = renderSelectors()

        fireEvent.change(screen.getByRole('combobox', { name: 'Continent:' }), { target: { value: 'Asia' } })
        fireEvent.change(screen.getByRole('combobox', { name: 'Country:' }), { target: { value: 'vietnam' } })
        expect(store.getState().selection.country).toBe('vietnam')

        fireEvent.change(screen.getByRole('combobox', { name: 'Continent:' }), { target: { value: 'Central America' } })

        expect(optionLabels('Country:')).toEqual(['Select a country', 'Honduras', 'Guatemala'])
        expect(store.getState().selection.country).toBe('')
        expect(screen.getByRole('combobox', { name: 'Country:' })).toHaveValue('')
    })

    test('dispatches the country and shows it as the selected value', () => {
        const store = renderSelectors()

        fireEvent.change(screen.getByRole('combobox', { name: 'Country:' }), { target: { value: 'brazil' } })

        expect(store.getState().selection.country).toBe('brazil')
        expect(screen.getByRole('combobox', { name: 'Country:' })).toHaveValue('brazil')
    })
})
