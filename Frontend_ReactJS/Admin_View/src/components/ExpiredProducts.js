import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';

export const ExpiredProducts = () => {

  const [expiredProducts , setExpiredProducts] = useState([]) ;

  useEffect(()=>{
      // debugger;
      myAxios.get("/admin/products/expired/").then((response)=>{
        setExpiredProducts(response.data) ;
      debugger;
      }) ; //get
  },[]);

  return (
    <>{ 
      expiredProducts.map((expiredProduct) => (
                   <table border={2}>
                       <tbody>
               <div key={expiredProduct.Id}>
                           <tr>
                               <td>Id</td>
                               <td>Name</td>
                               <td>Rate</td>
                               <td>Discount</td>
                               <td>Product Description</td>
                               <td>Discount</td>
                               <td>Image</td>
                               <td>Expiry Date </td>
                               <td>Quantity</td>
                               <td>Average Rating</td>
                               <td>Action</td>
                           </tr>
                   {/* <p>{product.productName} , {product.rate} , {product.expiryDate}</p> */}
                           <tr>
                               <td>{expiredProduct.id}</td>
                               <td>{expiredProduct.productName}</td>
                               <td>{expiredProduct.rate}</td>
                               <td>{expiredProduct.discount}</td>
                               <td>{expiredProduct.productDescription}</td>
                               <td>{expiredProduct.discount}</td>
                               <td>{expiredProduct.image}</td>
                               <td>{expiredProduct.expiryDate}</td>
                               <td>{expiredProduct.productQuantity}</td>
                               <td>{expiredProduct.averageRating}</td>
                               <td>Delete , Update</td>
                           </tr>
               </div>
                       </tbody>
                   </table>
   
           ) // arrow fuction
       )  //map method
       
   }</> );
}
