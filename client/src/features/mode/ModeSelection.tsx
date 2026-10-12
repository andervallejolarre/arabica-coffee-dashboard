import type { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { modeSelected, type ModeState } from '../mode/modeSlice.ts'
import { selectedReset } from '../selection/selectionSlice.ts'

const isModeState = (value: string): value is ModeState =>
    value === 'global' || value === 'country'

const ModeSelection = () => {

    //our reducer trigger
    const dispatch = useAppDispatch()

    //the currently selected mode
    const selectedMode = useAppSelector(state => state.mode.value)

    const handleModeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        if (isModeState(value)) {
            dispatch(modeSelected(value))
            dispatch(selectedReset())
        }
    }

    return (
        <div className="modeSelector">
            {/*<label htmlFor="mode-select">Mode:</label>*/}
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