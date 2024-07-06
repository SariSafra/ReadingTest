import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { UserContext } from "./authentication/UserContext.jsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './style/UserArea.css'

const UserArea = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <Container>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       אותילוגיה
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>יציאה</Button>
                    <Button color="inherit" component={Link} to="/home/my-account">החשבון שלי</Button>
                </Toolbar>
            </AppBar>
            <Toolbar /> {/* This empty Toolbar will push the content down */}
            <Container maxWidth={false} sx={{ width: '100%', mt: 4 }}>
                <Outlet />
            </Container>
        </Container>
    );
};

export default UserArea;
