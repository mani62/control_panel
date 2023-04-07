import React, {useContext, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Row, Col} from "antd";
import "moment/locale/fa";
import {AuthContext} from "../context/Auth/AuthContext";
import Search from "../components/Search/Search";
import {Badge} from 'antd';
// @ts-ignore
import {MaterialIcons, Zocial} from 'react-web-vector-icons'
import TopBar from "../components/TopBar/TopBar";

const Header = () => {
    // -- translate helper
    const {t} = useTranslation("common");

    //-- load auth context
    const {userInfo} = useContext(AuthContext);

    useEffect(() => {

    }, []);

    return (
        <Row gutter={[0,16]} className={'header'}>
            <Col xl={{span: 5}} lg={{span:6}} md={{span: 6}} sm={{span: 12}} className={'pageTitle'}>
                DashBoard
            </Col>
            <Col xl={{span: 10}} lg={{span:10}} md={{span: 10}} sm={{span: 12}} xs={{span: 24}}>
                <Row justify={'space-between'}>
                    <Col lg={{span: 18}} sm={{span:14}} xs={{span: 18}} className={'searchBox'}>
                        <Search onChange={(val)=>console.log(val)}/>
                    </Col>
                    <Col lg={{span: 6}} sm={{span:10}} xs={{span: 6}} className={'socials'}>
                        <Badge size="small" count={4}>
                            <MaterialIcons name={'notifications'} size={20}/>
                        </Badge>
                        <Badge size="small" color={'#f6bb42'} count={1}>
                            <Zocial name={'email'} size={18}/>
                        </Badge>
                    </Col>
                </Row>
            </Col>
            <Col xl={{span: 9}} lg={{span: 8}} md={{span: 8}} sm={{span: 12}} xs={{span: 24}}>
                <TopBar fullName={userInfo.name+' '+userInfo.family} picture={''} />
            </Col>
        </Row>
    );
};

export default Header;
