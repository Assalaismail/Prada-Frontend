import React, { useState, useEffect} from 'react';
import axios from 'axios';
import '../HomePage/home.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionOne from './Sections/Section1/section1.jsx';
import SectionTwo from './Sections/Section2/section2.jsx';
import SectionThree from './Sections/Section3/section3.jsx';
import SectionFour from './Sections/Section4/section4.jsx';
import News from './News/news.jsx';

function Home() {

const [banners, setBanners] = useState([]);


useEffect(() => {
const fetchBanners = async () => {
try {
const response = await axios.get('https://app.kyveli.me/api/bannerone');
setBanners(response.data.data);
} catch (error) {
console.error('Error fetching data:', error);
}
};
fetchBanners();
}, []);

const settings = {
dots: false,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
autoplay: true,
autoplaySpeed: 2000,
cssEase: "linear",
};

return (
<div className="banner-container">
    <div className="carousel">
        <Slider {...settings}>
            {Array.isArray(banners) &&
            banners.map((item, index) => (
            <div key={index} className="carousel-item">
                {item.image && (
                <div className='banner-image-name'>
                    <p className='banner-name'>{item.name}</p>
                    <img src={item.image} alt="" className='banner-image' />
                </div>
                )}
                {item.video && (
                <div className='banner-video-name'>
                    <p className='banner-name'>{item.name}</p>
                    <video autoPlay muted className='banner-video'>
                        <source src={item.video} type="video/mp4" />
                    </video>
                </div>
                )}
            </div>
            ))}
        </Slider>

    </div>

    <div>
        <SectionOne />
    </div>

    <div>
        <SectionTwo />
    </div>

    <div>
        <SectionThree />
    </div>

    <div>
        <SectionFour/>
    </div>


    <div>
        <News/>
    </div>
</div>

);
}

export default Home;
