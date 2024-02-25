import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import './VendorHomeSlide.scss'
import { Link } from 'react-router-dom';

export const VendorHomeSlide = () => {
    return (
        <div className="slide">
            <div className="email">
                <span>Launch your business in 10 minutes</span>
                <Link to="/register"><button>Start selling </button></Link>
            </div>
            <div className="item">
                <span className="ms">Selling online to 50 crores+ customers</span>
                <div className="icons">
                    <div className="icon">
                        <LocationOnIcon></LocationOnIcon>
                        <span>Pan India delivery</span>
                    </div>
                    <div className="icon">
                        <HandshakeIcon></HandshakeIcon>
                        <span>500000+ customers</span>
                    </div>
                    <div className="icon">
                        <BusinessCenterIcon></BusinessCenterIcon>
                        <span>Account management</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
