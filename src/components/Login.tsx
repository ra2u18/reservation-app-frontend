import { SyntheticEvent, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { AuthService } from "../services/AuthService";

interface LoginProps {
    authService: AuthService;
    setUser: Function;
}

interface CustomEvent {
    target: HTMLInputElement
}

export const Login: React.FC<LoginProps> = ({ authService, setUser }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginAttempted, setLoginAttempted] = useState<boolean>(false);
    const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false);

    const navigate = useNavigate();


    let loginMessage: JSX.Element;

    if (loginAttempted && loginSuccessful) {
        loginMessage = <label>Login Succesfull</label>
    } else {
        loginMessage = <label>Login Failed</label>
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoginAttempted(true);
        const loggedInUser = await authService.login(username, password);
        if(loggedInUser) { 
            setUser(loggedInUser);
            navigate('/profile')
        }

        setLoginSuccessful(!!loggedInUser);
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