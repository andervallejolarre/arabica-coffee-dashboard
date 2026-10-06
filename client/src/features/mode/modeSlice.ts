import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

//our state type
export type ModeState = 'global' | 'country'

interface ModeSliceState{
    value: ModeState
}

const initialState: ModeSliceState = {
    value: 'global'
}

const modeSlice = createSlice({
  //This reducer will be stablished in our store
  name: 'mode',
  initialState,
  reducers: {
    //Our only reducer. It's going to be exported next
    modeSelected(state, action: PayloadAction<ModeState>) {
      state.value = action.payload
    }
  }
})

// Export the auto-generated action creator with the same name
export const { modeSelected } = modeSlice.actions

// Export the generated reducer function
export default modeSlice.reducer