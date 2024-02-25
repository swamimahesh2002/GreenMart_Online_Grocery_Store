import React, { useState, useEffect } from 'react'
import { myAxios, myAxiosHeader } from '../../makerequest';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditProfile.scss'
import { getAuthData } from '../../store/Auth';

export const EditProfile = () => {

    const user = getAuthData();

    const [vendor, setVendor] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobNo, setMobNo] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        myAxiosHeader.get(`vendor/${user.id}`).then((response) => {
            setVendor(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setMobNo(response.data.mobNo);
            setAddress(response.data.address);
        })
    }, {})

    useEffect(() => {
    })

    const onSubmit = () => {
        myAxiosHeader.post(
            `vendor/update/${user.id}`,
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobNo: mobNo,
                address: address
            }
        ).then((response) => {
            console.log("vendor updated");
            toast.success('Details updated !');
            setTimeout(() => { window.location.reload(false); }, 2000);
        })
    }

    return (
        <div className="editProfile">
            <div className="firstName">
                <h6>First name:</h6>
                <input type="text" name="" id="firstName" defaultValue={vendor.firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <br></br>
            <div className="lastName">
                <h6>Last name:</h6>
                <input type="text" name="" id="lastName" defaultValue={vendor.lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <br></br>
            <div className="email">
                <h6>Email:</h6>
                <input type="email" id="email" defaultValue={vendor.email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <br></br>
            <div className="mobNo">
                <h6>Mobile No.:</h6>
                <input type="number" id="mobNo" minLength="10" maxLength="10" defaultValue={vendor.mobNo} onChange={(e) => setMobNo(e.target.value)}></input>
            </div>
            <br></br>
            <div className="address">
                <h6>Address:</h6>
                <input type="text" id="address" defaultValue={vendor.address} onChange={(e) => setAddress(e.target.value)}></input>
            </div>
            <div className="button">
                <div className="edit">
                    <Link to={`/profile/${user.id}`}><button onClick={() => { onSubmit() }}>Submit</button></Link>
                </div>
            </div>
        </div>
    )
}
