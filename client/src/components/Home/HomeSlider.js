import React from "react";
import MyButton from "../utils/buttons";
//TODO: ditch this buggy lib and use 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function HomeSlider() {
  const slides = [
    {
      //TODO: images will be served from server
      img: "/images/fallkniven_01.jpg",
      lineOne: "Fallkniven",
      lineTwo: "Survival knife",
      linkTitle: "Shop now",
      linkTo: "/shop",
    },
    {
      img: "/images/fallkniven_02.jpg",
      lineOne: "Fallkniven",
      lineTwo: "Gentleman's knife",
      linkTitle: "Shop now",
      linkTo: "/shop",
    },
    {
      img: "/images/gerber_1.jpg",
      lineOne: "Gerber Bear Grylls",
      lineTwo: "Survival knife",
      linkTitle: "View Offers",
      linkTo: "/shop",
    },
  ];

  const settings = {
    // showIndicators: false,//defaults to true
    selectedItem: 2, //defaults to 0
    infiniteLoop: true,
    interval: 2000, //defaults to 3000
    autoPlay: true,
    showArrows: false,
    showThumbs: false, //defaults to true,
    stopOnHover: false, //defaults to true
    useKeyboardArrows: true, //defaults to false
  };

  const generateSlides = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="featured_image"
              style={{
                position: "relative",
                background: `url(${item.img})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center left",
                backgroundSize: "cover",
                height: "calc(100vh - 80px)",
              }}
            >
              <div
                className="featured_action"
                style={{
                  position: "absolute",
                  top: "45%",
                  left: "8%",
                }}
              >
                <div className="tag__title">{item.lineOne}</div>
                <div className="tag__low_title">{item.lineTwo}</div>
                <div>
                  <MyButton
                    type="default"
                    text={item.linkTitle}
                    linkTo={item.linkTo}
                    addStyles={{
                      margin: "10px 0 0 0",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;
  return (
    <div
      className="featured_container"
      style={{ width: "85%", margin: "0 auto" }}
    >
      <Carousel {...settings}>{generateSlides()}</Carousel>
    </div>
  );
}
