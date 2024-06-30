import { useContext, useState } from "react"
import { UserContext } from "./authentication/UserContext"
import { Link } from "react-router-dom";

const UserAccount = () =>{

    const {user} = useContext(UserContext);
    console.log('user '+user)
    return(
        <>
        <p>username: {user.username}</p>
        <Link to={'/password-reset-request'}>change password</Link>
        </>
    )
}

export default UserAccount