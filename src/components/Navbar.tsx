import { Link } from "react-router-dom";

import { User } from "../model/Model";

interface NavbarProps {
    user: User | undefined
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const loginLogout: any = setLoginLogout(user);

    console.log(user)

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/spaces">Spaces</Link>
            { loginLogout }
        </div>
    );
}

const setLoginLogout = (user: User | undefined) => {
    if(!user) return <Link to='/login' style={{ float: 'right' }}>Login</Link>

    return <Link to='/logout' style={{ float: 'right' }}>{user.username}</Link>
}