import {createContext, ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AUTH_KEY = "AuthToken"

export type AuthContextProps = {
    token: string | undefined,
    login: (credentials: {username: string, password: string}) => void,
    logout: () => void,

}

export const AuthContext = createContext<AuthContextProps>({
    token: undefined,
    login: () => {console.error("Login not initialized")},
    logout: () => {console.error("Logout went wrong")}
})

export type AuthProviderProps = {
    children : ReactElement
}

export default function AuthProvider({children}: AuthProviderProps){
    const [token, setToken] = useState<string | undefined>(localStorage.getItem(AUTH_KEY) ?? undefined)
    const navigate = useNavigate()

    const login = (credentials: {username: string, password: string}) => {
        axios.post("/auth/login", credentials)
            .then(response => response.data)
            .then((newToken) => {
                setToken(newToken)
                localStorage.setItem(AUTH_KEY, newToken)
            })
            .then(() => navigate("/"))
            .catch(() => console.error("Login failed. Credentials invalid?"))
    }

    const logout = () => {
        localStorage.removeItem(AUTH_KEY)
        setToken("")
        console.log("You have been logged out")
        navigate("/")
    }

    return <div>
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    </div>

}
