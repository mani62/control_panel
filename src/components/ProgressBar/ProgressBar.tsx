import React from 'react';
import './ProgressBar.less'
import {Progress} from 'antd';

interface Props {
    data:{
        value: string,
        title: string,
        color: string,
        percent: number,
        className?: string,
    };
}

const ProgressBar = (props: Props) =>{

    return (
        <div className={props.data.className}>
            <div className={"progressValue"} style={{color:props.data.color}}>
                {props.data.value}
            </div>
            <div className={'progressTitle'}>
                {props.data.title}
            </div>
            <div>
                <Progress percent={props.data.percent} strokeColor={props.data.color} showInfo={false} />
            </div>
        </div>
    )
}

export default ProgressBar;
