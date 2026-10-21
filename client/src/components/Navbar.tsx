//We are using CSS Transition to ease the mount and unmount of variables selectors and toggle
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

import { useAppSelector } from '../hooks/index'
import type { ModeState } from '../features/mode/modeSlice'

import ModeSelection from '../features/mode/ModeSelection'
import VariableSelection from '../features/selection/VariableSelection'
import WorldComparisonToggle from '../features/selection/WorldComparisonToggle'

const Navbar = () => {

    const modeSelected: ModeState = useAppSelector(state => state.mode.value)
    //hook ref are necessary for using react transitions on mount and unmount components
    //We need one for each section we want to animate
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
                    classNames="fade"//Remember it is classNames with that final S
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