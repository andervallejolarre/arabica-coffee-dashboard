import { configureStore, type ReducersMapObject } from '@reduxjs/toolkit'

export const makeStore = <S,>({ reducer, preloadedState} :{ reducer: ReducersMapObject<S>; preloadedState?: Partial<S> }) => {
    const store = configureStore({
        reducer,
        preloadedState: preloadedState as never,
    })

    return store
}