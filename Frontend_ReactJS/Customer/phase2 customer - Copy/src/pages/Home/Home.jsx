import React from "react";
import Slider from '../../components/Slider/Slider'
import "./Home.scss"
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from "../../components/Categories/Categories";
import Navbar from "../../components/Navbar/Navbar";




const Home = () => {
    return (
        <div className='home'>
      <Slider/>
      <FeaturedProducts type="Featured"/>
      
        <Categories/>
      {/* <FeaturedProducts type="trending"/>
      <Contact/> */}
    </div>
    )
}

export default Home;
