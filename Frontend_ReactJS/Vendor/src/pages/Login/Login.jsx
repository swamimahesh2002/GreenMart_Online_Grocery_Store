import React from 'react'
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { myAxios } from '../../makerequest'
import { useDispatch } from "react-redux";
import { signin } from "../../store/authSlice";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


export const Login = () => {

    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = (event) => {
        //event.preventDefault();
        const user = { email: uname, password: password };
        myAxios.post("/authenticate", user).then((response) => {
            console.log(response.data);
            const signinUser = {
                id: response.data.id,
                name: response.data.name,
                token: response.data.token,
            };
            dispatch(signin(signinUser));
            navigate("/");
            window.location.reload();
        }).catch(() => { toast.error("Please enter valid credentials!!!") });
        navigate("/login");
    }

    return (
        <div className="login">
            <div className="email">
                <input type="email" name="" id="" placeholder="* Enter email here"
                    {...register("email", { required: true })}
                    onChange={(e) => { setUname(e.target.value) }} />
                {errors.email && <p style={{ color: "red", fontSize: "13px" }}>Please enter email</p>}
            </div>
            <br></br>
            <div className="password">
                <input type="password" name="" id="" placeholder="* Enter password here"
                    {...register("password", { required: true })}
                    onChange={(e) => { setPassword(e.target.value) }} />
                {errors.password && <p style={{ color: "red", fontSize: "13px" }}>Please enter password</p>}
            </div>
            <div className="register">
                <Link to="/register">Register for new account</Link>
            </div>
            <div className="btn">
                <button onClick={handleSubmit(onSubmitHandler)}>Login</button>
            </div>
        </div>
    )
}
