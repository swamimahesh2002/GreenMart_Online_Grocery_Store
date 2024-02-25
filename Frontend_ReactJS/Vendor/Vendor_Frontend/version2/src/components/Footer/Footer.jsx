import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';
import './Footer.scss'
import { getAuthData } from '../../store/Auth';

export const Footer = () => {

    const user = getAuthData();

    return (
        <div className="footer">
            <div className="top">
                <div className="item">
                    <h5>Links</h5>
                    <span>FAQs</span>
                    <Link className="link" to={`/profile/${user.id}`} onClick={() => { window.scrollTo(0, 0) }}>Manage your account</Link>
                    <Link className="link" to={`/products/${user.id}`} onClick={() => { window.scrollTo(0, 0) }}>Manage your products</Link>
                    <Link className="link" to={`/earnings/${user.id}`} onClick={() => { window.scrollTo(0, 0) }}>Manage your earnings</Link>
                </div>
                <div className="item">
                    <h5>About</h5>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat veritatis nihil velit et magni numquam veniam dolorem laboriosam, est accusamus aperiam adipisci sequi totam provident voluptatem modi id omnis corrupti.</span>
                </div>
                <div className="item">
                    <h5>Contact</h5>
                    <span>sell@greenmart.com</span>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <div className="logo">
                        <span>GreenMart</span>
                    </div>
                    <div className="copyright">
                        <span>©2023 GreenMart. All rights reserved</span>
                    </div>
                </div>
                <div className="center">
                    <div className="item">
                        <span>Privacy Policy</span>
                    </div>
                    <div className="item">
                        <span>Terms of Usage</span>
                    </div>
                </div>
                <div className="right">
                    <div className="icon">
                        <YouTubeIcon></YouTubeIcon>
                    </div>
                    <div className="icon">
                        <TwitterIcon></TwitterIcon>
                    </div>
                    <div className="icon">
                        <FacebookIcon></FacebookIcon>
                    </div>
                    <div className="icon">
                        <InstagramIcon></InstagramIcon>
                    </div>
                </div>
            </div>
        </div>
    )
}
