import React from 'react';
import Slider from "react-slick";
import MyButton from '../utils/buttons';


const HomeSlider = () => {
  const slides = [
    { //TODO: images will be served from server
      img: "/images/fallkniven_01.jpg",
      lineOne: "Fallkniven",
      lineTwo: "Survival knife",
      linkTitle: 'Shop now',
      linkTo: '/shop'
    },
    {
      img: "/images/fallkniven_02.jpg",
      lineOne: "Fallkniven",
      lineTwo: "Gentleman's knife",
      linkTitle: 'Shop now',
      linkTo: '/shop'
    },
    {
      img: "/images/gerber_1.jpg",
      lineOne: "Gerber Bear Grylls",
      lineTwo: "Survival knife",
      linkTitle: 'View Offers',
      linkTo: '/shop'
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    arrows: false
  };

  const generateSlides = () => (
    slides ?
      slides.map((item, i) => (
        <div key={i}>
          <div className="featured_image"
            style={{
              // display:"flex",
              // alignItems:"center",
              // justifyContent: "center",
              position: "relative",
              background: `url(${item.img})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center left",
              backgroundSize: 'cover',
              height: `${window.innerHeight}px`
            }}
          >
            <div className="featured_action" style={{

              position: "absolute",
              top: "45%",
              left: "8%"
            }}>
              <div className="tag__title">{item.lineOne}</div>
              <div className="tag__low_title">{item.lineTwo}</div>
              <div>
                <MyButton
                  type="default"
                  text={item.linkTitle}
                  linkTo={item.linkTo}
                  addStyles={{
                    margin: '10px 0 0 0'
                  }}
                />

              </div>
            </div>
          </div>
        </div>
      ))
      : null
  )
  return (
    <div className="featured_container">
      <Slider {...settings}>
        {generateSlides()}
      </Slider>
    </div>
  );
};

export default HomeSlider;