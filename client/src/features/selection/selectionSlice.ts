import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

//our state type
export interface SelectionState {
  country: string,
  continent: string | null
}

const initialState: SelectionState = { 
  country: 'brazil',
  continent: ''
 }

const selectionSlice = createSlice({
  //This reducer will be stablished in our store
  name: 'selection',
  initialState,
  reducers: {
    //Our only reducer. It's going to be exported next
    continentSelected(state, action: PayloadAction<string | null>) {
      state.continent = action.payload
    },
    countrySelected(state, action: PayloadAction<string>) {
      state.country = action.payload
    },
  }
})

// Export the auto-generated action creator with the same name
export const { continentSelected } = selectionSlice.actions
export const { countrySelected } = selectionSlice.actions

// Export the generated reducer function
export default selectionSlice.reducer