import React from 'react';
import * as Chart from 'recharts';
import './AreaChart.less';

interface Props {
    data : string[]
}

const AreaChart = (props:Props) => {
    return (
        <Chart.ResponsiveContainer width="100%" height={340}>
            <Chart.AreaChart
                data={props.data}
                margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                }}
                
            >
                <Chart.CartesianGrid stroke={'#f0f0f0'} />
                <Chart.XAxis dataKey="name" stroke={"hidden"} tick={{ fill: '#a2a0a0' }} />
                <Chart.YAxis stroke={'hidden'} domain={[0, 'dataMax + 100']} tick={{ fill: '#a2a0a0' }} tickMargin={10}  />
                <Chart.Tooltip />
                <Chart.Legend verticalAlign="top" iconType={'circle'} iconSize={10} align={'right'} height={36}/>
                <Chart.Area type="natural" dataKey="react" stackId="1" stroke="#fbc746" fill="#fbc746" />
                <Chart.Area type="natural" dataKey="vue" stackId="2" stroke="#73d7d1" fill="#73d7d1" />
                <Chart.Area type="natural" dataKey="angular" stackId="3" stroke="#73cba7" fill="#73cba7" />
            </Chart.AreaChart>
        </Chart.ResponsiveContainer>
    )
}

export default AreaChart;
