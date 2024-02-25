
import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';

export const Customers = () => {

  const [customers , setCustomers] = useState([]) ;

  useEffect(()=>{
      // debugger;
      myAxios.get("/admin/customers/").then((response)=>{
        setCustomers(response.data) ;
      debugger;
      }) ; //get
  },[]);


  const doDelete = (id) => {
    // debugger;
    myAxios.put(
        `/admin/customers/delete=${id}`
    ).then((response) => {
        console.log("Customer is successfully deleted . ");
        toast.success('Customer deleted !');
        setTimeout(() => { window.location.reload(false); }, 2000);
    })
  }

  return (
    <>{ 
      customers.map((customer) => (
                   <table border={2}>
                       <tbody>
               <div key={customer.Id}>
                           <tr>
                               <td>Id</td>
                               <td>First Name</td>
                               <td>Last Name</td>
                               <td>Email</td>
                               
                               <td>MobNo</td>
                               <td>Address</td>
                               <td>Action</td>
                           </tr>
                   
                           <tr>
                               <td>{customer.id}</td>
                               <td>{customer.firstName}</td>
                               <td>{customer.lastName}</td>
                               <td>{customer.email}</td>
                               <td>{customer.mobNo}</td>
                               <td>{customer.address}</td>
                               <td><button onClick={() => { doDelete(customer.id) }}>Delete</button> </td>
                           </tr>
               </div>
                       </tbody>
                   </table>
   
           ) // arrow fuction
       )  //map method
       
   }</> );
}
