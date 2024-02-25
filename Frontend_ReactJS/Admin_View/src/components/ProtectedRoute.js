import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

function ProtectedRoute(props)
{
    debugger;
    var isLoggedIn = false; //Code is yet to be written

    var isLoggedInFromSessionStorage = sessionStorage.getItem("isLoggedIn");
    if(isLoggedInFromSessionStorage!=null)
    {
        if(isLoggedInFromSessionStorage=="True")
        {
            isLoggedIn = true;
        }
    }


    if(isLoggedIn) //check for sessionStorage values
    {
        return <Route  path={props.path} exact   
                        component={props.component} />;
    }
    else
    {
       return <Login></Login>
    }
}

export default ProtectedRoute;