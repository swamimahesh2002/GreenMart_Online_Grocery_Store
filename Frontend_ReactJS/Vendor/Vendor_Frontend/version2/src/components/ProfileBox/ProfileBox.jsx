import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ProfileBox.scss'
import { getAuthData } from '../../store/Auth'
import { useDispatch } from 'react-redux'
import { signout } from '../../store/authSlice'

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
            <h6>Hello, {user.username}</h6>
            <hr></hr>
            <div className="links">
                <Link className="link" to="/change-password/1">Change password</Link>
                <br></br>
                <Link className="link" to="/profile/1">Your profile</Link>
                <br></br>
                <Link className="link" to="/earnings/1">Your account</Link>
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
