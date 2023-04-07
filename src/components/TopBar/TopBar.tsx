import React from 'react';
import {Avatar, Image, Row, Dropdown, Space, MenuProps} from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import './TopBar.less'
import {useTranslation} from "react-i18next";
import {appLogOut} from "../../pages/Auth/Login";

interface Props {
    picture?: string;
    fullName?:string;
}

const TopBar = (props: Props) =>{
    const {t} = useTranslation();

    const items: MenuProps['items'] =
        [
            {
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        {t('header.profile')}
                    </a>
                ),
                key: '0',
            },
            {
                label: (
                    <a target="_blank" onClick={appLogOut}>
                        {t('header.logOut')}
                    </a>
                ),
                key: '1',
            }
        ];

    return (
        <Row className={'topBar'}>
            <div className={'profilePic'}>
                {props && props.picture ?
                    <Avatar src = {<Image src={props.picture}/>} />
                        :
                    <Avatar icon = {<UserOutlined />} />
                }
            </div>
            <div className={'profileName'}>
                <Dropdown menu={{items}}>
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            {t('header.hi')}, {props?.fullName}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Row>
    )
}

export default TopBar;
