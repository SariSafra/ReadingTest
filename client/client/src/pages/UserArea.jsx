import { useContext } from "react";
import { Link , Outlet, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import { UserContext } from "./authentication/UserContext.jsx";

const UserArea = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()
    const handleLogout = ()=>{
        Cookies.remove('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }

    return (
        <>
        <nav>
            <button onClick={handleLogout}>Logout</button>
            <Link to={'/my-account'}>my account</Link>
        </nav>
        <Outlet/>
        </>
    );
}

export default UserArea