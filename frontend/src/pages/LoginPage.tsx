import {FormEvent, useContext, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import "../components/Buttons.css";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const {login, logout} = useContext(AuthContext)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login({username: username, password: password})
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className={"search-input-button"}>
            <input className={"search-input-field"}
                   type={"text"}
                   value={username}
                   placeholder={"Username"}
                   onChange={(event) => setUsername(event.target.value)}/>
            <input className={"search-input-field"}
                   type={"password"}
                   value={password}
                   placeholder={"Password"}
                   onChange={(event) => setPassword(event.target.value)}/>
            <button className={"add-item-button"}
                    type={"submit"}>
                Login
            </button>
            </div>
        </form>
        <button type={"submit"} onClick={logout}>Logout</button>
    </div>
}
