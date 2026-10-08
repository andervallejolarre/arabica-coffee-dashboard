import { Switch } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { worldComparison } from './selectionSlice.ts'

const WorldComparisonToggle = () => {

    const dispatch = useAppDispatch()

    const showWorldComparison = useAppSelector(state => state.selection.worldComparison)

    return (
        <Switch
            label="World's Production comparison"
            checked={showWorldComparison}
            onChange={event => dispatch(worldComparison(event.currentTarget.checked))}
        />
    )
}

export default WorldComparisonToggle
