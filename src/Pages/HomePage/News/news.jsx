import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../News/news.css';

function News() {
const [news, setNews] = useState([]);

useEffect(() => {
const fetchNews = async () => {
try {
const response = await axios.get('https://app.kyveli.me/api/news');
console.log('Newsssss:', response.data.data);
setNews(response.data.data);
}catch (error) {
console.error('Error fetching data:', error);
}
};
fetchNews();
}, []);

const settings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
autoplay: true,
autoplaySpeed: 2000,
};

return (
<div className="section-news">
    <Slider {...settings}>
        {news.map((item, index) => (
        <div>
            <div key={index} className="news-item">
                {item.image && (
                <div className='news-image-name'>
                        <img src={item.image} alt="" className='news-image' />
                        <p className='news-name'>{item.name}</p>
                    <button className='discover'>Discover</button>

                </div>
                )}
                {item.video && (
                <div className='news-video-name'>
                    <video autoPlay muted className='news-video'>
                        <source src={item.video} type="video/mp4" />
                    </video>
                    <p className='news-name'>{item.name}</p>
                    <button className='discover'>Discover</button>

                </div>
                )}

            </div>

        </div>
        ))}
    </Slider>

</div>
);
}
export default News;
