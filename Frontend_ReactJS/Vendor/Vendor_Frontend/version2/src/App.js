import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Products } from './pages/Products/Products';
import { Earnings } from './pages/Earnings/Earnings';
import { Profile } from './pages/Profile/Profile';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { AddProduct } from './pages/AddProduct/AddProduct';
import { NonApproved } from './pages/NonApproved/NonApproved';
import { Expired } from './pages/Expired/Expired';
import { ChangePassword } from './pages/ChangePassword/ChangePassword';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'
import { EditProduct } from './pages/EditProduct/EditProduct';
import { checkAuthLoader } from './store/Auth';

const Layout = () => {
  return (
    <div className="app">
      <Navbar></Navbar>
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
        element: <Home></Home>,
      },
      {
        path: "/products/:vid",
        element: <Products></Products>,
        loader: checkAuthLoader,
      },
      {
        path: "/earnings/:vid",
        element: <Earnings></Earnings>,
        loader: checkAuthLoader,
      },
      {
        path: "/profile/:vid",
        element: <Profile></Profile>,
        loader: checkAuthLoader,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/add-product/:vid",
        element: <AddProduct></AddProduct>,
        loader: checkAuthLoader,
      },
      {
        path: "/non-approved/:vid",
        element: <NonApproved></NonApproved>,
        loader: checkAuthLoader,
      },
      {
        path: "/expired/:vid",
        element: <Expired></Expired>,
        loader: checkAuthLoader,
      },
      {
        path: "/change-password/:vid",
        element: <ChangePassword></ChangePassword>,
        loader: checkAuthLoader,
      },
      {
        path: "/edit-profile/:vid",
        element: <EditProfile></EditProfile>,
        loader: checkAuthLoader,
      },
      {
        path: "/edit-product/:vid",
        element: <EditProduct></EditProduct>,
        loader: checkAuthLoader,
      },
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000}></ToastContainer>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
