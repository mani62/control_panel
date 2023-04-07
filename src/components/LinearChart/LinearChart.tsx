import React from 'react';
import * as Chart from 'recharts';
import './LinearChart.less';

interface Props {
    data : any,
    color: string,
    dataKey: string,
    dotColor?: string,
    height?: number,
    hide?: boolean
}

const LinearChart = (props:Props) => {

    return (
        <Chart.ResponsiveContainer width="100%" height={props.height}>
            <Chart.LineChart
                data={props.data}
                margin={{
                    top: 0,
                    right: 20,
                    left: -20,
                    bottom: -10,
                }}
            >
                <Chart.CartesianGrid stroke={props.color} />
                <Chart.XAxis dataKey="name" stroke={props.color} tickLine={false} tick={{ fill: '#fff' }} hide={props.hide?props.hide:false} />
                <Chart.YAxis type={'number'} stroke={'hidden'} domain={[0, 'dataMax + 10']} tick={{ fill: '#fff' }} hide={props.hide?props.hide:false} />
                <Chart.Line dataKey={props.dataKey} stroke={'#fff'} strokeWidth={1} dot={{ strokeWidth: 1, stroke:'#fff', fill: props.dotColor }} />
            </Chart.LineChart>
        </Chart.ResponsiveContainer>
    )
}

export default LinearChart;
