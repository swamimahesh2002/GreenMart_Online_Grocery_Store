import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { myAxios, myAxiosHeader } from "../../makerrequest";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { signout } from "../../pages/Store/AuthSlice";
import { ProfileBox } from "../ProfileBox/ProfileBox";

const Navbar = () => {
  // const ref = useRef(null);
  // const [open, setOpen] = useState(false)

  // const scrollto = () => {
  //   ref.current?.scrollIntoView({ behaviour: "smooth" });
  // }
  const [products, setProducts] = useState([]);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    myAxios.get("/product/").then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => { }, [list]);

  const logoutHandler = () => {
    const signinUser = {
      id: sessionStorage.getItem("id"),
      name: sessionStorage.getItem("username"),
      token: sessionStorage.getItem("token"),
    };
    dispatch(signout(signinUser));
    navigate("/");
  };

  const onChangeHandler = (event) => {
    debugger;
    let searchText = event.target.value;
    let selected = [];
    if (searchText === "") {
      selected = [];
    } else {
      selected = [];
      products.map((p) => {
        if (p.productName.includes(searchText)) {
          selected.push(p.productName);
        }
      });
    }
    setList(selected);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <Link className="link" to="/">
            GreenMart
          </Link>
        </div>
        <div className="center">
          <div className="search">
            <input type="text" onChange={onChangeHandler}></input>
            <div className="pdts">
              {list.map((e) => {
                return <div className="selected">{e}</div>;
              })}
            </div>
          </div>
        </div>

        <div className="right">
          {/* <div className="item">
                  <Link className ="link" to="/">Categories</Link>
                </div> */}
          <div className="item">
            <Link className="link" to="/about">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/contact">
              Contact
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/profile">
              Profile
            </Link>
          </div>
          <div className="icons">
            <div className="cartIcon">
              <Link className="link" onClick={() => { setOpen(!open) }}>
                <PersonOutlineOutlinedIcon />
              </Link>
            </div>
            <div className="cartIcon">
              <Link className="link" to="/placeorder/1">
                <ShoppingCartOutlinedIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {open && <ProfileBox />}
    </div>
  );
};

export default Navbar;
