import React from 'react'
import './PopularCategories.scss'

export const PopularCategories = () => {
    return (
        <div className="popCats">
            <h3>Popular categories to sell online</h3>
            <div className="images">
                <div className="image">
                    <img src={"/images/fruits.jpg"} alt="" />
                </div>
                <div className="image">
                    <img src={"/images/vegetables.jpg"} alt="" />
                </div>
                <div className="image">
                    <img src={"/images/sprouts.jpg"} alt="" />
                </div>
                <div className="image">
                    <img src={"/images/herbs.jpg"} alt="" />
                </div>
                <div className="image">
                    <img src={"/images/dairy.jpg"} alt="" />
                </div>
            </div>
        </div>
    )
}
