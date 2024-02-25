import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ProfileBox.scss'
import { getAuthData } from '../../pages/Store/Auth'
import { useDispatch } from 'react-redux'
import { signout } from '../../pages/Store/AuthSlice'

export const ProfileBox = () => {

    const user = getAuthData();

    const token = user.token;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(signout(user));
        navigate("/");
    }

    return (
        <div className="box">
            <h4>Hello, {user.username}</h4>
            <hr></hr>
            <div className="links">
                <Link className="link" to={`/change-password/${user.id}`}>Change password</Link>
                <br></br>
                <Link className="link" to={`/profile`}>Your profile</Link>
                <br></br>
                <Link className="link" to={`/ordertable`}>Your orders</Link>
                <br></br>
                <div className="mylink">
                    {token &&
                        <button className="link" onClick={logoutHandler}>
                            Logout
                       </button>
                    }
                </div>
            </div>
        </div>
    )
}
