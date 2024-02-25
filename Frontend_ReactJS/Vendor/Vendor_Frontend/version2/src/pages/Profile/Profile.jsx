import React, { useState, useEffect } from 'react'
import { myAxios, myAxiosHeader } from '../../makerequest'
import './Profile.scss'
import { EditProfile } from '../EditProfile/EditProfile';
import { Link } from 'react-router-dom';
import { getAuthData } from '../../store/Auth';

export const Profile = () => {

    const user = getAuthData();

    const [vendor, setVendor] = useState({});

    useEffect(() => {
        myAxiosHeader.get(`vendor/${user.id}`).then((response) => {
            setVendor(response.data);
        })
    }, {})

    return (
        <div className="profile">
            <div className="firstName">
                <input type="text" name="" id="" placeholder={vendor.firstName} />
            </div>
            <br></br>
            <div className="lastName">
                <input type="text" name="" id="" placeholder={vendor.lastName} />
            </div>
            <br></br>
            <div className="email">
                <input type="email" placeholder={vendor.email}></input>
            </div>
            <br></br>
            <div className="mobNo">
                <input type="number" minLength="10" maxLength="10" placeholder={vendor.mobNo}></input>
            </div>
            <br></br>
            <div className="address">
                <input type="text" placeholder={vendor.address}></input>
            </div>
            <div className="buttons">
                <div className="edit">
                    <Link to={`/edit-profile/${user.id}`}><button>Edit</button></Link>
                </div>
                <div className="delete">
                    <button >Delete</button>
                </div>
            </div>
        </div>
    )

}
