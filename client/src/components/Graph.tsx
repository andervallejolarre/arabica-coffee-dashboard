import { AreaChart } from '@mantine/charts';
import type { ProductionState } from '../features/production/productionSlice';

const Graph = (props: ProductionState) => {
    return (
        <div>
            {/*using a Mantine widget*/}
            <AreaChart
                h="50vh"
                data={props.production}
                // X 
                dataKey="year"
                strokeWidth={2}
                dotProps={{ r: 1.5, strokeWidth: 1 }}
                // Y 
                series={[
                    { name: 'value', color: 'rgba(151, 196, 211, 1)' },
                ]}
                curveType="linear"
                tickLine="x"
            />
        </div>
    )
}

export default Graph