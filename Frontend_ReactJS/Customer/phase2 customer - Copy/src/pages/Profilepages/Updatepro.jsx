import React from "react";
import { Link } from "react-router-dom";
import "./Updatepro.scss";

const Updateprofile = () => {
  return (
    <div className="Updateprofile">
      <div className="left">
        <div className="top">
          <h3>Hello,</h3>
          <h3>Mahesh</h3>
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
            <tbody>
              <tr>
                <th>Personal Information</th>
              </tr>
              <tr>
                <td>First Name </td>
                <td>
                  <input type="text" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>Last Name </td>
                <td>
                  <input type="text" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>Email </td>
                <td>
                  <input type="text" name="" id="" />
                </td>
              </tr>

              <tr>
                <td>Mobile No. </td>
                <td>
                  <input type="text" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>Address </td>
                <td>
                  <input type="text" name="" id="" />
                </td>
              </tr>
              <tr>
                <td>.</td>
                <td>
                  <Link className="link" to="/profile">
                    <button>Update Details</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Updateprofile;
