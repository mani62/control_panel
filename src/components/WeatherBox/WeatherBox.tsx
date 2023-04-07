import React, {useEffect, useState} from 'react';
import {Col, Row} from 'antd'
import "./WeatherBox.less"
import axios from "axios";
// @ts-ignore
import {Entypo} from 'react-web-vector-icons'

interface Weather {
    degree: number,
    cityName: string,
    status: string,
    icon: string,
}

const WeatherBox = () => {

    const [data,setData] = useState<Weather>();

    useEffect(() => {
        getWeatherInfo();
    },[])

    const getWeatherInfo = () => {
        //Login to https://rapidapi.com/ and get API key
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: 'Nottingham'},
            headers: {
                'X-RapidAPI-Key': 'ea58d23a9fmshfa428babbd7eed5p104912jsneae298636b42',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            const data = response.data;
            let splitIcon = data.current.condition.icon.split('/')
            const weatherData = {
                degree: data.current.temp_c,
                cityName: data.location.name,
                status: data.current.condition.text,
                icon: '/'+splitIcon[3]+'/'+splitIcon[4]+'/'+splitIcon[5]+'/'+splitIcon[6],
            }
            setData(weatherData);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return(
        <Row align={'middle'} justify={'space-between'} className={'blueBox weatherBox'}>
            <Col span={6}>
                <img src={data?.icon} alt={data?.status} />
            </Col>
            <Col span={7}>
                <span className={'degree'}>{data?.degree}</span>
                <span className={'degreeSign'}>°</span>
            </Col>
            <Col span={11}>
                <div>
                    <span className={'cityName'}>{data?.cityName}</span>
                    <span className={'locationIcon'}><Entypo name={'location-pin'} size={15} color={'#fff'} /></span>
                </div>
                <div className={'status'}>{data?.status}</div>
            </Col>
        </Row>
    )
}

export default WeatherBox;
