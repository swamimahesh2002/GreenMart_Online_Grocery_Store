import React from 'react'
import './Product.scss'
import { Link } from 'react-router-dom'
import { myAxios, myAxiosHeader } from '../../makerequest'
import { toast } from 'react-toastify'

export const Product = (props) => {

    const onDelete = () => {
        myAxiosHeader.delete(`/vendor/products/delete/${props.pdt.id}`).then((response) => {
            toast.success('Product deleted !');
            setTimeout(() => { window.location.reload(false); }, 2000);
        })
    }

    return (
        <div className="image">
            <div className="left">
            </div>
            <div className="right">
                <div className="name">{props.pdt.productName}</div>
                <div className="price">
                    <div className="rate">Rate: {props.pdt.rate}</div>
                    <div className="discount">Discount: {props.pdt.discount}</div>
                </div>
                <div className="expDate">Exp Date: {props.pdt.expiryDate}</div>
                <div className="qty">Qty: {props.pdt.productQuantity}</div>
                <div className="rating">Rating:{props.pdt.averageRating}</div>
                <div className="buttons">
                    <div className="edit">
                        <Link to={`/edit-product/${props.pdt.id}`}><button>Edit</button></Link>
                    </div>
                    <div className="delete" onClick={() => { onDelete() }}>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
