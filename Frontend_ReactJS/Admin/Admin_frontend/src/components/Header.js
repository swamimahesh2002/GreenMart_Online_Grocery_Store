import Footer from './Footer';
import { Link, Route, Routes, Switch, useHistory } from 'react-router-dom';
import Earnings from './Earnings';
// import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import axios from 'axios'



function Header() {

    const [products, setProducts] = useState([]);

    const fecthProducts=()=>{
        axios.get("http://localhost:8080/greenmart/product/").then((result)=>{setProducts(result.data)}).catch(()=>{console.log("err")})
    }
    fecthProducts();
    return ( <div className="header">
        {products.map((p)=>{
            return(
                <h3>{p.productName}</h3>
            )
        })}
    </div> );
}

export default Header;