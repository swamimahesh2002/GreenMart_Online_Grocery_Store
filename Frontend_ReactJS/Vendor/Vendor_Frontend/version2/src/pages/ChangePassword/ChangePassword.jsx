import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { myAxios, myAxiosHeader } from '../../makerequest';
import { toast } from 'react-toastify';
import './ChangePassword.scss'
import { Link } from 'react-router-dom';
import { getAuthData } from '../../store/Auth';

export const ChangePassword = () => {

    const user = getAuthData();

    const [oldpwd, setOldpwd] = useState("");
    const [newpwd, setNewpwd] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const updatePassword = (event) => {
        //event.preventDefault();
        //debugger;
        myAxiosHeader
            .post(
                `vendor/changep/${user.id}`,
                {
                    password: newpwd,
                },
            )
            .then((response) => {
                console.log("added pdt");
                setOldpwd("");
                setNewpwd("");
                toast.success("Updated successfully!!!");
            });
    };

    return (
        <div className="changepwd">
            <form onSubmit={handleSubmit(updatePassword)}>
                <div className="update">
                    <div className="oldpwd">
                        <input
                            type="text"
                            value={oldpwd}
                            placeholder="* Enter old password here"
                            {...register("oldpwd", { required: true })}
                            onChange={(e) => {
                                setOldpwd(e.target.value);
                            }}
                        />
                        {errors.oldpwd && <p style={{ color: "red", fontSize: "13px" }}>Please enter old password</p>}
                    </div>
                    <br></br>
                    <div className="newpwd">
                        <input
                            type="password"
                            value={newpwd}
                            placeholder="* Enter new password here"
                            {...register("newpwd", { required: true })}
                            onChange={(e) => {
                                setNewpwd(e.target.value);
                            }}
                        />
                        {errors.newpwd && <p style={{ color: "red", fontSize: "13px" }}>Please enter new password</p>}
                    </div>
                    <br></br>
                    <div className="btn">
                        <button type="submit">Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
