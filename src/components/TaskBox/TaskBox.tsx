import React from 'react';
import {Col, Row} from 'antd'
import "./TaskBox.less"
// @ts-ignore
import {FontAwesome} from "react-web-vector-icons"

interface dataType {
    background: string,
    title: string,
    subTitle: string,
    star: {
        status: boolean,
        color: string
    },
    text: string,
}

interface Props {
    data: dataType
}

const TaskBox = (props: Props) => {

    return(
        <Row align={'middle'} justify={'space-between'} className={'taskBox mainBox'} style={{background:props.data.background}}>
            <Col span={24}>
                <div>
                    <Row>
                        <Col span={20} className={'taskTitle'}>
                            {props.data.title}
                        </Col>
                        <Col span={4} className={'taskStar'}>
                            {props.data.star.status === true ?
                                <FontAwesome name={"star"} size={20} color={'#f6bb42'} />
                                :
                                <FontAwesome name={"star"} size={20} color={props.data.star.color} />
                            }
                        </Col>
                    </Row>
                </div>
                <div className={'taskSubTitle'}>
                    {props.data.subTitle}
                </div>
                <div className={'taskText'}>
                    {props.data.text}
                </div>
            </Col>
        </Row>
    )
}

export default TaskBox;
