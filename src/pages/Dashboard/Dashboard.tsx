import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Row, Col, Space} from "antd";
import StatisticsBox from "../../components/StatisticsBox/StatisticsBox";
// @ts-ignore
import {AntDesign, FontAwesome, Ionicons, Zocial} from "react-web-vector-icons"
import './Dashboard.less';
import AreaChart from "../../components/AreaChart/AreaChart";
import BoxTitle from "../../components/BoxTitle/BoxTitle";
import LinearChart from "../../components/LinearChart/LinearChart";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ToDoList from "../../components/ToDoList/ToDoList";
import WeatherBox from "../../components/WeatherBox/WeatherBox";
import CalendarBox from "../../components/Calendar/Calendar";
import Notification from "../../components/Notification/Notification";
import BarChart from "../../components/BarChart/BarChart";

// Json
const toDoList = require('../../json/ToDoList.json');
const calendarToDoList = require('../../json/CalendarToDoList.json');

const DashboardScreen = () => {

    const {t} = useTranslation();

    const [areaChartData,setAreaChartData] = useState([])
    const [barChartData,setAreaBarData] = useState([])
    const [linearChartData,setLinearBarData] = useState([])

    useEffect(()=>{
        getAriaChart()
        getBarChart()
        getLinearChart()
    },[])

    //Fetch data from Json file
    const getAriaChart=()=>{
        fetch('/json/AreaChart.json')
            .then(function(response){
                return response.json();
            })
            .then(function(myJson) {
                setAreaChartData(myJson.data)
            });
    }

    const getBarChart=()=>{
        fetch('/json/BarChart.json')
            .then(function(response){
                return response.json();
            })
            .then(function(myJson) {
                setAreaBarData(myJson.data)
            });
    }

    const getLinearChart=()=>{
        fetch('/json/LinearChart.json')
            .then(function(response){
                return response.json();
            })
            .then(function(myJson) {
                setLinearBarData(myJson.data)
            });
    }

    return (
        <>
            <Row gutter={[24,24]} justify={"start"} align={'middle'} className={'boxMargin'}>
                <Col lg={{span:6}} md={{span:12}} sm={{span:12}} xs={{span:24}}>
                    <StatisticsBox
                        number={'400'}
                        title={t('dashboard.forthBox.mention')}
                        color={'#66b7f0'}
                        borderColor={'#d2e6f4'}
                        icon={<AntDesign name={"twitter"} color={"#f6f6f6"} size={35} />} />
                </Col>
                <Col lg={{span:6}} md={{span:12}} sm={{span:12}} xs={{span:24}}>
                    <StatisticsBox
                        number={'13140$'}
                        title={t('dashboard.forthBox.sales')}
                        color={'#a5c562'}
                        borderColor={'#e2ead1'}
                        icon={<FontAwesome name={"dollar"} color={"#f6f6f6"} size={35} />} />
                </Col>
                <Col lg={{span:6}} md={{span:12}} sm={{span:12}} xs={{span:24}}>
                    <StatisticsBox
                        number={'9001'}
                        title={t('dashboard.forthBox.visitor')}
                        color={'#ff503f'}
                        borderColor={'#f8d7d4'}
                        icon={<Ionicons name={"md-person"} color={"#f6f6f6"} size={35} />} />
                </Col>
                <Col lg={{span:6}} md={{span:12}} sm={{span:12}} xs={{span:24}}>
                    <StatisticsBox
                        number={'13140$'}
                        title={t('dashboard.forthBox.message')}
                        color={'#f6bb42'}
                        borderColor={'#f6e7c9'}
                        icon={<Zocial name={"email"} color={"#f6f6f6"} size={35} />} />
                </Col>
            </Row>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:15}} md={{span:12}} sm={{span:24}} xs={{span:24}}>
                    <div className={"titleBox grayTitle"}>
                        <BoxTitle title={t('dashboard.title.areaChart')} icon={<Ionicons name={'md-settings'} size={25} />}/>
                    </div>
                    <div className={'areaChart mainBoxWithoutTopBorderRadius'}>
                        <AreaChart data={areaChartData}/>
                    </div>
                </Col>
                <Col lg={{span:9}} md={{span:12}} sm={{span:24}} xs={{span:24}}>
                    <div className={'greenBox'}>
                        <div className={'whiteTitle'}>
                            {t('dashboard.title.lineChart')}
                        </div>
                        <LinearChart
                            data={linearChartData}
                            color={'#7bac46'}
                            dotColor={'#7bac46'}
                            height={120}
                            dataKey={'2014'} />
                    </div>
                    <div className={'mainBoxWithoutTopBorderRadius'}>
                        <ProgressBar data={{value:'536,030 $',title:'Yearly Sales',percent:65,color:'#f7c055'}}/>
                        <ProgressBar data={{value:'4204284',title:'Yearly Vistors',percent:45,color:'#8cc152'}}/>
                        <ProgressBar data={{value:'42000',title:'Yearly Customers',percent:80,color:'#73cba7'}}/>
                    </div>
                </Col>
            </Row>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:15}} md={{span:12}} sm={{span:24}} xs={{span:24}}>
                    <div className={"titleBox greenTitle"}>
                        <BoxTitle title={t('dashboard.title.toDoList')} icon={<FontAwesome name={'plus'} size={25} />}/>
                    </div>
                    <div className={'areaChart mainBoxWithoutTopBorderRadius boxMargin'}>
                        <ToDoList items={toDoList.toDoList}/>
                    </div>
                    <div className={'progressBox'}>
                        <Row gutter={[24,24]} justify={"start"} align={'top'}>
                            <Col md={{span:12}} sm={{span:24}} xs={{span:24}}>
                                <ProgressBar data={{value:'113/200 GB',title:'From your hosting usage',percent:50,color:'#ff503f',className:'mainBox'}}/>
                            </Col>
                            <Col md={{span:12}} sm={{span:24}} xs={{span:24}} className={'secondProgressBox'}>
                                <ProgressBar data={{value:'535/986',title:'emails read',percent:55,color:'#fdce56',className:'mainBox'}}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={{span:9}} md={{span:12}} sm={{span:24}} xs={{span:24}}>
                    <div className={'blueMainBox boxMargin'}>
                        <WeatherBox />
                    </div>
                    <div>
                        <CalendarBox data={calendarToDoList.calendarToDoList} />
                    </div>
                </Col>
            </Row>
            <Row gutter={[24,24]} justify={"start"} align={'top'} className={'boxMargin'}>
                <Col lg={{span:15}} md={{span:12}} sm={{span:24}} xs={{span:24}}>
                    <div className={"titleBox grayTitle"}>
                        <BoxTitle title={t('dashboard.title.Notification')} icon={<Ionicons name={'md-settings'} size={25} />}/>
                    </div>
                    <div className={'mainBoxWithoutTopBorderRadius boxMargin'}>
                        <Notification
                            title={'There are 5 new twitter messages are waiting you for reply them'}
                            icon={<AntDesign name={'twitter'} />}
                            color={'#8ac6f0'}
                            borderColor={'#f5fafe'} />
                        <Notification
                            title={'There are 5 new twitter messages are waiting you for reply them'}
                            icon={<Zocial name={'email'} />}
                            color={'#f6bb42'}
                            borderColor={'#fef6e5'} />
                        <Notification
                            title={'There are 5 new twitter messages are waiting you for reply them'}
                            icon={<FontAwesome name={'dollar'} />}
                            color={'#a5c562'}
                            borderColor={'#edf3e0'} />
                    </div>
                </Col>
                <Col lg={{span:9}} md={{span:12}} sm={{span:24}} xs={{span:24}} className={'boxMargin'}>
                    <div className={"titleBox grayTitle"}>
                        <BoxTitle title={t('dashboard.title.dataGraph')} icon={<Ionicons name={'md-settings'} size={25} />}/>
                    </div>
                    <div className={'purpleBox'}>
                        <Row align={'middle'} justify={'space-between'} className={'dataGraphText'}>
                            <Col span={12}>$540  (0.4%) </Col>
                            <Col span={12} className={'textRight'}>Today</Col>
                        </Row>
                        <LinearChart
                            data={linearChartData}
                            color={''}
                            dotColor={'#fff'}
                            dataKey={'value'}
                            height={80}
                            hide={true} />
                    </div>
                    <div className={'mainBoxWithoutTopBorderRadius'}>
                        <Row align={'middle'} justify={'space-between'}>
                            <Col span={12}>
                                <div>433,22 $</div>
                                <div>Total earned</div>
                            </Col>
                            <Col span={12}>
                                <BarChart
                                    data={barChartData}
                                    color={'#9972b5'}
                                    dataKey={'value'}
                                    barSize={10}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )

}

export default DashboardScreen;
