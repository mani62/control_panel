import React, { useState } from 'react';
import {Row, Col} from "antd";
// @ts-ignore
import {FontAwesome} from 'react-web-vector-icons';
// @ts-ignore
import Calendar from 'react-calendar';
import './Calendar.less';

interface Props {
    data:{
        title:string,
        time:string
        map(param: (item: any,index:number) => void): any;
    }
}

const CalendarBox = (props:Props) => {
    const [value, onChange] = useState(new Date());
    return (
        <div className={'calendarWrapper'}>
            <Calendar
                onChange={onChange}
                value={value}
                nextLabel={<FontAwesome name={'angle-right'} size={25} />}
                next2Label={<FontAwesome name={'angle-double-right'} size={25} />}
                prevLabel={<FontAwesome name={'angle-left'} size={25} />}
                prev2Label={<FontAwesome name={'angle-double-left'} size={25} />}
            />
            <div className={'toDoLists'}>
                {props.data.map((item,index) => {
                    return(<Row align={'middle'} justify={'space-between'} className={'toDoItems'} key={index}>
                        <Col className={'title'}>{item.title}</Col>
                        <Col className={'time'}>{item.time}</Col>
                    </Row>)
                })}
            </div>
        </div>
    );
}

export default CalendarBox;