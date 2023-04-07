import * as React from "react";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/Auth/AuthContext";
import {Row, Col, Form, Input, Button} from "antd";
import {useTranslation} from "react-i18next";
import JWT from "expo-jwt";
// @ts-ignore
import {MaterialIcons} from 'react-web-vector-icons';
import './loginScreen.less'

const LoginScreen = () =>{
    const {t} = useTranslation();
    const [loading,setLoading] = useState(false)

    const onFinish = (values: any) => {
        setLoading(true)
        const userName = values.username;
        const password = values.password;
        if(userName === 'admin' && password === '123456'){
            const userData = {
                id:1,
                name:'John',
                family:'Smith',
            }
            let token = JWT.encode(userData, "loginData");
            window.localStorage.setItem("loginData", token);
            appLogIn();
            setLoading(false)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Row justify={'center'} align={'middle'} className={'loginScreen'}>
                <Col lg={{span:6}} md={{span:12}} sm={{span:12}} xs={{span:24}}>
                    <Col span={24} className={'loginHeader'}>
                        {t('login.header')}
                    </Col>
                    <Col span={24} className={'loginForm'}>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: t('login.message.usernameError') }]}
                                initialValue={'admin'}
                            >
                                <Input
                                    placeholder={t('login.username')}
                                    suffix={<MaterialIcons name={'person'} size={20} className={'icons'} />}
                                    value={'admin'}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: t('login.message.passwordError') }]}
                                initialValue={'123456'}
                            >
                                <Input.Password placeholder={t('login.password')} value={'123456'} />
                            </Form.Item>

                            <Form.Item className={"submitBtn"}>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </>
    );
}

export const appLogIn = () =>{
    window.localStorage.setItem("isLogin", "true");
    window.location.href = "/";
}

export const appLogOut = () =>{
    window.localStorage.removeItem("isLogin");
    window.localStorage.removeItem("loginData");
    window.location.href = "/";
}

export default LoginScreen
