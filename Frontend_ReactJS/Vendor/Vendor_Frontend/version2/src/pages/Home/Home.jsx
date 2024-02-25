import React from 'react'
import { VendorHomeSlide } from '../../components/VendorHomeSlide/VendorHomeSlide'
import { PopularCategories } from '../../components/PopularCategories/PopularCategories'
import './Home.scss'

export const Home = () => {
    return (
        <div>
            <VendorHomeSlide></VendorHomeSlide>
            <PopularCategories></PopularCategories>
            <div className="sellOnGreenmart">
                <h2>SELL ON GREENMART</h2>
                <br></br>
                <span>
                    GreenMart Marketplace is India’s leading platform for selling online. Be it a manufacturer, vendor or supplier, simply sell your products online on GreenMart and become a top e-commerce player with minimum investment. Through a team of experts offering exclusive seller workshops, training, and seller support, GreenMart focuses on empowering sellers across India.

                    Selling on GreenMart.com is easy and absolutely free. All you need is to register, list your catalog and start selling your products.

                    What's more? We have third party ‘Ecommerce Service Providers’ who provide logistics, cataloging support, product photoshoot and packaging materials. We have a program called Seller Protection Fund to safeguard sellers from losses via compensations. We provide GreenMart Fulfilment services through which you can ensure faster delivery of your items, quality check by our experts and a delightful packaging. Combine these with the fastest payments in the industry and you get an excellent seller portal. No wonder GreenMart is India’s favourite place to sell online.
                </span>
            </div>
        </div>
    )
}
