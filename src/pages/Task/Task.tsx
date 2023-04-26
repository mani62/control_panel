import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Row, Col, Tabs} from "antd";
// @ts-ignore
import {FontAwesome} from "react-web-vector-icons"
import './Task.less';
import TaskBox from "../../components/TaskBox/TaskBox";

interface DataType {
    background: string,
    title: string,
    star:{
        status: boolean,
        color: string
    },
    subTitle: string,
    flag: number,
    text: string
}

const TaskScreen = () => {

    const {t} = useTranslation();

    const [data, setData] = useState<DataType[]>([]);

    useEffect(()=>{
        getData()
    },[])

    //Fetch data from Json file
    const getData=(flag?: string | number)=>{
        let newData: DataType[] = [];
        fetch('/json/Task.json')
            .then(function(response){
                return response.json();
            })
            .then(function(myJson) {
                const myData = myJson.data
                if(flag && flag != 1){
                    myData.map((item: DataType)=>{
                        if(item.flag == flag)
                            newData.push(item)
                    })
                    setData(newData)
                }else
                    setData(myData)
            });
    }

    //Handle tab data
    const handleOnClick = (val: string | number) =>{
        getData(val)
    }

    return (
        <div className={'taskList'}>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:24}} md={{span:24}} sm={{span:24}} xs={{span:24}}>
                    <Row className={"titleBox grayTitle taskBoxTitle"}>
                        <Col lg={{span:10}} md={{span:8}} sm={{span:12}} xs={{span:12}}>
                            {t('task.title.task')}
                        </Col>
                        <Col lg={{span:14}} md={{span:16}} sm={{span:12}} xs={{span:12}} className={'taskBoxIcon'}>
                            <span  className={'icons'}>
                                <span>
                                    <FontAwesome name={'plus'} size={20} />
                                </span>
                            </span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:24}} md={{span:24}} sm={{span:24}} xs={{span:24}}>
                    <Tabs
                        items={[{
                            label: <span className={'tabText'}>{t('task.title.all')}</span>,
                            key: '1',
                            children: <TasksList data={data} />,
                        },{
                            label: <span className={'tabText'}>{t('task.title.home')}</span>,
                            key: '2',
                            children: <TasksList data={data} />,
                        },{
                            label: <span className={'tabText'}>{t('task.title.work')}</span>,
                            key: '3',
                            children: <TasksList data={data} />,
                        },
                        {
                            label: <span className={'tabText'}>{t('task.title.shopping')}</span>,
                            key: '4',
                            children: <TasksList data={data} />,
                        },
                        {
                            label: <span className={'tabText'}>{t('task.title.entertainment')}</span>,
                            key: '5',
                            children: <TasksList data={data} />,
                        }]}
                        onTabClick={(val)=>handleOnClick(val)}
                    />
                </Col>
            </Row>
        </div>
    )

}

const TasksList = (props: any) => {

    const data = props.data
    // console.log(props)

    return(
        <Row gutter={[24,24]}>
            {data && data.length > 0 && data.map((item: any, index: number)=>{
                return (
                    <Col lg={{span:8}} md={{span:12}} sm={{span:12}} xs={{span:24}} key={index}>
                        <TaskBox data={item}/>
                    </Col>
                )
            })}
        </Row>
    )
}

export default TaskScreen;
