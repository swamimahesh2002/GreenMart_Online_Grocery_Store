import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';

export const PendingOrders = () => {

    const [pendingorders , setPendingOrders] = useState([]) ;

    useEffect(()=>{
        // debugger;
        myAxios.get("/admin/orders/pending/").then((response)=>{
            setPendingOrders(response.data) ;
        debugger;
        }) ; //get
    },[]);

  return (
    <>{ 
        pendingorders.map((pendingorder) => (
                    <table border={2}>
                        <tbody>
                <div key={pendingorder.Id}>
                            <tr>
                                <td>Id</td>
                                <td>Order Date</td>
                                <td>Delivery Date</td>
                                <td>Order Status</td>
                                <td>Mode Of Payment</td>
 
                                <td>Action</td>
                            </tr>
                    
                            <tr>
                                <td>{pendingorder.id}</td>
                                <td>{pendingorder.orderDate}</td>
                                <td>{pendingorder.deliveryDate}</td>
                                <td>{pendingorder.orderStatus}</td>
                                <td>{pendingorder.modeOfPayment}</td>
 
                                <td>Delete , Update</td>
                            </tr>
                </div>
                        </tbody>
                    </table>
    
            ) // arrow fuction
        )  //map method
        
    }</> 
  );
}
