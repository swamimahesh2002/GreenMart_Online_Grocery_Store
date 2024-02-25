import { DeleteOutline } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./Cart.scss";
import { myAxios, myAxiosHeader } from "../../makerrequest";
import { useEffect } from "react";
import { useState } from "react";
import { debounce } from "@mui/material";

const Cart = () => {
  const [data, setData] = useState([]);

  const orderDetail = [...data];

  const [total, setTotal] = useState(0);
  let caltotal = 0;

  const id = sessionStorage.getItem("id");

  // const calculateTotal = () => {
  //   let caltotal = 0;
  //   data.map((p) => {
  //     caltotal += p.quantity * p.product.rate;
  //   });
  //   setTotal(caltotal);
  // };

  useEffect(() => {
    myAxiosHeader.get(`customer/cart/${id}`).then((response) => {
      console.log(response.data);
      setData(response.data);
      //calculateTotal();
    });
  }, []);

  // useEffect(() => {
  //   myAxios.get("customer/cart/1").then((response) => {
  //     console.log(response.data);
  //     setData(response.data);
  //   });
  // }, [data]);

  const deleteHandler = (event) => {
    myAxios.put(`customer/cart/2/cartItem/${data.id}/`).then((response) => {
      console.log(response.data);
    });
  };

  console.log(data[0]);

  return (
    <div className="cart">
      <div className="left">
        {data?.map((item) => (
          <div className="item" key={item.product.id}>
            <img src={item.img}></img>
            <div className="details">
              <h1>{item.product.productName}</h1>
              <p>{item.product.productDescription?.substring(0, 15)}</p>
              <div className="price">
                {item.quantity} * Rs {item.product.rate}
              </div>

              <div>
                <button
                  onClick={(event) => {
                    debugger;
                    myAxiosHeader
                      .put(`customer/cart/${id}/cartItem/${item.id}/`)
                      .then((response) => {
                        console.log(response.data);
                        window.location.reload();
                        data.map((p) => {
                          if (p.id === item.id) {
                            data.pop(p);
                          }
                        });
                        setData(data);
                      });
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="right">
        <span>TOTAL</span>
        <span>
          Rs.
          {data.map((p) => {
            caltotal += p.quantity * p.product.rate;
          })}{" "}
          <div>{caltotal}</div>
        </span>
        <Link to="/payment" className="link">
          <button
            onClick={() => {
              myAxiosHeader
                .put(`customer/order/${id}/mode/${0}`, data)
                .then((res) => {
                  console.log(res.data);
                });
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </Link>
        <button
          className="reset"
          onClick={() => {
            data.map((item) => {
              myAxiosHeader
                .put(`customer/cart/${id}/cartItem/${item.id}/`)
                .then((resp) => {
                  console.log(resp.data);
                });
              setData(data);
              window.location.reload();
            });
          }}
        >
          Reset Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
