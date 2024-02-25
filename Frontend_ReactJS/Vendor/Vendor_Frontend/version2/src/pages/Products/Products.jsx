import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { myAxios, myAxiosHeader } from '../../makerequest'
import './Products.scss';
import { getAuthData } from '../../store/Auth';


export const Products = () => {

    const user = getAuthData();

    const [products, setProducts] = useState([]);
    const { vid } = useParams();

    useEffect(() => {
        myAxiosHeader.get(
            `vendor/products/approved/${vid}`
        ).then((response) => {
            setProducts(response.data)
        })
    }, [])

    const onRadioClick = (e) => {
        if (e.target.value === "Fruits") {
            myAxiosHeader.get(`/vendor/productsbycat/1/${vid}`).then((response) => {
                setProducts(response.data);
                //document.getElementById("Fruits").checked = "false";
            })
        } if (e.target.value === "Vegetables") {
            myAxiosHeader.get(`/vendor/productsbycat/2/${vid}`).then((response) => {
                setProducts(response.data);
                //document.getElementById("Vegetables").checked = "false";
            })
        } if (e.target.value === "Sprouts") {
            myAxiosHeader.get(`/vendor/productsbycat/3/${vid}`).then((response) => {
                setProducts(response.data);
                //document.getElementById("Sprouts").checked = "false";
            })
        } if (e.target.value === "Herbs") {
            myAxiosHeader.get(`/vendor/productsbycat/4/${vid}`).then((response) => {
                setProducts(response.data);
                //document.getElementById("Herbs").checked = "false";
            })
        } if (e.target.value === "Dairy") {
            myAxiosHeader.get(`/vendor/productsbycat/5/${vid}`).then((response) => {
                setProducts(response.data);
                //document.getElementById("Dairy").checked = "false";
            })
        }
    }

    const onSortRadioClick = (e) => {
        document.getElementById("Fruits").checked = false;
        document.getElementById("Vegetables").checked = false;
        document.getElementById("Sprouts").checked = false;
        document.getElementById("Herbs").checked = false;
        document.getElementById("Dairy").checked = false;
        if (e.target.value === "Rating") {
            myAxiosHeader.get(`/vendor/productsbyrating/${vid}`).then((response) => {
                setProducts(response.data);
                //document.getElementById("Vegetables").checked = "false";
            })
        }
    }

    return (
        <div className="products">
            <div className="left">
                <div className="filter">
                    <span>Filter by category:</span>
                    <div className="categories">
                        <div className="category">
                            <input type="radio" name="cat" id="Fruits" onClick={onRadioClick} value="Fruits" />
                            <label>Fruits</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="cat" id="Vegetables" onClick={onRadioClick} value="Vegetables" />
                            <label>Vegetables</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="cat" id="Sprouts" onClick={onRadioClick} value="Sprouts" />
                            <label>Sprouts</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="cat" id="Herbs" onClick={onRadioClick} value="Herbs" />
                            <label>Herbs & Seasonings</label>
                        </div>
                        <div className="category">
                            <input type="radio" name="cat" id="Dairy" onClick={onRadioClick} value="Dairy" />
                            <label>Dairy</label>
                        </div>
                    </div>
                </div>
                <div className="sort">
                    <span>Sort by:</span>
                    <div className="rating">
                        <input type="radio" name="sort" id="" onClick={onSortRadioClick} value="Rating" />
                        <label>Rating</label>
                    </div>
                </div>
                <div className="button">
                    <Link className="link" to={`/products/${vid}`} onClick={window.location.reload}><button>Reset filters</button></Link>
                </div>
                <hr></hr>
                <div className="links">
                    <div className="new">
                        <Link to={`/add-product/${vid}`}>Add new product</Link>
                    </div>
                    <div className="nonApproved">
                        <Link to={`/non-approved/${vid}`}>Show not approved products</Link>
                    </div>
                    <div className="expired">
                        <Link to={`/expired/${vid}`}>Show expired products</Link>
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
