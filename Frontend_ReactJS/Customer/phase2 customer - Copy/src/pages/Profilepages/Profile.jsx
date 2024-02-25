import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.scss";
// import { toast } from 'react-toastify';
import { myAxios, myAxiosHeader } from "../../makerrequest";

const Profile = () => {
  const uname = sessionStorage.getItem("username");
  const [customer, setCustomer] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobNo, setMobNo] = useState("");
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    myAxiosHeader.get(`customer/${id}`).then((response) => {
      setCustomer(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setAddress(response.data.address);
      setMobNo(response.data.mobNo);
    });
  }, {});

  return (
    <div className="profile">
      <div className="left">
        <div className="top">
          <h3>Hello,</h3>
          <h3>{uname}</h3>
        </div>
        <div className="bottom">
          <button>
            <Link className="link" to="/profile">
              Update Details
            </Link>
          </button>
          <br></br>
          <button>
            <Link className="link" to="/ordertable">
              Order History
            </Link>
          </button>
          <br></br>
          <button>
            <Link className="link" to="/savedcards">
              Cards & UPI
            </Link>
          </button>
        </div>
      </div>
      <div className="right">
        <div className="register">
          <table>
            <tr>
              <th>Personal Information</th>
            </tr>
            <br></br>
            <tr>
              <td>First Name </td>
              <td>
                <input
                  type="text"
                  name=""
                  id=""
                  value={firstName}
                  placeholder={customer.firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Last Name </td>
              <td>
                <input
                  type="text"
                  name=""
                  id=""
                  value={lastName}
                  placeholder={customer.lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Email </td>
              <td>
                <input
                  type="email"
                  placeholder={customer.email}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Mobile No. </td>
              <td>
                <input
                  type="number"
                  minLength="10"
                  maxLength="10"
                  value={mobNo}
                  placeholder={customer.mobNo}
                  onChange={(e) => {
                    setMobNo(e.target.value);
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Address </td>
              <td>
                <input
                  type="text"
                  placeholder={customer.address}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
              </td>
            </tr>
            <tr>
              <td>.</td>
              <td>
                {/* <Link to="/updateprofile"> */}
                <button
                  onClick={() => {
                    myAxiosHeader
                      .put(`customer/${id}`, {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobNo: mobNo,
                        address: address,
                      })
                      .then((resp) => {
                        console.log(resp.data);
                      });
                  }}
                >
                  Edit
                </button>
                {/* </Link> */}

                <button>Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
