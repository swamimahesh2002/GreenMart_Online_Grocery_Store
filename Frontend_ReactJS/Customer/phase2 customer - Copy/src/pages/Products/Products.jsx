import React, { useEffect } from "react";
import { useState } from "react";
import "./Products.scss";
import List from "../../components/List/List";
import { useLocation, useParams } from "react-router-dom";
import { myAxios, myAxiosHeader } from "../../makerrequest";

const Products = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    myAxios.get(`/product/${id}`).then((result) => {
      setData(result.data);
    });
  }, []);
  const sortAsc = () => {
    data.sort((a, b) => {
      if (a.rate > b.rate) {
        return 1;
      }
      if (a.rate < b.rate) {
        return -1;
      } else {
        return 0;
      }
    });
    setData([...data]);
  };

  const sortDesc = () => {
    data.sort((a, b) => {
      if (a.rate > b.rate) {
        return -1;
      }
      if (a.rate < b.rate) {
        return 1;
      } else {
        return 0;
      }
    });
    setData([...data]);
  };
  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={sortAsc}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={sortDesc}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        {/* <img
                className="catImg"
                src="/img/Vegetables3.jpg"
                alt=""
                /> */}
        <List products={data}></List>
      </div>
    </div>
  );
};

export default Products;
