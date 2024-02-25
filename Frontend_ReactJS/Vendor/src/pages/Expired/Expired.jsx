import React, { useEffect, useState } from 'react';
import { Product } from '../../components/Product/Product'
import { Link } from 'react-router-dom';
import { myAxios, myAxiosHeader } from '../../makerequest'
import { getAuthData } from '../../store/Auth';

export const Expired = () => {

    const user = getAuthData();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        myAxiosHeader.get(
            `vendor/products/expired/${user.id}`
        ).then((response) => {
            setProducts(response.data)
        })
    }, [])

    return (
        <div className="products">
            <div className="left">
                <div className="filter">
                    <span>Filter by category:</span>
                    <div className="categories">
                        <div className="category">
                            <input type="radio" name="" id="" />
                            <label>Fruits</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="" id="" />
                            <label>Vegetables</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="" id="" />
                            <label>Seasonings</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="" id="" />
                            <label>Sprouts</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="" id="" />
                            <label>Herbs</label>
                        </div>
                    </div>
                </div>
                <div className="sort">
                    <span>Sort by:</span>
                    <div className="price">
                        <input type="radio" name="" id="" />
                        <label>Price</label>
                    </div>
                    <div className="rating">
                        <input type="radio" name="" id="" />
                        <label>Rating</label>
                    </div>
                </div>
                <hr></hr>
                <div className="links">
                    <div className="expired">
                        <Link to={`/products/${user.id}`}>Show approved products</Link>
                    </div>
                    <div className="new">
                        <Link to={`/add-product/${user.id}`}>Add new product</Link>
                    </div>
                    <div className="nonApproved">
                        <Link to={`/non-approved/${user.id}`}>Show not approved products</Link>
                    </div>
                </div>
            </div>
            <div className="right">
                {products.map((p) => {
                    return (<Product pdt={p} id={p.id}></Product>);
                })}
            </div>
        </div>
    )
}
