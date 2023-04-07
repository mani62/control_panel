import React from 'react';
import {Col, Progress, Row} from 'antd'
import "./Notification.less"
// @ts-ignore
import {AntDesign} from 'react-web-vector-icons'

interface Props {
    title: string,
    color: string,
    borderColor: string,
    icon: any
}

const Notification = (props: Props) => {

    return(
        <Row align={'middle'} className={'mainBox notificationBox'}>
            <Col xl={{span:2}} md={{span:4}} sm={{span:6}} xs={{span:6}}>
                <div className={'noteIcon'} style={{background:props.color,borderColor:props.borderColor}}>
                    {props.icon}
                </div>
            </Col>
            <Col xl={{span:22}} md={{span:20}} sm={{span:18}} xs={{span:18}} className={'titleWrapper'}>
                <div className={'noteTitle'} style={{background:props.color}}>
                    <span className={'iconArrow'} style={{background:props.color}}></span>
                    {props.title}
                </div>
            </Col>
        </Row>
    )
}

export default Notification;
