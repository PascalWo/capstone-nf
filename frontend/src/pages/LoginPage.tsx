import {FormEvent, useState} from "react";

export  default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type={"text"} value={username} placeholder={"Username"} onChange={(event) => setUsername(event.target.value) }/>
            <input type={"password"} value={password} placeholder={"Password"} onChange={(event) => setPassword(event.target.value)}/>
            <button type={"submit"}>Login</button>
        </form>
    </div>
}