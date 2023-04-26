import React, {useEffect} from 'react';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

//component
import DashboardScreen from './pages/Dashboard'
import AuthScreen from './pages/Auth'
import {AuthContext} from "./context/Auth/AuthContext";
import MainLayout from "./layout/mainLayout";
import MailScreen from "./pages/Mail";
import TaskScreen from "./pages/Task";

function Router() {
    // --- if user is login
    const loggedIn = window.localStorage.getItem("isLogin");

    useEffect(()=>{

    })

    return (
        <BrowserRouter>
            {loggedIn ?
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<DashboardScreen/>}/>
                        <Route path="/mail" element={<MailScreen/>}/>
                        <Route path="/task" element={<TaskScreen/>}/>
                    </Routes>
                </MainLayout>
            :
                <Routes>
                    <Route path="/" element={<AuthScreen/>}/>
                </Routes>
            }
        </BrowserRouter>
    );
}

export default Router;
