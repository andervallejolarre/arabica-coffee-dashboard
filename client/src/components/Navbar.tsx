import { useAppSelector } from '../hooks/index'
import type { ModeState } from '../features/mode/modeSlice';

import ModeSelection from '../features/mode/ModeSelection'
import VariableSelection from '../features/selection/VariableSelection'

const Navbar = () =>{

    const modeSelected: ModeState = useAppSelector(state => state.mode.value)

    return(
        <section className='navbar'>
            <ModeSelection />
            {modeSelected === 'country' && <VariableSelection />}
        </section>
    )
}

export default Navbar