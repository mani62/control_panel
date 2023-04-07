import React, {useState} from 'react';
import './App.css';
import Router from './Router'
import {ConfigProvider} from 'antd';
import {AuthProvider} from "./context/Auth/AuthContext";
import {UserInfo} from "./context/Auth/Auth.type";
import MainLayout from "./layout/mainLayout";

function App() {

    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [userInfo,setUserInfo] = useState<UserInfo>({
        id:null,
        name:null,
        family:null
    });

    return (
        // @ts-ignore
        <AuthProvider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo }}>
            <Router />
        </AuthProvider>
    );
}

export default App;
