import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "../../makerrequest";
import { signin } from "../Store/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [uname, setUname] = useState("username");
  const [password, setPassword] = useState("enter password");
  // get the navigate function reference
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unameChangeHandler = (event) => {
    setUname(event.target.value);
    // console.log(uname)
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    // console.log(password)
  };

  const submtHandler = (event) => {
    event.preventDefault();
    const user = { email: uname, password: password };
    myAxios.post("/authenticate", user).then((response) => {
      console.log(response.data);
      const signinUser = {
        id: response.data.id,
        name: response.data.name,
        token: response.data.token,
      };
      dispatch(signin(signinUser));
    });
    navigate("/");
    window.location.reload();
  };
  return (
    <form onSubmit={submtHandler}>
      <div className="login">
        <div className="top">
          <table className="table">
            <tr>
              <td><h3>Welcome to GreenMart</h3></td>
            </tr>
            <tr>
              <td>
                <div className="email">
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="* Enter email here"
                    onChange={unameChangeHandler}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="password">
                  <input
                    type="password"
                    name=""
                    id=""
                    placeholder="* Enter password here"
                    onChange={passwordChangeHandler}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="btn">
                  <button type="submit">Login</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="register">
                  <Link to="/register">
                    Register for new account
                  </Link>
                </div>
              </td>
            </tr>

          </table>
        </div>
      </div>
    </form>
  );
};

export default Login;
