import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import modeReducer from '../../src/features/mode/modeSlice'
import ModeSelection from '../../src/features/mode/ModeSelection'
import { renderWithStore } from '../helpers/renderWithStore'

afterEach(() => {
    cleanup()
})

describe('ModeSelection', () => {

    test('offers only the global and country options', () => {
        renderWithStore(<ModeSelection />, { reducer: { mode: modeReducer } })

        const options = within(screen.getByRole('combobox')) //combobox  it's the role of a select element in a single visible row
        .getAllByRole('option')

        expect(options.length).toEqual(2)
        expect(options.map(option => option.textContent)).toEqual(['Global Mode', 'Country Mode'])
    })

    test('dispatches the mode when a valid option is chosen', () => {
        const store = renderWithStore(<ModeSelection />, { reducer: { mode: modeReducer } })

        fireEvent //DOM event directly on an element (is like userEvent but without simulating interactions and checking quikly for events)
            .change(screen // change event on the element - React sees this event and triggers onChange
                .getByRole('combobox'), { target: { value: 'country' } })

        expect(store.getState().mode.value).toBe('country')
    })

    test('ignores a value that is not a valid mode', () => {
        const store = renderWithStore(<ModeSelection />, { reducer: { mode: modeReducer } })

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'banana' } })

        expect(store.getState().mode.value).toBe('global')
    })
})
