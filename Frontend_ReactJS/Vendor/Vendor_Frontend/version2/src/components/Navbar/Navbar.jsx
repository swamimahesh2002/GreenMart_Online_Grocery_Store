import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import { ProfileBox } from '../ProfileBox/ProfileBox'
import { myAxios } from '../../makerequest'
import "./Navbar.scss"
import { getAuthData } from '../../store/Auth';

export const Navbar = () => {

    const user = getAuthData();

    console.log(user.id);

    const [open, setOpen] = useState(false);
    // const [products, setProducts] = useState([]);
    // const [list, setList] = useState([]);

    // useEffect(() => {
    //     myAxios.get("product/").then((response) => { setProducts(response.data) })
    // }, [])

    // useEffect(() => { }, [list])

    // const onChangeHandler = (event) => {
    //     let searchText = event.target.value;
    //     let selected = [];
    //     if (searchText === "") { selected = [] }
    //     else {
    //         selected = [];
    //         products.map((p) => {
    //             if (p.productName.includes(searchText)) { selected.push(p.productName) };
    //         })
    //     }
    //     setList(selected);
    // }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <Link className="link" to="/">GreenMart</Link>
                    </div>
                </div>
                <div className="center">
                    <div className="item">
                        <Link className="link" to="/">Home</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to={`/products/${user.id}`} >Products</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to={`/earnings/${user.id}`}>Earnings</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to={`/profile/${user.id}`}>Profile</Link>
                    </div>
                </div>
                <div className="right">
                    {/* <div className="search">
                        <input type="text" onChange={onChangeHandler}></input>
                        <div className="pdts">{list.map((e) => {
                            return (<div className="selected">{e}</div>);
                        })}</div>
                    </div> */}
                    <div className="item">
                        <Link className="link" to="/register">Start selling</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/login">Login</Link>
                    </div>
                    <div className="personIcon" onClick={() => { setOpen(!open) }}>
                        <PersonIcon></PersonIcon>
                    </div>
                </div>
            </div>
            {open && <ProfileBox />}
        </div>
    )
}
