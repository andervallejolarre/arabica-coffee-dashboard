import type { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { modeSelected, type ModeState } from '../mode/modeSlice.ts'
import { selectedReset } from '../selection/selectionSlice.ts'

//Function that help us avoid triggering with other values
const isModeState = (value: string): value is ModeState =>
    value === 'global' || value === 'country'

const ModeSelection = () => {

    //our reducer trigger
    const dispatch = useAppDispatch()

    //the currently selected mode
    const selectedMode = useAppSelector(state => state.mode.value)

    //Option selected will be the new state value
    const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        //Does it fit our option values?
        if (isModeState(value)) {
            //we call our mode action reducer to update our mode state
            dispatch(modeSelected(value))
            //we call a selection action reducer to go back to default position
            dispatch(selectedReset())
        }
    }

    return (
        <div className="modeSelector">
            {/*htmlFor important for accesibility and testing*/}
            <label htmlFor="mode-select">Mode:</label>
            <select
                name="mode"
                id="mode-select"
                value={selectedMode}
                onChange={handleModeChange}
            >
                <option key='global' value='global'>Global Mode</option>
                <option key='country' value='country'>Country Mode</option>
            </select>
        </div>
    )
}

export default ModeSelection