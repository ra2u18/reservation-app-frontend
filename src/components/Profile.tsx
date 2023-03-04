import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, UserAttribute } from "../model/Model";
import { AuthService } from "../services/AuthService";

interface ProfileProps {
    user: User | undefined,
    authService: AuthService
}

export const Profile: React.FC<ProfileProps> = ({ authService, user }) => {
    const [userAttributes, setUserAttributes] = useState<UserAttribute[]>();
 
    useEffect(() => {
        const getUserAttr = async () => {
            if (user) {
                const userAttrs = await authService.getUserAttributes(user);
                setUserAttributes(userAttrs);
            }
        }

        getUserAttr();
    }, [user])

    let profileSpace: JSX.Element = getProfile(user, userAttributes);

    return (
        <div>
            Welcome to Profile!
            { profileSpace }
        </div>
    );
}

const getProfile = 
    (user: User | undefined, userAttributes: UserAttribute[] | undefined): JSX.Element => 
{
    if (!user) { 
        return ( <div>Please <Link to="/login">Login</Link></div> ); 
    }

    return (<div>
        <h3>Hello {user.username}</h3>
        Here are your attributes:
        { renderUserAttributes(userAttributes) }
    </div>)
}

const renderUserAttributes = (userAttributes: UserAttribute[] | undefined) => {
    if(!userAttributes) return;

    const rows = userAttributes.map((attr: UserAttribute) => (
        <tr key={attr.Name}>
            <td>{attr.Name}</td>
            <td>{attr.Value}</td>
        </tr>
    ));

    return (
        <table>
            <tbody>{rows}</tbody>
        </table>
    );
}