import { useAppSelector } from '../../hooks/index'
import type { ProductionState } from './productionSlice';
import type { ModeState } from '../mode/modeSlice';
import Graph from '../../components/Graph'

const ProductionGraphic = () => {
    // We use the selector hook to get state.production
    const selectedMode: ModeState = useAppSelector(state => state.mode.value)

    const globalFetch: ProductionState = useAppSelector(state => state.production.global);
    const countryFetch: ProductionState = useAppSelector(state => state.production.country);

    return (
        <section className="chart">
            {/* We ar passing whats inside state.production */}
            <Graph {...(selectedMode === 'global' ? globalFetch : countryFetch)}/>
        </section>
    )
}

export default ProductionGraphic