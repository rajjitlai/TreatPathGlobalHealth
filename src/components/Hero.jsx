import React from 'react'
import Slider from 'react-slick'
import { slidesData } from '../constants'
import Slide from './Slide'

const Hero = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    }

    return (
        <div>
            <div className='container px-16 pt-6 lg:pt-10'>
                <Slider {...settings}>
                    {slidesData.map((item) => <Slide 
                        key={item.id}
                        img={item.img}
                        title={item.title}
                        mainTitle={item.mainTitle}
                        price={item.price}
                    />)}
                </Slider>
            </div>
        </div>
    )
}

export default Hero