
import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';

export const Vendors = () => {

  const [vendors , setVendors] = useState([]) ;

  useEffect(()=>{
      // debugger;
      myAxios.get("/admin/vendors/").then((response)=>{
          setVendors(response.data) ;
      debugger;
      }) ; //get
  },[]);

  return (
    <>{ 
       vendors.map((vendor) => (
                   <table border={2}>
                       <tbody>
               <div key={vendor.Id}>
                           <tr>
                               <td>Id</td>
                               <td>First Name</td>
                               <td>Last Name</td>
                               <td>Email</td>
                               <td>UserRole</td>
                               <td>MobNo</td>
                               <td>Address</td>
                               <td>Action</td>
                           </tr>
                   
                           <tr>
                               <td>{vendor.id}</td>
                               <td>{vendor.firstName}</td>
                               <td>{vendor.lastName}</td>
                               <td>{vendor.email}</td>
                               <td>{vendor.userRole}</td>
                               <td>{vendor.mobNo}</td>
                               <td>{vendor.address}</td>
                               <td>Delete , Update</td>
                           </tr>
               </div>
                       </tbody>
                   </table>
   
           ) // arrow fuction
       )  //map method
       
   }</> );
}
