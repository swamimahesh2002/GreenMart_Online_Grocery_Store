import React, { useEffect, useState } from 'react'
import { myAxios } from './makerequest';

export const Products = () => {

    const [products , setProducts] = useState([]) ;

    useEffect(()=>{
        // debugger;
        myAxios.get("/admin/products/").then((response)=>{
            setProducts(response.data) ;
        debugger;
        }) ; //get
    },[]);

  return (
     <>{ 
        products.map((product) => (
                    <table border={2}>
                        <tbody>
                <div key={product.Id}>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Rate</td>
                                <td>ExpiryDate</td>
                                <td>Average Rating</td>
                                <td>Discount</td>
                                <td>Description</td>
                                <td>Quantity</td>
                                <td>Action</td>
                            </tr>
                    {/* <p>{product.productName} , {product.rate} , {product.expiryDate}</p> */}
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.rate}</td>
                                <td>{product.ExpiryDate}</td>
                                <td>{product.averageRating}</td>
                                <td>{product.discount}</td>
                                <td>{product.productDescription}</td>
                                <td>{product.productQuantity}</td>
                                <td>Delete , Update</td>
                            </tr>
                </div>
                        </tbody>
                    </table>
    
            ) // arrow fuction
        )  //map method
        
    }</> );
  
}
