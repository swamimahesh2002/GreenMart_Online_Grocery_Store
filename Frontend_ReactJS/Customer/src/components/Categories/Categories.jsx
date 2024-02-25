import React, { forwardRef } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img src="/img/fruit1.webp" alt="" />
          <button>
            <Link className="link" to={`/products/${1}`} state={{ id: "1" }}>
              Fruits
            </Link>
          </button>
        </div>
        <div className="row">
          <img src="/img/dairy1.avif" alt="" />
          <button>
            <Link to={`/products/${5}`} className="link">
              Dairy
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {" "}
          <img src="/img/newseason.jpeg" alt="" />
          <button>
            <Link to="/products/1" className="link">
              New Season
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img src="/img/sprouts.jpg" alt="" />
              <button>
                <Link to={`/products/${3}`} className="link">
                  Sprouts
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <img src="/img/leafy.png" alt="" />
              <button>
                <Link to={`/products/${2}`} className="link">
                  Leafy
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img src="/img/herbs.PNG" alt="" />
          <button>
            <Link to={`/products/${4}`} className="link">
              Herbs & Seasonongs
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
