import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { CountryData } from '../../../../server/src/types/catalogTypes'

//types with a good format when using thunks
export interface CatalogState {
  data: CountryData[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState : CatalogState = {
    data: [],
    status: 'idle',
    error: null
}

//Our asyncthunk. It can be called wherever
export const fetchCatalog = createAsyncThunk(
  'catalog/fetch',
  async () => {
    const res = await axios.get(`/api/catalog`)
    //we now the format of our response 
    return res.data as CountryData[]
  }
)

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  //thunk functions are stablished as extraReducers. With 3 status
  extraReducers: builder => {
    builder
      .addCase(fetchCatalog.pending, state => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown error'
      })
  }
})

export default catalogSlice.reducer
