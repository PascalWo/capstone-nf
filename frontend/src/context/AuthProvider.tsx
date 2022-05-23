import {createContext, ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AUTH_KEY = "AuthToken"

export const AuthContext = createContext<{ token: string | undefined, login: (credentials: {username: string, password: string}) => void }>
    ({token: undefined, login: () => {console.error("Login not initialized")}})

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

    return <div>
        <AuthContext.Provider value={{token, login}}>
            {children}
        </AuthContext.Provider>
    </div>

}
