import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Orderpage.scss";
import Card from "../../components/Card/Card";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { myAxios } from "../../makerrequest";
import { useState } from "react";

const Orderpage = () => {
  const { id, odate, ddate, ostatus, modep } = useParams();
  const [data, setData] = useState([]);
  const [review, setReview] = useState();
  useEffect(() => {
    myAxios.get(`customer/orderdetails/${id}`).then((resp) => {
      setData(resp.data);
    });
  }, []);

  const reviewHandler = (event) => {
    setReview(event.target.value);
  };

  return (
    <div className="Orderpage">
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
        <div className="block">
          {data?.map((item) => (
            <div className="leftblock">
              <div className="item" key={item.product.id}>
                <img src={item.product.img}></img>
                <div className="details">
                  <h1>{item.product.productName}</h1>
                  <p>{item.product.productDescription?.substring(0, 30)}</p>
                  <div className="price">1 * Rs {item.product.rate}</div>

                  <span>
                    <button
                      onClick={() => {
                        myAxios
                          .put(
                            `customer/product/review/1/product/${item.product.id}/rating/${review}`
                          )
                          .then((resp) => {
                            console.log(resp.data);
                          });
                      }}
                    >
                      Submit Your Review :
                    </button>
                    <input
                      type="text"
                      placeholder="rate out of 5"
                      onChange={reviewHandler}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="rightblock">
            <span>Order Date: {odate}</span>
            <span>Delivery Date: {ddate}</span>
            <span>Order Status: {ostatus}</span>
            <span>Mode Of Payment : {modep}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orderpage;
