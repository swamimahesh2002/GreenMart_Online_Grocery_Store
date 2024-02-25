import Body from './Body';
import Navbar from './Navbar';
import Footer from './Footer';
import {Empty} from './Empty';
import {Products} from './Products';
import Revenues from './Revenues';
import {Vendors} from './Vendors';
import {Orders} from './Orders';
import {Customers} from './Customers';

// import Header from './Header';
import { createBrowserRouter, Outlet } from 'react-router-dom';


function Dashboard() { //Layout
    return ( <>
        {/* <Header></Header> */}
        <Navbar></Navbar>
        <Body></Body>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
    
    );
}

const router = createBrowserRouter([{
    path:"/" ,
    element:<Dashboard></Dashboard> ,
    children : [
        {
            path : "/" ,
            element : <Empty></Empty>
        } ,
        {
            path : "/products" ,
            element : <Products></Products>
        } ,
        {
            path : "/revenues" ,
            element : <Revenues></Revenues>
        } ,
        {
            path : "/vendors" ,
            element : <Vendors></Vendors>
        } ,
        {
            path : "/orders" ,
            element : <Orders></Orders>
        } ,
        {
            path : "/customers" ,
            element : <Customers></Customers>
        } 

    ]
}]);


export default Dashboard;