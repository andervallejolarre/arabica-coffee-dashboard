import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { worldComparison } from './selectionSlice.ts'

const WorldComparisonToggle = () => {

    const dispatch = useAppDispatch()

    const showWorldComparison = useAppSelector(state => state.selection.worldComparison)

    return (
        <div className="switch">
        <label htmlFor="global-ref">Compare</label>
        <input type="checkbox" name="global-ref" id="global-ref"
            checked={showWorldComparison}
            onChange={event => dispatch(worldComparison(event.currentTarget.checked))}
        />
        </div>
    )
}

export default WorldComparisonToggle
