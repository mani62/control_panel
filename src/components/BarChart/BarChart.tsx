import React from 'react';
import * as Chart from 'recharts';
import './BarChart.less';

interface Props {
    data : string[]
    color: string,
    dataKey: string,
    height?: number,
    barSize?: number,
}

const BarChart = (props:Props) => {

    return (
        <Chart.ResponsiveContainer width="100%" height={props.height?props.height:50}>
            <Chart.BarChart width={150} height={40} data={props.data} barCategoryGap={1} barSize={10}>
                <Chart.Bar dataKey={props.dataKey} fill={props.color} />
            </Chart.BarChart>
        </Chart.ResponsiveContainer>
    )
}

export default BarChart;
