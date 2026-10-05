import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './features/catalog/catalogSlice'
import selectionReducer from './features/selection/selectionSlice'
import productionReducer from './features/production/productionSlice'

export const store = configureStore({
  reducer: {
    //we have two reducers available
    catalog: catalogReducer,
    selection: selectionReducer,
    production: productionReducer
  }
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>