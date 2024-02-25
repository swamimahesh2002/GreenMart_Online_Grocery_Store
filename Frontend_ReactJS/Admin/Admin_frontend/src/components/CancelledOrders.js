import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';
import { toast } from 'react-toastify';

export const CancelledOrders = () => {

    const [cancelledorders , setCancelledOrders] = useState([]) ;

    useEffect(()=>{
        // debugger;
        myAxios.get("/admin/orders/cancelled/").then((response)=>{
            setCancelledOrders(response.data) ;
        debugger;
        }) ; //get
    },[]);

    const doDelete = (id) => {
        // debugger;
        // myAxios.delete(
        //     `/admin/cancelledorders/delete=${id}`
        // ).then((response) => {
        //     console.log("Cancelled Orders is successfully deleted . ");
        //     toast.success('Cancelled Order Deleted !');
        //     setTimeout(() => { window.location.reload(false); }, 2000);
        // })
      }

  return (
    <>{ 
        cancelledorders.map((cancelledorder) => (
                    <table border={2}>
                        <tbody>
                <div key={cancelledorder.Id}>
                            <tr>
                                <td>Id</td>
                                <td>Order Date</td>
                                <td>Delivery Date</td>
                                <td>Order Status</td>
                                <td>Mode Of Payment</td>
 
                                <td>Action</td>
                            </tr>
                    
                            <tr>
                                <td>{cancelledorder.id}</td>
                                <td>{cancelledorder.orderDate}</td>
                                <td>{cancelledorder.deliveryDate}</td>
                                <td>{cancelledorder.orderStatus}</td>
                                <td>{cancelledorder.modeOfPayment}</td>
 
                                <td><button onClick={() => { doDelete(cancelledorder.id) }}>Delete</button></td>
                            </tr>
                </div>
                        </tbody>
                    </table>
    
            ) // arrow fuction
        )  //map method
        
    }</> 
  );
}
