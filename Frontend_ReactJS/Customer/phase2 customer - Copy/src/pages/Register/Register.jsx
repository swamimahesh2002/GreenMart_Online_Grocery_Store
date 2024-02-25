import { Link } from "react-router-dom";
import React, { useState } from "react";
import { myAxiosHeader } from "../../makerrequest";
import { myAxios } from "../../makerrequest";
import "./Register.scss";
import { useForm } from "react-hook-form";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    myAxios
      .post("/register/1", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobNo: mobNo,
        address: address,
        password: password,
      })
      .then((response) => {
        console.log("user registered");
      });
  };

  return (
    <div className="register">
      <div className="firstName">
        <input
          type="text"
          name=""
          id=""
          placeholder="* Enter first name here"
          {...register("firstName", { required: true })}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && (
          <p style={{ color: "red", fontSize: "13px" }}>
            Please enter first name
          </p>
        )}
      </div>
      <br></br>
      <div className="lastName">
        <input
          type="text"
          name=""
          id=""
          placeholder="* Enter last name here"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <br></br>
      <div className="email">
        <input
          type="email"
          placeholder="* Enter email here"
          {...register("email", { required: true })}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "13px" }}>Please enter email</p>
        )}
      </div>
      <br></br>
      <div className="password">
        <input
          type="password"
          placeholder="* Enter password here"
          {...register("password", { required: true })}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p style={{ color: "red", fontSize: "13px" }}>
            Please enter password
          </p>
        )}
      </div>
      <br></br>
      <div className="mobNo">
        <input
          type="number"
          minLength="10"
          maxLength="10"
          placeholder="* Enter mobile number here"
          {...register("mobNo", { required: true })}
          onChange={(e) => setMobNo(e.target.value)}
        />
        {errors.mobNo && (
          <p style={{ color: "red", fontSize: "13px" }}>
            Please enter mobile number
          </p>
        )}
      </div>
      <br></br>
      <div className="address">
        <input
          type="text"
          placeholder="* Enter address here"
          {...register("address", { required: true })}
          onChange={(e) => setAddress(e.target.value)}
        />
        {errors.address && (
          <p style={{ color: "red", fontSize: "13px" }}>Please enter address</p>
        )}
      </div>
      <div className="terms">
        <span>
          By continuing, I agree to GreenMarts’s Terms of Use & Privacy Policy
        </span>
      </div>
      <div className="btn">
        <Link to="/login">
          <button onClick={handleSubmit(onSubmit)}>Register & Continue</button>
        </Link>
      </div>
    </div>
  );
};
