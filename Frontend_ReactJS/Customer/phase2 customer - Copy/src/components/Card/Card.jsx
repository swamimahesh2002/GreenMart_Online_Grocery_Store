import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = (props) => {
  console.log(props.item);
  return (
    <Link className="link" to={`/product/${props.item.id}`}>
      <div className="Card">
        <div className="image">
          <img src={props.item.image} height="80px" className="mainImg"></img>
        </div>
      </div>
      <h3>{props.item.productName}</h3>
      <h4>Rs.{props.item.rate}</h4>
    </Link>
  );
};

export default Card;
