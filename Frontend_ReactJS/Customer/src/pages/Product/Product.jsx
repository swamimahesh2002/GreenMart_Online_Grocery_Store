import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { myAxios, myAxiosHeader } from "../../makerrequest";
import "./Product.scss";

const Product = () => {
  const { id } = useParams();
  console.log(id);
  const loggedInCustomerID = sessionStorage.getItem("id");

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [data, setData] = useState([]);
  //console.log(data);
  useEffect(() => {
    myAxiosHeader.get(`/customer/product/prodID/${id}`).then((result) => {
      setData(result.data);
      console.log(result.data);
    });
  }, []);

  const addToCartHandler = (event) => {
    myAxiosHeader
      .put(`customer/cart/${loggedInCustomerID}/prodId/${id}/qty/${quantity}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img src={data.image} onClick={(e) => setSelectedImg(0)} />
        </div>
        <div className="mainImg">
          <img src={data.image} />
        </div>
      </div>
      <div className="right">
        <h1>{data.productName}</h1>
        <span className="price">Rs.{data.rate}</span>
        <p>{data.productDescription}</p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button className="add" onClick={addToCartHandler}>
          <Link to="/placeorder/1" onClick={window.location.reload}>
            Add to cart
          </Link>
        </button>
        <div className="links">
          <div className="item">avg ratng : {data.averageRating}</div>
        </div>

        <hr />
        <div className="info">
          <span>DESCRIPTION : {data.productDescription}</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
