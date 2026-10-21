import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { worldComparison } from './selectionSlice.ts'

const WorldComparisonToggle = () => {

    const dispatch = useAppDispatch()

    //state value
    const showWorldComparison = useAppSelector(state => state.selection.worldComparison)

    return (
        <div className="switch">
        <label className="toggleLabel" htmlFor="global-ref">Compare</label>
        <input type="checkbox" name="global-ref" id="global-ref"
            checked={showWorldComparison}
            //triggering our action reducer
            onChange={event => dispatch(worldComparison(event.currentTarget.checked))}
        />
        </div>
    )
}

export default WorldComparisonToggle
