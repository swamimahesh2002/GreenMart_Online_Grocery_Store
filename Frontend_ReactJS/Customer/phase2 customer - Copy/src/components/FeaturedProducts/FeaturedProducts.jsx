import React, { useEffect, useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";

import { myAxios, myAxiosHeader } from "../../makerrequest";

const FeaturedProducts = ({ type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    myAxios.get("/product/").then((result) => setData(result.data));
  }, []);

  //console.log(data);
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} Products</h1>
        <br></br>
      </div>
      <div className="bottom">
        {data.map((product) => {
          debugger
          if (product.id % 3.0 === 0.0) {
            return <Card item={product} key={product.productName} />;
          }
        })}
      </div>
    </div>
  );
};
export default FeaturedProducts;
