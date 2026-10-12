import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

//our state type
export interface SelectionState {
  country: string,
  continent: string | null,
  worldComparison: boolean
}

const initialState: SelectionState = { 
  country: '',
  continent: '',
  worldComparison: true
 }

const selectionSlice = createSlice({
  //This reducer will be stablished in our store
  name: 'selection',
  initialState,
  reducers: {
    //Our only reducer. It's going to be exported next
    continentSelected(state, action: PayloadAction<string | null>) {
      state.continent = action.payload
      //the previous country may not belong to the new continent, so reset it
      state.country = ''
    },
    countrySelected(state, action: PayloadAction<string>) {
      state.country = action.payload
    },
    //action to help with the UI movement
    selectedReset(state) {
      state.continent = ''
      state.country = ''
    },
    worldComparison(state, action: PayloadAction<boolean>) {
      state.worldComparison = action.payload
    },
  }
})

// Export the auto-generated action creator with the same name
export const { continentSelected } = selectionSlice.actions
export const { countrySelected } = selectionSlice.actions
export const { selectedReset } = selectionSlice.actions
export const { worldComparison } = selectionSlice.actions

// Export the generated reducer function
export default selectionSlice.reducer