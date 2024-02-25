import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Placeorder from "./pages/Placeorder/Placeorder";
import About from "./pages/dummy/About";
import ContactPage from "./pages/dummy/ContactPage";
import Login from "./pages/login/Login";

import Updateprofile from "./pages/Profilepages/Updatepro";
import Savedcards from "./pages/Profilepages/Savedcards";
import "./app.scss";
import { Register } from "./pages/Register/Register";
import Contact from "./components/Contact/Contact";
import { useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Payment from "./pages/Payment/Payment";
import Ordertable from "./pages/Profilepages/Ordertable";
import Orderpage from "./pages/Profilepages/Orderpage";
import Profile from "./pages/Profilepages/Profile";
import { checkAuthLoader } from "./pages/Store/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Contact></Contact>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/savedcards",
        element: <Savedcards />,
      },
      {
        path: "/Orderpage/:id/:odate/:ddate/:ostatus/:modep",
        element: <Orderpage />,
        loader: checkAuthLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: checkAuthLoader,
      },
      {
        path: "/updateprofile",
        element: <Updateprofile />,
        loader: checkAuthLoader,
      },
      {
        path: "/placeorder/:id",
        element: <Placeorder />,
        loader: checkAuthLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/payment",
        element: <Payment />,
        loader: checkAuthLoader,
      },
      {
        path: "/ordertable",
        element: <Ordertable />,
        loader: checkAuthLoader,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <ToastContainer autoClose={2000}></ToastContainer>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
