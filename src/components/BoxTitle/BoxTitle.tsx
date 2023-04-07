import React from 'react';
import './BoxTitle.less';
import {Col, Row} from "antd";

interface Props {
    title : string,
    icon : any
}

const BoxTitle = (props:Props) => {
    return (
        <Row justify={"space-between"} align={'middle'}>
            <Col span={12}>{props.title}</Col>
            <Col span={12} className={'titleIcon'}>
                {props.icon}
            </Col>
        </Row>
    )
}

export default BoxTitle;
