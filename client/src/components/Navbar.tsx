import { useAppSelector } from '../hooks/index'
import type { ModeState } from '../features/mode/modeSlice';

import ModeSelection from '../features/mode/ModeSelection'
import VariableSelection from '../features/selection/VariableSelection'

const Navbar = () =>{

    const modeSelected: ModeState = useAppSelector(state => state.mode.value)

    return(
        <div className='navbar'>
            <ModeSelection />
            {modeSelected === 'country' && <VariableSelection />}
        </div>
    )
}

export default Navbar