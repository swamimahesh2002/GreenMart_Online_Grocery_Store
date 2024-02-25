import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.scss'
import Body from './components/Body';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Empty } from './components/Empty';
import { Products } from './components/Products';
import {Orders} from './components/Orders';
import {Revenues} from './components/Revenues';
import {Vendors} from './components/Vendors';
import {Customers} from './components/Customers';
import {CancelledOrders} from './components/CancelledOrders';
import {PendingOrders} from './components/PendingOrders';
import {ExpiredProducts} from './components/ExpiredProducts';
import {NewProducts} from './components/NewProducts';

const Layout = () => {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Body></Body>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Empty></Empty>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/newproducts",
        element: <NewProducts></NewProducts>,
      },
      {
        path: "/expiredproducts",
        element: <ExpiredProducts></ExpiredProducts>,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
      {
        path: "/cancelledorders",
        element: <CancelledOrders></CancelledOrders>,
      },
      {
        path: "/pendingorders",
        element: <PendingOrders></PendingOrders>,
      },
      {
        path: "/vendors",
        element: <Vendors></Vendors>,
      },
      {
        path: "/revenues",
        element: <Revenues></Revenues>,
      },
      {
        path: "/customers",
        element: <Customers></Customers>,
      }
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
