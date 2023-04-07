import React, {useState, createContext, useEffect} from "react";
import {AuthType} from "./Auth.type";
import decode from "jwt-decode";
interface AuthProviderProps{
    children: React.ReactNode
}
//ToDo: remove any
export const AuthContext = createContext<AuthType | any>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id:null,
        name:null,
        family:null
    });

    useEffect(()=>{
        let userData: any = window.localStorage.getItem("loginData");
        const isLogin: any = window.localStorage.getItem("isLogin");
        if (userData) {
            userData = decode(userData);
        }
        setLoggedIn(isLogin)
        setUserInfo(userData)
    },[children])

    return (
        <AuthContext.Provider value={{ loggedIn,setLoggedIn,userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
