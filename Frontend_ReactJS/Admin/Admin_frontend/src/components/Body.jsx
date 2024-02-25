import { useState } from "react";
import { Link } from "react-router-dom";




function Body() {
   return(<>
   <div style={{display:"flex",justifyContent:"space-between", padding:"30px"}}>
   
    <div className="button"><Link to="/products"><button>Get all Products</button></Link></div>
    <div className="button"><Link to="/newproducts"><button>Get New Products</button></Link></div>
    <div className="button"><Link to="/expiredproducts"><button>Get Expired Products</button></Link></div>
    <div className="button"><Link to="/vendors"><button>Get all Vendors</button></Link></div>
    <div className="button"><Link to="/customers"><button>Get all Customers</button></Link></div>
    <div className="button"><Link to="/orders"><button>Get all Orders</button></Link></div>
    <div className="button"><Link to="/cancelledorders"><button>Get Cancelled Orders</button></Link></div>
    <div className="button"><Link to="/pendingorders"><button>Get Pending Orders</button></Link></div>
    <div className="button"><Link to="/revenues"><button>Get Revenue</button></Link></div>
   </div>
   </>
   ) ; 
 
}

export default Body;