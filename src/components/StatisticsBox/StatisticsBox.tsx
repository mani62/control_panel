import React from 'react';
import {Col, Progress, Row} from 'antd'
import "./StatisticsBox.less"

interface Props {
    number: string,
    title: string,
    color: string,
    borderColor: string,
    icon: any
}

const StatisticsBox = (props: Props) => {

    return(
        <Row align={'middle'} className={'statisticsBox mainBox'}>
            <Col span={10} className={'progressBox'}>
                <Progress
                    type="circle"
                    percent={40}
                    format={() => <div className={`boxIcon`} style={{background:props.color}}>{props.icon}</div>}
                    strokeColor={props.borderColor}
                    strokeLinecap={"square"}
                    strokeWidth={10}
                    width={80}
                />
            </Col>
            <Col span={14} className={'textBox'}>
                <div className={'boxNumber'}>{props.number}</div>
                <div className={'boxTitle'}>{props.title}</div>
            </Col>
        </Row>
    )
}

export default StatisticsBox;
