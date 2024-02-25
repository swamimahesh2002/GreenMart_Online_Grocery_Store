import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"


const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>
            <Link className="link" to="/products/1">
              Vegetables
                </Link>
          </span>
          <span>
            <Link className="link" to="/products/1">
              Fruits
                </Link>
          </span>
          <span>
            <Link className="link" to="/products/1">
              Sprouts
                </Link>
          </span>
          <span>
            <Link className="link" to="/products/1">
              Herbs & Seasonings
                </Link>
          </span>
          <span>
            <Link className="link" to="/products/1">
              Dairy
                </Link>
          </span>

        </div>
        <div className="item">
          <h1>Links</h1>
          <Link className="link">FAQ</Link>
          <Link className="link">Pages</Link>
          <Link className="link">Blogs</Link>
          <Link className="link">Compare</Link>
          <Link className="link">Cookies</Link>
          <Link className="link">Want to sell on GreenMart?</Link>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            greenmart.com is India’s largest online grocery store. With over 500
            products and over a 10 brands in our catalogue you will find
            everything you are looking for. Right from fresh Fruits and
            Vegetables, Herbs ,Sprouts- we have it all. Choose from a wide range
            of options in every category at lowest prices.
              </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            To reach our customer service team please email us
            at:greenmart@gmail.com"
            <br></br>
            <br></br>
            Office Address:
            <br></br>
            Greenmart Grocery <br></br> Hinjiwadi Phase 2 <br></br>
                Pune,Maharashtra
              </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">GreenMart</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer;
