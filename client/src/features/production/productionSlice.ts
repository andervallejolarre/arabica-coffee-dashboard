import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { ProductionPoint } from '../../../../server/src/types/faostatTypes'
import type { RootState } from '../../store'

//types with a good format when using thunks
export interface ProductionState {
  production: ProductionPoint[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

export interface ProductionRootState {
  country: ProductionState
  global: ProductionState
}

const initialState: ProductionRootState = {
  country: {
    production: [],
    status: 'idle',
    error: null
  },
  global: {
    production: [],
    status: 'idle',
    error: null
  }
}

//Our asyncthunks. They can be called wherever
export const fetchGlobalProduction = createAsyncThunk(
  'production/global',
  async () => {
    const res = await axios.get(`/api/production/global`)
    //we know the format of our response 
    return res.data as ProductionPoint[]
  }
)

export const fetchCountryProduction = createAsyncThunk(
  'production/country',
  async (_, { getState }) => {
    //selection.country is already the slug chosen in CountrySelect
    const { country } = (getState() as RootState).selection
    const res = await axios.get(`/api/production/${country}`)
    //we know the format of our response 
    return res.data as ProductionPoint[]
  }
)

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {
    //used when no country is chosen, so the chart is empty without a request
    countryCleared(state) {
      state.country.status = 'idle'
      state.country.error = null
      state.country.production = []
    }
  },
  //thunk functions are stablished as extraReducers. With 3 status
  extraReducers: builder => {
    builder
    .addCase(fetchGlobalProduction.pending, state => {
        state.global.status = 'pending'
        state.global.error = null
      })
      .addCase(fetchGlobalProduction.fulfilled, (state, action) => {
        state.global.status = 'succeeded'
        state.global.production = action.payload
      })
      .addCase(fetchGlobalProduction.rejected, (state, action) => {
        state.global.status = 'failed'
        state.global.error = action.error.message ?? 'Unknown error'
      })
      .addCase(fetchCountryProduction.pending, state => {
        state.country.status = 'pending'
        state.country.error = null
        state.country.production = []// This empties the previous country's data
      })
      .addCase(fetchCountryProduction.fulfilled, (state, action) => {
        state.country.status = 'succeeded'
        state.country.production = action.payload
      })
      .addCase(fetchCountryProduction.rejected, (state, action) => {
        state.country.status = 'failed'
        state.country.error = action.error.message ?? 'Unknown error'
        state.country.production = [] //a failed request leaves only the world line.
      })
  }
})

export const { countryCleared } = productionSlice.actions

export default productionSlice.reducer
