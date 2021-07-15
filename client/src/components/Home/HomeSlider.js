import React from "react";
import MyButton from "../utils/buttons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";

export default function HomeSlider() {
  const site = useSelector((state) => state.site);

  const settings = {
    // showIndicators: false,//defaults to true
    selectedItem: 2, //defaults to 0
    infiniteLoop: true,
    interval: 2500, //defaults to 3000
    autoPlay: true,
    showArrows: false,
    showThumbs: false, //defaults to true,
    stopOnHover: false, //defaults to true
    useKeyboardArrows: true, //defaults to false
  };

  const generateSlides = () =>
    site.featured_products
      ? site.featured_products.map((item, i) => (
          <div key={i}>
            <div
              className="featured_image"
              style={{
                position: "relative",
                background: `url(${item.image_url})`,
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
                <div className="tag__title">{item.knife_name}</div>
                <div className="tag__low_title">{item.promotion_text}</div>
                <div>
                  <MyButton
                    type="default"
                    text={item.button_text}
                    linkTo={item.link}
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
