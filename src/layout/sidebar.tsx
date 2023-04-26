import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {AuthContext} from "../context/Auth/AuthContext";
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import {FontAwesome, MaterialCommunityIcons, MaterialIcons, Zocial, Ionicons} from 'react-web-vector-icons'
import {Layout, Menu, Tag} from "antd";
import {appLogOut} from "../pages/Auth/Login";
// less
import "./sidebar.less";

const {Sider} = Layout;

// Sidebar Component ---------------------------------------------------------------
const Sidebar = (props: any) => {
    //-- lang
    const {t} = useTranslation();

    //-- app-context
    const {userInfo, loggedIn} = useContext(AuthContext);

    const [collapsed, setCollapsed] = useState(true);
    let sideBarWidth = '290px'

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={sideBarWidth}
            collapsed={collapsed}
            onCollapse={(value)=>setCollapsed(value)}
            className={'sidebar'}
        >
            <SidebarContent/>
        </Sider>
    );
};

const SidebarContent = () => {
    let navigate = useNavigate();

    //-- lang
    const {t} = useTranslation();

    return (
        <Menu
            theme="dark"
            mode="inline"
            className={'sideBarMenu'}
            items={[
                {
                    key: '1',
                    icon: <FontAwesome name={'dashboard'} size={20}/>,
                    children: [{
                        key: '11',
                        label: <a onClick={()=>navigate("/")}>{t('sidebar.dashboard')}</a> ,
                    }],
                    label: t('sidebar.dashboard'),
                },
                {
                    key: '2',
                    icon: <MaterialCommunityIcons name={'chart-bubble'} size={20}/>,
                    label: t('sidebar.charts'),
                    children: [{
                        key: '21',
                        label: t('sidebar.charts'),
                    }],
                },
                {
                    key: '3',
                    icon: <MaterialCommunityIcons name={'format-list-bulleted-type'} size={20}/>,
                    label: t('sidebar.tasks'),
                    children: [{
                        key: '31',
                        label: <a onClick={()=>navigate("/task")}>{t('sidebar.tasks')}</a> ,
                    }],
                },
                {
                    key: '4',
                    icon: <MaterialCommunityIcons name={'comment'} size={20}/>,
                    label: t('sidebar.comment'),
                    children: [{
                        key: '41',
                        label: t('sidebar.comment'),
                        itemIcon: <Tag color="#c96d23">9</Tag>
                    }],
                },
                {
                    key: '5',
                    icon: <MaterialIcons name={"settings"} size={20}/>,
                    label: t('sidebar.setting'),
                    children: [{
                        key: '51',
                        label: t('sidebar.dashboard'),
                    }],
                },
                {
                    key: '6',
                    icon: <FontAwesome name={'star'} size={20}/>,
                    label: t('sidebar.feedback'),
                    children: [{
                        key: '61',
                        label: t('sidebar.feedback'),
                    }],
                },
                {
                    key: '7',
                    icon: <MaterialCommunityIcons name={'link-variant'} size={20}/>,
                    label: t('sidebar.links'),
                    children: [{
                        key: '71',
                        label: t('sidebar.links'),
                    }],
                },
                {
                    key: '8',
                    icon: <MaterialCommunityIcons name={'share-variant'} size={20}/>,
                    label: t('sidebar.social'),
                    children: [{
                        key: '81',
                        label: t('sidebar.social'),
                    }],
                },
                {
                    key: '9',
                    icon: <Zocial name={'email'} size={20}/>,
                    label: t('sidebar.mail'),
                    children: [{
                        key: '91',
                        label: <a onClick={()=>navigate("/mail")}>{t('sidebar.mail')}</a> ,
                    }],
                },
                {
                    key: '10',
                    icon: <Ionicons name={'md-trophy'} size={20}/>,
                    label: t('sidebar.achievement'),
                    children: [{
                        key: '101',
                        label: t('sidebar.achievement'),
                    }],
                },
                {
                    key: '20',
                    icon: <FontAwesome name={'power-off'} size={20}/>,
                    label: t('sidebar.logout'),
                    children: [{
                        key: '201',
                        label: <a onClick={appLogOut}>{t('sidebar.logout')}</a> ,
                    }],
                }
            ]}
        />
    );
};

export default Sidebar;
