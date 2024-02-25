import React, { useEffect, useState } from 'react';
import { myAxios, myAxiosHeader } from '../../makerequest';
import { toast } from 'react-toastify';
import './EditProduct.scss'
import { useParams } from 'react-router-dom';
import { getAuthData } from '../../store/Auth';

export const EditProduct = () => {

    const user = getAuthData();

    const [product, setProduct] = useState({});
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [rate, setRate] = useState("");
    const [image, setImage] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [productQuantity, setProductQuantity] = useState("");

    const { vid } = useParams();

    useEffect(() => {
        myAxiosHeader.get(`/vendor/product/${vid}`).then((response) => {
            setProduct(response.data);
            setProductName(response.data.productName);
            setProductDescription(response.data.productDescription);
            setRate(response.data.rate);
            setImage(response.data.image);
            setExpiryDate(response.data.expiryDate);
            setProductQuantity(response.data.productQuantity);
        })
    }, {})

    useEffect(() => {
    })

    const onSubmit = () => {
        myAxiosHeader.put(
            `vendor/update-product/${vid}`,
            {
                productName: productName,
                productDescription: productDescription,
                rate: rate,
                image: image,
                expiryDate: expiryDate,
                productQuantity: productQuantity
            }
        ).then((response) => {
            console.log("vendor updated");
            toast.success('Details updated !');
            setTimeout(() => { window.location.reload(false); }, 2000);
        })
    }

    return (
        <div className="editProduct">
            <div className="productName">
                <input type="text" name="" id="productName" defaultValue={product.productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <br></br>
            <div className="productDescription">
                <input type="text" name="" id="productDescription" defaultValue={product.productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            </div>
            <br></br>
            <div className="rate">
                <input type="text" id="rate" defaultValue={product.rate} onChange={(e) => setRate(e.target.value)}></input>
            </div>
            <br></br>
            <div className="image3">
                <input type="text" id="image3" defaultValue={product.image} onChange={(e) => setImage(e.target.value)}></input>
            </div>
            <br></br>
            <div className="expiryDate">
                <input type="text" id="expiryDate" defaultValue={product.expiryDate} onChange={(e) => setExpiryDate(e.target.value)}></input>
            </div>
            <br></br>
            <div className="productQuantity">
                <input type="number" id="productQuantity" defaultValue={product.productQuantity} onChange={(e) => setProductQuantity(e.target.value)}></input>
            </div>
            <div className="button">
                <div className="edit">
                    <button onClick={() => { onSubmit() }}>Submit</button>
                </div>
            </div>
        </div>
    )
}
