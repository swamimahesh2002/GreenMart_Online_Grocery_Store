import React, { useState, useEffect } from "react";
import "./List.scss";
import Card from "../Card/Card";
import { myAxios } from "../../makerrequest";

const List = (props) => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   myAxios.get(`/product/${props.id}`).then((result) => {
  //     setData(result.data);
  //   });
  // }, []);

  return (
    <div className="list">
      {props.products?.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default List;
