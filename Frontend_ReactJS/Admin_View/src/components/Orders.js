import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';

export const Orders = () => {

  const [orders , setOrders] = useState([]) ;

  useEffect(()=>{
      // debugger;
      myAxios.get("/admin/orders/").then((response)=>{
          setOrders(response.data) ;
      debugger;
      }) ; //get
  },[]);

  return (
    <>{ 
       orders.map((order) => (
                   <table border={2}>
                       <tbody>
               <div key={order.Id}>
                           <tr>
                               <td>Id</td>
                               <td>Order Date</td>
                               <td>Delivery Date</td>
                               <td>Order Status</td>
                               <td>Mode Of Payment</td>

                               <td>Action</td>
                           </tr>
                   
                           <tr>
                               <td>{order.id}</td>
                               <td>{order.orderDate}</td>
                               <td>{order.deliveryDate}</td>
                               <td>{order.orderStatus}</td>
                               <td>{order.modeOfPayment}</td>

                               <td>Delete , Update</td>
                           </tr>
               </div>
                       </tbody>
                   </table>
   
           ) // arrow fuction
       )  //map method
       
   }</> );
}
