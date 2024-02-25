import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Ordertable.scss";
import { myAxios, myAxiosHeader } from "../../makerrequest";
import { useNavigate } from "react-router-dom";

const Ordertable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const uname = sessionStorage.getItem("username");
  useEffect(() => {
    myAxiosHeader.get(`customer/order/${1}`).then((res) => setData(res.data)); // ${1}  customerId
    console.log(data);
  }, []);

  const cancelOrderHandler = () => {};

  return (
    <div className="ordertable">
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
        <table className="table" style={{ border: "1px solid" }}>
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>Order date</th>
              <th>Delivery Date</th>
              <th>Order status</th>

              <th>Mode of Payment</th>
              <th>Cancel Order</th>
            </tr>
            {data?.map((item) => (
              <>
                <tr>
                  <Link
                    className="link"
                    to={`/orderpage/${item.id}/${item.orderDate}/${item.deliveryDate}/${item.orderStatus}/${item.modeOfPayment}`}
                  >
                    <td>{item.id}</td>
                    {console.log(item.id)}
                  </Link>
                  <td>{item.orderDate}</td>
                  <td>{item.deliveryDate}</td>
                  <td>{item.orderStatus}</td>
                  <td>{item.modeOfPayment}</td>
                  <td>
                    <button
                      onClick={() => {
                        myAxiosHeader
                          .put(`customer/cancelorder/${1}/orderid/${item.id}`)
                          .then((res) => {
                            console.log(res.data);
                            window.location.reload();
                          });
                      }}
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ordertable;
