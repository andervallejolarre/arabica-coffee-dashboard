import { AreaChart } from '@mantine/charts';

export interface GraphSeries {
    //key of the value in each data row
    name: string
    label: string
    color: string
}

//interface for handling global and country production
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
                textColor="rgb(186, 215, 219)"
                activeDotProps={{ r: 4, strokeWidth: 1, fill: 'rgb(186, 215, 219)' }}
                //Editing some styles
                styles={{
                    tooltip: { backgroundColor: 'rgb(33, 68, 56, 90%)'},
                    tooltipLabel: {color: 'rgb(186, 215, 219)'},
                    tooltipItemName: {color: 'rgb(186, 215, 219)'},
                    tooltipItemData: {color: 'rgb(186, 215, 219)'},
                }}
            />
        </div>
    )
}

export default Graph