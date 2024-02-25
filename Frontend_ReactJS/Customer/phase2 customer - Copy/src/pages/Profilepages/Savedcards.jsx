import React from "react";
import { Link } from "react-router-dom";

const Savedcards = () => {
  return (
    <div>
      Savedcards
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
        <div className="top">
          <h4> Manage Payment Details</h4>
          <table>
            <tr>
              <th>Debit card</th>
              <th>UPI</th>
              <th>Credit card</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Savedcards;
