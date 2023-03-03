import { SyntheticEvent, useState } from 'react';
import { AuthService } from "../services/AuthService";

interface LoginProps {
    authService: AuthService
}

interface CustomEvent {
    target: HTMLInputElement
}

export const Login: React.FC<LoginProps> = ({ authService }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginAttempted, setLoginAttempted] = useState<boolean>(false);
    const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false);

    let loginMessage: JSX.Element;

    if (loginAttempted && loginSuccessful) {
        loginMessage = <label>Login Succesfull</label>
    } else {
        loginMessage = <label>Login Failed</label>
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoginAttempted(true);
        const loggedIn = await authService.login(username, password);
        setLoginSuccessful(!!loggedIn)
    }

    return (
        <div>
            <h2>Please login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    placeholder='username' 
                    onChange={(event: CustomEvent) => { setUsername(event.target.value) }} /> 
                <br />
                <input 
                    placeholder='password' 
                    type="password" 
                    onChange={(event: CustomEvent) => { setPassword(event.target.value) }} /> 
                <br />
                <input type='submit' value='Login' />
            </form>

            { loginMessage }
        </div>
    );
};