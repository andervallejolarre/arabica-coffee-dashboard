import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'
import { makeStore } from './makeStore'

//renders a component inside a fresh store so state never leaks between tests
//pass only the reducers the component needs, and optionally a preloaded state
export const renderWithStore = <S,>(
    ui: ReactElement,
    { reducer, preloadedState }: { reducer: ReducersMapObject<S>; preloadedState?: Partial<S> }
) => {
    const store = configureStore({
        reducer,
        preloadedState: preloadedState as never,
    })
    render(<Provider store={store}>{ui}</Provider>)
    return store
}
