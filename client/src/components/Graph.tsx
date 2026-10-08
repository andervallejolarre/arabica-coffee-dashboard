import { AreaChart } from '@mantine/charts';

export interface GraphSeries {
    //key of the value in each data row
    name: string
    label: string
    color: string
}

export interface GraphProps {
    data: Record<string, number | undefined>[]
    series: GraphSeries[]
}

const Graph = ({ data, series }: GraphProps) => {
    return (
        <div>
            {/*using a Mantine widget*/}
            <AreaChart
                h="35vh"
                data={data}
                // X 
                dataKey="year"
                strokeWidth={2}
                dotProps={{ r: 1.5, strokeWidth: 1 }}
                // Y 
                series={series}
                withLegend
                curveType="linear"
                tickLine="x"
            />
        </div>
    )
}

export default Graph