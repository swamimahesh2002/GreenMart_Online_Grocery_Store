import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const NewProducts = () => {

  const [newProducts , setNewProducts] = useState([]) ;

  useEffect(()=>{
    // debugger;
    myAxios.get("/admin/products/new/").then((response)=>{
      setNewProducts(response.data) ;
    debugger;
    }) ; //get
},[]);


// const [prodid, setProdId] = useState("");
const doApprove = (id) => {
  // debugger;
  myAxios.put(
      `/admin/products/add=${id}`
  ).then((response) => {
      console.log("Product is successfully updated . ");
      toast.success('Details updated !');
      setTimeout(() => { window.location.reload(false); }, 2000);
  })
}

  return (
    <>{ 
      newProducts.map((newProduct) => (
                   <table border={2}>
                       <tbody>
               <div key={newProduct.Id}>
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
                               <td>{newProduct.id}</td>
                               <td>{newProduct.productName}</td>
                               <td>{newProduct.rate}</td>
                               <td>{newProduct.discount}</td>
                               <td>{newProduct.productDescription}</td>
                               <td>{newProduct.discount}</td>
                               <td>{newProduct.image}</td>
                               <td>{newProduct.expiryDate}</td>
                               <td>{newProduct.productQuantity}</td>
                               <td>{newProduct.averageRating}</td>
                               <td><button onClick={() => { doApprove(newProduct.id) }}>Approve</button></td>
                           </tr>
               </div>
                       </tbody>
                   </table>
   
           ) // arrow fuction
       )  //map method
       
   }</> );
}
