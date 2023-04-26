import React, {useState} from 'react';
import './ToDoList.less'
import RLDD from "react-list-drag-and-drop/lib/RLDD";
// @ts-ignore
import {MaterialCommunityIcons, Feather} from "react-web-vector-icons"
import {Row, Col} from "antd";

interface Item {
    id: number;
    title: string;
}

interface Props {
    items: Item[];
}

const ToDoList = (props: Props) =>{
    const [list,setList] = useState<Item[]>(props.items || [])

    const itemRenderer = (item: Item, index: number) => {
        return (
            <Row justify={"space-between"} align={'middle'} className="toDoItem">
                <Col>
                    <span className={'toDoDragIcon'}>
                        <MaterialCommunityIcons name={"drag"} size={25} />
                    </span>
                    <span className="toDoTitle">{item.title}</span>
                </Col>
                <Col>
                    <span className={"toDoCheckIcon"}>
                        <Feather name={"check"} size={20} />
                    </span>
                    <span className={"toDoCloseIcon"}>
                    <MaterialCommunityIcons name={"close"} size={20} />
                </span>
                </Col>
            </Row>
        );
    };

    const handleRLDDChange = (reorderedItems: Array<Item>) => {
        setList(reorderedItems);
    };

    return (
        <div className="toDoList horizontal">
            <RLDD
                cssClasses="toDoList-list-container"
                layout="vertical"
                items={list}
                itemRenderer={itemRenderer}
                onChange={handleRLDDChange}
            />
        </div>
    )
}

export default ToDoList;
