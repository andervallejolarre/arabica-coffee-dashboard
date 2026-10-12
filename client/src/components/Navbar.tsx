import { useAppSelector } from '../hooks/index'
import type { ModeState } from '../features/mode/modeSlice'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

import ModeSelection from '../features/mode/ModeSelection'
import VariableSelection from '../features/selection/VariableSelection'
import WorldComparisonToggle from '../features/selection/WorldComparisonToggle'

const Navbar = () => {

    const modeSelected: ModeState = useAppSelector(state => state.mode.value)
    //hook ref for using react transitions on mount and unmount components
    const variableSelectionRef = useRef(null)
    const toggleRef = useRef(null)
    return (
        <section className='navbar'>
            <h4>COFFEE CHARTS</h4>
            <div className='selectors'>
                <ModeSelection />
                <CSSTransition
                    nodeRef={variableSelectionRef}
                    in={modeSelected === 'country'}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit>
                    <div ref={variableSelectionRef}>
                        <VariableSelection />
                    </div>
                </CSSTransition>
            </div>
            <CSSTransition
                nodeRef={toggleRef}
                in={modeSelected === 'country'}
                timeout={300}
                classNames="fade"
                unmountOnExit>
                <div ref={toggleRef}>
                    <WorldComparisonToggle />
                </div>
            </CSSTransition>
        </section>
    )
}

export default Navbar