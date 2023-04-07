export interface UserInfo{
    id:number | null,
    name:string | null,
    family:string | null
}

export interface AuthType {
    userInfo:UserInfo | null,
    setUserInfo: (userInfo: UserInfo) => void,
    loggedIn: boolean,
    setLoggedIn: (loggedIn: boolean) => void
}
